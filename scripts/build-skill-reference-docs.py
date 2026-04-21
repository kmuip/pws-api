#!/usr/bin/env python3

from __future__ import annotations

from collections import defaultdict
from dataclasses import dataclass
from html.parser import HTMLParser
from pathlib import Path
import re
import shutil
import subprocess
import sys


REPO_ROOT = Path(__file__).resolve().parents[1]
SKILL_ROOT = REPO_ROOT / "skills/pws-api"
SOURCE_HTML_ROOT = REPO_ROOT / "docs/passwordsafe/reference-site/help.passwordsafe.de/api/v9/html"
OUTPUT_ROOT = SKILL_ROOT / "references/api-docs"
MIRROR_SCRIPT = REPO_ROOT / "scripts/mirror-passwordsafe-docs.mjs"

VOID_TAGS = {"br", "img", "meta", "link", "input", "hr"}
BLOCK_TAGS = {
    "div",
    "p",
    "pre",
    "table",
    "ul",
    "ol",
    "li",
    "h1",
    "h2",
    "h3",
    "h4",
}
LIST_PAGE_PREFIXES = {"Methods.T", "Properties.T", "Fields.T", "Events.T"}
HANDBOOK_TITLES = {
    "browser-runtime.md": "Browser Runtime",
    "node-runtime.md": "Node Runtime",
    "internals.md": "Internals",
    "authentication-and-sessions.md": "Authentication and Sessions",
    "managers.md": "Managers",
    "data-models.md": "Data Models",
    "enums-and-constants.md": "Enums and Constants",
    "realtime-and-sync.md": "Realtime and Sync",
}
HANDBOOK_ORDER = [
    "browser-runtime.md",
    "node-runtime.md",
    "internals.md",
    "authentication-and-sessions.md",
    "managers.md",
    "data-models.md",
    "enums-and-constants.md",
    "realtime-and-sync.md",
]
LOCAL_DOC_PATTERN = re.compile(r"help\.passwordsafe\.de/api/v9/html/")
DOC_HREF_PATTERN = re.compile(r'href="([^"]+\.htm(?:#[^"]*)?)"', re.I)


@dataclass
class Page:
    source_name: str
    source_path: Path
    title: str
    help_id: str
    entity: str
    handbook: str
    anchor: str
    group_key: str
    group_title: str
    markdown: str = ""


class Node:
    def __init__(self, tag: str, attrs: dict[str, str] | None = None) -> None:
        self.tag = tag
        self.attrs = attrs or {}
        self.children: list[Node | str] = []


class DomBuilder(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.root = Node("root")
        self.stack = [self.root]

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        node = Node(tag, {key: value or "" for key, value in attrs})
        self.stack[-1].children.append(node)
        if tag not in VOID_TAGS:
            self.stack.append(node)

    def handle_endtag(self, tag: str) -> None:
        for index in range(len(self.stack) - 1, 0, -1):
            if self.stack[index].tag == tag:
                del self.stack[index:]
                return

    def handle_data(self, data: str) -> None:
        if data:
            self.stack[-1].children.append(data)


def collapse_inline(value: str) -> str:
    value = value.replace("\xa0", " ").replace("\ufeff", "")
    marker = "\u0000"
    value = value.replace("\n", marker)
    value = re.sub(r"\s+", " ", value)
    value = value.replace(marker, "\n")
    value = re.sub(r" *\n *", "\n", value)
    value = re.sub(r"\n{3,}", "\n\n", value)
    return value.strip()


def sanitize_anchor(value: str) -> str:
    value = value.lower()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    value = re.sub(r"-+", "-", value).strip("-")
    return value or "section"


def cleanup_html(raw_html: str) -> str:
    raw_html = raw_html.replace("\ufeff", "")
    raw_html = re.sub(r"<!--.*?-->", "", raw_html, flags=re.S)
    raw_html = re.sub(r"<script\b.*?</script>", "", raw_html, flags=re.S | re.I)
    raw_html = re.sub(
        r"<(div|span|p|table|thead|tbody|tr|td|th|a|pre|h1|h2|h3|h4|ul|ol|li)([^>]*)/>",
        r"<\1\2></\1>",
        raw_html,
        flags=re.I,
    )
    return raw_html


def build_dom(topic_html: str) -> Node:
    parser = DomBuilder()
    parser.feed(cleanup_html(topic_html))
    parser.close()
    return parser.root


def get_classes(node: Node) -> set[str]:
    return {item for item in node.attrs.get("class", "").split() if item}


def find_first(node: Node, predicate) -> Node | None:
    for child in node.children:
        if isinstance(child, Node):
            if predicate(child):
                return child
            nested = find_first(child, predicate)
            if nested is not None:
                return nested
    return None


def find_all(node: Node, predicate) -> list[Node]:
    found: list[Node] = []
    for child in node.children:
        if isinstance(child, Node):
            if predicate(child):
                found.append(child)
            found.extend(find_all(child, predicate))
    return found


def text_content(node: Node | str) -> str:
    if isinstance(node, str):
        return node
    return "".join(text_content(child) for child in node.children)


def escape_pipes(value: str) -> str:
    return value.replace("|", r"\|")


def demote_headings(markdown: str, amount: int) -> str:
    if not markdown.strip():
        return ""
    lines = markdown.splitlines()
    in_code = False
    output: list[str] = []
    for line in lines:
        stripped = line.lstrip()
        if stripped.startswith("```"):
            in_code = not in_code
            output.append(line)
            continue
        if not in_code and stripped.startswith("#"):
            prefix = line[: len(line) - len(stripped)]
            hashes, rest = stripped.split(" ", 1)
            output.append(f"{prefix}{hashes}{'#' * amount} {rest}")
            continue
        output.append(line)
    return "\n".join(output)


def extract_topic_html(raw_html: str) -> str:
    match = re.search(
        r'<div class="topicContent" id="TopicContent">(.*?)(?=<div id="pageFooter")',
        raw_html,
        flags=re.S,
    )
    if not match:
        raise ValueError("Unable to find topic content")
    return match.group(1)


def split_member_id(body: str) -> tuple[str, str, str]:
    if "(" in body:
        before_signature, after_signature = body.split("(", 1)
        signature = after_signature.rsplit(")", 1)[0]
    else:
        before_signature = body
        signature = ""
    owner, member = before_signature.rsplit(".", 1)
    return owner, member, signature


def entity_from_help_id(help_id: str) -> str:
    prefix, body = help_id.split(":", 1)
    if prefix in {"N", "T"}:
        return body
    if prefix in LIST_PAGE_PREFIXES:
        return body
    if prefix == "Overload":
        owner, _, _ = split_member_id(body)
        return owner
    if prefix in {"M", "P", "F", "E"}:
        owner, _, _ = split_member_id(body)
        return owner
    raise ValueError(f"Unsupported Help ID: {help_id}")


def handbook_for_entity(entity: str) -> str:
    if entity.startswith("PsrApi.Synchronization"):
        return "realtime-and-sync.md"
    if entity.startswith("PsrApi.Managers.RealtimeEventManager"):
        return "realtime-and-sync.md"
    if entity.startswith("PsrApi.Data.PsrRealtime") or entity.startswith("PsrApi.Data.PsrProgressToken"):
        return "realtime-and-sync.md"
    if entity.startswith("PsrApi.Internals.AuthFlow"):
        return "authentication-and-sessions.md"
    if entity.startswith("PsrApi.Internals"):
        return "internals.md"
    if entity.startswith("PsrApi.Managers.AuthenticationManagerV2"):
        return "authentication-and-sessions.md"
    if entity.startswith("PsrApi.Managers.ApiKeyManager"):
        return "authentication-and-sessions.md"
    if entity == "PsrApi.PsrSessionState":
        return "authentication-and-sessions.md"
    if entity.startswith("PsrApi.Managers"):
        return "managers.md"
    if entity.startswith("PsrApi.Data.Enums") or entity == "PsrApi.PsrApiExceptionCode":
        return "enums-and-constants.md"
    if entity.startswith("PsrApi.Data"):
        return "data-models.md"
    return "browser-runtime.md"


def page_order(help_id: str) -> tuple[int, str]:
    if help_id.startswith("N:"):
        return (0, help_id)
    if help_id.startswith("T:"):
        return (1, help_id)
    if help_id.startswith("M:"):
        _, member, _ = split_member_id(help_id.split(":", 1)[1])
        if member == "#ctor":
            return (2, help_id)
        return (6, help_id)
    if help_id.startswith("Properties.T:"):
        return (3, help_id)
    if help_id.startswith("P:"):
        return (4, help_id)
    if help_id.startswith("Methods.T:"):
        return (5, help_id)
    if help_id.startswith("Overload:"):
        return (5, help_id)
    if help_id.startswith("Events.T:"):
        return (7, help_id)
    if help_id.startswith("E:"):
        return (8, help_id)
    if help_id.startswith("Fields.T:"):
        return (9, help_id)
    if help_id.startswith("F:"):
        return (10, help_id)
    return (99, help_id)


def group_title_from_page(page: Page) -> str:
    cleaned = re.sub(r"\s+(Class|Interface|Structure|Enumeration|Namespace)$", "", page.title).strip()
    return cleaned or page.entity.rsplit(".", 1)[-1]


def load_title_and_help_id(path: Path) -> tuple[str, str]:
    text = path.read_text(encoding="utf-8-sig", errors="ignore")
    title_match = re.search(r"<title>(.*?)</title>", text, re.S)
    help_id_match = re.search(r'<meta name="Microsoft.Help.Id" content="([^"]+)"', text)
    if not title_match or not help_id_match:
        raise ValueError(f"Unable to parse metadata from {path}")
    return collapse_inline(title_match.group(1)), help_id_match.group(1).strip()


def list_local_doc_pages(root: Path) -> list[Path]:
    return sorted(root.glob("*.htm"))


def extract_local_doc_target(href: str) -> str | None:
    href = href.split("#", 1)[0].strip()
    if not href:
        return None
    if href.startswith("http://") or href.startswith("https://"):
        if "/api/v9/html/" not in href:
            return None
        return href.rsplit("/", 1)[-1]
    if href.endswith(".htm"):
        return Path(href).name
    return None


def collect_missing_linked_targets(root: Path) -> list[str]:
    existing = {path.name for path in list_local_doc_pages(root)}
    linked: set[str] = set()
    for path in list_local_doc_pages(root):
        text = path.read_text(encoding="utf-8-sig", errors="ignore")
        for match in DOC_HREF_PATTERN.findall(text):
            target = extract_local_doc_target(match)
            if target:
                linked.add(target)
    return sorted(target for target in linked if target not in existing)


def ensure_mirror_ready() -> None:
    if not SOURCE_HTML_ROOT.exists() or "--refresh" in sys.argv:
        subprocess.run(["node", str(MIRROR_SCRIPT)], cwd=REPO_ROOT, check=True)
    missing = collect_missing_linked_targets(SOURCE_HTML_ROOT)
    if missing:
        subprocess.run(["node", str(MIRROR_SCRIPT)], cwd=REPO_ROOT, check=True)
        missing = collect_missing_linked_targets(SOURCE_HTML_ROOT)
    if missing:
        raise SystemExit(
            "Netwrix Password Secure docs mirror is incomplete after refresh. Missing linked pages:\n"
            + "\n".join(missing[:100])
        )


def resolve_doc_href(href: str, current_page: Page, pages_by_source: dict[str, Page]) -> str | None:
    href = href.strip()
    if not href or href.endswith("#!") or href.startswith("#"):
        return None
    target = extract_local_doc_target(href)
    if target:
        linked_page = pages_by_source.get(target)
        if linked_page is None:
            raise KeyError(f"Unresolved local doc target: {target} from {current_page.source_name}")
        group_anchor = f"group-{sanitize_anchor(linked_page.group_key)}"
        if linked_page.handbook == current_page.handbook:
            return f"#{group_anchor}"
        return f"{linked_page.handbook}#{group_anchor}"
    if href.startswith("http://") or href.startswith("https://"):
        return href
    return None


def render_inline(node: Node | str, current_page: Page, pages_by_source: dict[str, Page]) -> str:
    if isinstance(node, str):
        return node
    if node.tag == "br":
        return "\n"
    if node.tag == "img":
        return ""
    if node.tag == "a":
        text = collapse_inline("".join(render_inline(child, current_page, pages_by_source) for child in node.children))
        text = text or node.attrs.get("title", "") or Path(node.attrs.get("href", "")).stem
        if text in {"Top", "Copy"}:
            return ""
        href = resolve_doc_href(node.attrs.get("href", ""), current_page, pages_by_source)
        if href:
            return f"[{text}]({href})"
        return text
    return "".join(render_inline(child, current_page, pages_by_source) for child in node.children)


def render_pre(node: Node) -> str:
    code = text_content(node).strip("\n")
    if not code.strip():
        return ""
    return f"```csharp\n{code.strip()}\n```"


def is_icon_column(rows: list[list[str]]) -> bool:
    if not rows or any(not row for row in rows):
        return False
    return all(collapse_inline(row[0]) == "" for row in rows)


def render_blocks(children: list[Node | str], current_page: Page, pages_by_source: dict[str, Page]) -> str:
    blocks: list[str] = []
    paragraph_parts: list[str] = []

    def flush_paragraph() -> None:
        paragraph = collapse_inline("".join(paragraph_parts))
        paragraph_parts.clear()
        if paragraph:
            blocks.append(paragraph)

    for child in children:
        if isinstance(child, str):
            paragraph_parts.append(child)
            continue
        if child.tag in BLOCK_TAGS:
            flush_paragraph()
            block = render_block(child, current_page, pages_by_source)
            if block:
                blocks.append(block)
            continue
        paragraph_parts.append(render_inline(child, current_page, pages_by_source))

    flush_paragraph()
    return "\n\n".join(block for block in (block.strip() for block in blocks) if block)


def render_table(node: Node, current_page: Page, pages_by_source: dict[str, Page]) -> str:
    if "titleTable" in get_classes(node):
        return ""
    row_nodes = find_all(node, lambda candidate: candidate.tag == "tr")
    rows: list[list[str]] = []
    header_rows = 0
    for row_node in row_nodes:
        cells = [child for child in row_node.children if isinstance(child, Node) and child.tag in {"th", "td"}]
        if not cells:
            continue
        if all(cell.tag == "th" for cell in cells):
            header_rows += 1
        row: list[str] = []
        for cell in cells:
            cell_text = render_blocks(cell.children, current_page, pages_by_source).replace("\n\n", "<br><br>")
            cell_text = cell_text.replace("\n", "<br>")
            row.append(collapse_inline(cell_text))
        rows.append(row)
    if not rows:
        return ""
    if is_icon_column(rows):
        rows = [row[1:] for row in rows]
    width = max(len(row) for row in rows)
    rows = [row + [""] * (width - len(row)) for row in rows]
    headers = rows[0]
    body_rows = rows[1:]
    if header_rows == 0:
        headers = [f"Column {index + 1}" for index in range(width)]
        body_rows = rows
    lines = [
        f"| {' | '.join(escape_pipes(header) for header in headers)} |",
        f"| {' | '.join(['---'] * width)} |",
    ]
    for row in body_rows:
        lines.append(f"| {' | '.join(escape_pipes(cell) for cell in row)} |")
    return "\n".join(lines)


def render_heading(node: Node, current_page: Page, pages_by_source: dict[str, Page]) -> str:
    level = int(node.tag[1])
    text = collapse_inline(render_inline(node, current_page, pages_by_source))
    if not text:
        return ""
    return f"{'#' * level} {text}"


def render_block(node: Node, current_page: Page, pages_by_source: dict[str, Page]) -> str:
    if node.tag in {"h1", "h2", "h3", "h4"}:
        return render_heading(node, current_page, pages_by_source)
    if node.tag == "pre":
        return render_pre(node)
    if node.tag == "table":
        return render_table(node, current_page, pages_by_source)
    if node.tag in {"ul", "ol"}:
        lines: list[str] = []
        for child in node.children:
            if isinstance(child, Node) and child.tag == "li":
                item = render_blocks(child.children, current_page, pages_by_source).replace("\n", " ")
                item = collapse_inline(item)
                if item:
                    lines.append(f"- {item}")
        return "\n".join(lines)
    return render_blocks(node.children, current_page, pages_by_source)


def render_page(page: Page, pages_by_source: dict[str, Page]) -> str:
    raw_html = page.source_path.read_text(encoding="utf-8-sig", errors="ignore")
    topic_root = build_dom(extract_topic_html(raw_html))
    topic = find_first(topic_root, lambda node: node.tag == "div" and node.attrs.get("id") == "TopicContent") or topic_root
    children = [child for child in topic.children if not (isinstance(child, Node) and child.tag == "h1")]

    sections: list[str] = []
    prelude: list[Node | str] = []
    index = 0
    while index < len(children):
        child = children[index]
        if isinstance(child, Node) and child.tag == "div" and "collapsibleAreaRegion" in get_classes(child):
            break
        prelude.append(child)
        index += 1

    prelude_text = render_blocks(prelude, page, pages_by_source)
    if prelude_text:
        sections.append(prelude_text)

    while index < len(children):
        child = children[index]
        if isinstance(child, Node) and child.tag == "div" and "collapsibleAreaRegion" in get_classes(child):
            title_node = find_first(child, lambda candidate: "collapsibleRegionTitle" in get_classes(candidate))
            section_title = collapse_inline(text_content(title_node)) if title_node else ""
            section_body = ""
            if index + 1 < len(children):
                next_child = children[index + 1]
                if isinstance(next_child, Node) and "collapsibleSection" in get_classes(next_child):
                    section_body = render_blocks(next_child.children, page, pages_by_source)
                    index += 1
            if section_title:
                sections.append(f"## {section_title}")
            if section_body:
                sections.append(section_body)
        index += 1

    body = "\n\n".join(section.strip() for section in sections if section.strip())
    if body:
        body = demote_headings(body, 2)
        body = cleanup_rendered_markdown(body)
    return f"### {page.title}\n\n{body}\n".rstrip() + "\n"


def cleanup_rendered_markdown(markdown: str) -> str:
    lines = markdown.splitlines()
    cleaned: list[str] = []
    index = 0
    while index < len(lines):
        line = lines[index]
        stripped = line.strip()
        if re.fullmatch(r'<a id="page-[^"]+"></a>', stripped):
            index += 1
            continue
        if stripped == "Assembly:":
            index += 1
            while index < len(lines) and lines[index].strip():
                index += 1
            continue
        cleaned.append(line)
        index += 1

    text = "\n".join(cleaned)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def handbook_intro(filename: str, page_count: int, group_count: int) -> str:
    if filename == "browser-runtime.md":
        return "\n".join(
            [
                "This is the primary JavaScript runtime handbook for browser integrations.",
                "",
                "- Browser runtime: use the Netwrix Password Secure browser bundle provided by the target environment.",
                "- Injected globals: `window.PsrApi`, `window.PsrApiEnums`, `window.PsrApiTypes`",
                "- Instantiate the SDK through `new window.PsrApi(apiUrl, options?)`.",
                "- Use this handbook for the root API surface, the top-level namespace, and core runtime exceptions.",
                f"- Included official SDK pages: `{page_count}` across `{group_count}` grouped sections.",
                "",
                "```html",
                '<script src=\"path/to/psrApi.js\"></script>',
                "<script>",
                "  const api = new window.PsrApi(baseUrl)",
                "</script>",
                "```",
            ]
        )
    if filename == "node-runtime.md":
        return "\n".join(
            [
                "This handbook covers the Node/CommonJS entry point that mirrors the browser runtime surface.",
                "",
                "- Node runtime: use the CommonJS bundle or package supplied by the target environment.",
                "- CommonJS exports: `PsrApi`, `PsrApiEnums`, `PsrApiTypes`",
                "- Use the browser, authentication, managers, data, and enums handbooks for the API surface details because the published SDK docs are not Node-specific.",
                "",
                "```js",
                "const { PsrApi, PsrApiEnums, PsrApiTypes } = require('path-or-package-provided-by-your-environment')",
                "const api = new PsrApi(baseUrl)",
                "```",
            ]
        )
    if filename == "internals.md":
        return "\n".join(
            [
                "This handbook groups Netwrix Password Secure SDK internal helper namespaces and types that support higher-level runtime flows.",
                "",
                "- Use this for internal helper objects such as key-management and decryption-chain support types.",
                "- Auth-flow internals stay in the authentication handbook because they are directly tied to login and session bootstrap behavior.",
                f"- Included official SDK pages: `{page_count}` across `{group_count}` grouped sections.",
            ]
        )
    if filename == "authentication-and-sessions.md":
        return "\n".join(
            [
                "This handbook groups session lifecycle, authentication flow, API key inspection, and auth-flow support types.",
                "",
                "- Primary JS managers: `authenticationManagerV2` and `apiKeyManager`",
                "- Browser and Node runtimes both expose the same manager names on the root `PsrApi` instance.",
                f"- Included official SDK pages: `{page_count}` across `{group_count}` grouped sections.",
            ]
        )
    if filename == "managers.md":
        return "\n".join(
            [
                "This handbook groups the manager classes that perform most application work against Netwrix Password Secure.",
                "",
                "- Manager names should follow the JavaScript runtime surface, not renamed C# variants.",
                "- Browser and Node runtimes expose these managers from the root `PsrApi` instance.",
                f"- Included official SDK pages: `{page_count}` across `{group_count}` grouped sections.",
            ]
        )
    if filename == "data-models.md":
        return "\n".join(
            [
                "This handbook groups the published SDK data contracts used in request and response payloads.",
                "",
                "- Prefer these shapes when building TypeScript types or PowerShell request bodies.",
                f"- Included official SDK pages: `{page_count}` across `{group_count}` grouped sections.",
            ]
        )
    if filename == "enums-and-constants.md":
        return "\n".join(
            [
                "This handbook groups published enums and top-level constants referenced throughout the API.",
                "",
                "- Browser runtime also exposes enum values via `window.PsrApiEnums`.",
                f"- Included official SDK pages: `{page_count}` across `{group_count}` grouped sections.",
            ]
        )
    if filename == "realtime-and-sync.md":
        return "\n".join(
            [
                "This handbook groups realtime event APIs, progress-token-related pages, and synchronization types.",
                "",
                "- Use this for event payloads, session-close notifications, synchronization protocol types, and result objects.",
                f"- Included official SDK pages: `{page_count}` across `{group_count}` grouped sections.",
            ]
        )
    raise ValueError(f"Unknown handbook: {filename}")


def write_index(pages: list[Page]) -> None:
    counts = defaultdict(int)
    for page in pages:
        counts[page.handbook] += 1

    lines = [
        "# Netwrix Password Secure API Docs",
        "",
        "This bundled reference set is the primary documentation surface for the `pws-api` skill.",
        "",
        "- Refresh the official source mirror with `node ./scripts/mirror-passwordsafe-docs.mjs`.",
        "- Rebuild these bundled handbooks with `python3 scripts/build-skill-reference-docs.py`.",
        "",
        "## Handbooks",
        "",
    ]
    descriptions = {
        "browser-runtime.md": "Primary JavaScript/browser runtime guide, including the injected window globals and core runtime pages.",
        "node-runtime.md": "Node/CommonJS entry point guidance that mirrors the browser runtime surface.",
        "internals.md": "Internal helper namespaces and SDK support types that are not part of the main browser runtime overview.",
        "authentication-and-sessions.md": "Authentication managers, API keys, auth-flow internals, and session lifecycle pages.",
        "managers.md": "Manager classes for containers, rights, roles, options, policies, templates, and similar operational APIs.",
        "data-models.md": "Published SDK request and response models, behaviours, and data key structures.",
        "enums-and-constants.md": "Published enums and top-level constants used throughout the API.",
        "realtime-and-sync.md": "Realtime events, progress-token-related pages, and synchronization types.",
    }
    for filename in HANDBOOK_ORDER:
        title = HANDBOOK_TITLES[filename]
        lines.append(f"- [{title}]({filename})")
        lines.append(f"  Pages: `{counts.get(filename, 0)}`. {descriptions[filename]}")
    lines.append("")
    (OUTPUT_ROOT / "index.md").write_text("\n".join(lines), encoding="utf-8")


def validate_no_external_doc_links() -> None:
    offenders: list[str] = []
    for path in OUTPUT_ROOT.glob("*.md"):
        text = path.read_text(encoding="utf-8")
        if LOCAL_DOC_PATTERN.search(text):
            offenders.append(str(path))
    if offenders:
        raise SystemExit(
            "Bundled markdown still contains external Netwrix Password Secure doc links:\n" + "\n".join(offenders)
        )


def build_pages() -> list[Page]:
    pages: list[Page] = []
    for path in list_local_doc_pages(SOURCE_HTML_ROOT):
        title, help_id = load_title_and_help_id(path)
        entity = entity_from_help_id(help_id)
        handbook = handbook_for_entity(entity)
        pages.append(
            Page(
                source_name=path.name,
                source_path=path,
                title=title,
                help_id=help_id,
                entity=entity,
                handbook=handbook,
                anchor=f"page-{sanitize_anchor(help_id)}",
                group_key=entity,
                group_title="",
            )
        )

    pages_by_entity: dict[str, list[Page]] = defaultdict(list)
    for page in pages:
        pages_by_entity[page.group_key].append(page)

    for entity, entity_pages in pages_by_entity.items():
        preferred = sorted(entity_pages, key=lambda page: page_order(page.help_id))[0]
        group_title = group_title_from_page(preferred)
        for page in entity_pages:
            page.group_title = group_title

    return pages


def write_handbooks(pages: list[Page]) -> None:
    pages_by_source = {page.source_name: page for page in pages}
    for page in pages:
        page.markdown = render_page(page, pages_by_source)

    by_handbook: dict[str, dict[str, list[Page]]] = defaultdict(lambda: defaultdict(list))
    for page in pages:
        by_handbook[page.handbook][page.group_key].append(page)

    shutil.rmtree(OUTPUT_ROOT, ignore_errors=True)
    OUTPUT_ROOT.mkdir(parents=True, exist_ok=True)

    for handbook in HANDBOOK_ORDER:
        groups = by_handbook.get(handbook, {})
        group_items = sorted(groups.items(), key=lambda item: item[0])
        lines = [f"# {HANDBOOK_TITLES[handbook]}", "", handbook_intro(handbook, sum(len(pages) for pages in groups.values()), len(groups))]

        if group_items:
            lines.extend(["", "## Contents", ""])
            for group_key, group_pages in group_items:
                anchor = f"group-{sanitize_anchor(group_key)}"
                title = group_pages[0].group_title
                lines.append(f"- [{title}](#{anchor})")

            for group_key, group_pages in group_items:
                group_anchor = f"group-{sanitize_anchor(group_key)}"
                title = group_pages[0].group_title
                lines.extend(["", f'<a id="{group_anchor}"></a>', f"## {title}", ""])
                for page in sorted(group_pages, key=lambda page: page_order(page.help_id)):
                    lines.append(page.markdown.rstrip())
                    lines.append("")

        content = "\n".join(lines).rstrip() + "\n"
        (OUTPUT_ROOT / handbook).write_text(content, encoding="utf-8")

    write_index(pages)
    validate_no_external_doc_links()


def main() -> None:
    ensure_mirror_ready()
    pages = build_pages()
    write_handbooks(pages)
    print(f"Bundled {len(pages)} official doc pages into {OUTPUT_ROOT}")
    print(f"Wrote {len(HANDBOOK_ORDER) + 1} markdown files")


if __name__ == "__main__":
    main()
