#!/usr/bin/env node

import { existsSync, mkdirSync, readdirSync, readFileSync } from 'node:fs'
import { basename, dirname, resolve } from 'node:path'
import { spawnSync } from 'node:child_process'

const args = new Map()
for (let i = 2; i < process.argv.length; i += 1) {
  const arg = process.argv[i]
  if (!arg.startsWith('--')) continue
  const [key, inlineValue] = arg.slice(2).split('=', 2)
  const value = inlineValue ?? process.argv[i + 1]
  args.set(key, value)
  if (inlineValue == null) i += 1
}

const outputDir = resolve(args.get('output') ?? 'docs/passwordsafe/reference-site')
const zipPath = args.get('zip') ? resolve(args.get('zip')) : null
const seeds = [
  'https://help.passwordsafe.de/api/v9/html/e113b193-3482-8477-c479-6cf97ecbf796.htm',
  'https://help.passwordsafe.de/api/v9/html/c30ca86c-887f-9da8-67b6-6e156f717c01.htm',
  'https://help.passwordsafe.de/api/v9/html/4c8da4ff-4d44-da82-abc2-c61008de2866.htm',
]

mkdirSync(outputDir, { recursive: true })

function run(command, commandArgs) {
  const result = spawnSync(command, commandArgs, { stdio: 'inherit' })
  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
}

if (zipPath) {
  if (!existsSync(zipPath)) {
    console.error(`Zip file not found: ${zipPath}`)
    process.exit(1)
  }

  run('python3', ['-m', 'zipfile', '-e', zipPath, outputDir])
  process.exit(0)
}

const acceptRegex = '/api/v9/(html|styles|scripts|icons)/'
const commonArgs = [
  '--recursive',
  '--convert-links',
  '--adjust-extension',
  '--page-requisites',
  '--no-parent',
  '--domains',
  'help.passwordsafe.de',
  '--accept-regex',
  acceptRegex,
  '-e',
  'robots=off',
  '--directory-prefix',
  outputDir,
]

const htmlRoot = resolve(outputDir, 'help.passwordsafe.de/api/v9/html')

function walkFiles(dir) {
  if (!existsSync(dir)) return []
  const entries = readdirSync(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const fullPath = resolve(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...walkFiles(fullPath))
      continue
    }
    files.push(fullPath)
  }
  return files
}

function collectMissingLinkedPages() {
  const htmlFiles = walkFiles(htmlRoot).filter((file) => file.endsWith('.htm'))
  const existing = new Set(htmlFiles.map((file) => basename(file)))
  const linked = new Set()
  const hrefPattern = /href="([^"]+\.htm(?:#[^"]*)?)"/gi

  for (const file of htmlFiles) {
    const text = readFileSync(file, 'utf8')
    for (const match of text.matchAll(hrefPattern)) {
      let href = match[1].split('#', 1)[0]
      if (!href) continue
      if (href.startsWith('http://') || href.startsWith('https://')) {
        if (!href.includes('/api/v9/html/')) continue
        href = href.slice(href.lastIndexOf('/') + 1)
      } else {
        href = basename(href)
      }
      if (href.endsWith('.htm')) linked.add(href)
    }
  }

  return [...linked].filter((target) => !existing.has(target)).sort()
}

function fetchMissingLinkedPages() {
  let previousMissingKey = null

  for (let pass = 1; pass <= 10; pass += 1) {
    const missing = collectMissingLinkedPages()
    if (missing.length === 0) return

    const missingKey = missing.join('\n')
    if (missingKey === previousMissingKey) {
      console.error(`Mirror closure stalled with ${missing.length} unresolved pages:`)
      console.error(missing.join('\n'))
      process.exit(1)
    }
    previousMissingKey = missingKey

    console.error(`Mirror closure pass ${pass}: fetching ${missing.length} linked pages`)
    for (const page of missing) {
      run('wget', [...commonArgs, `https://help.passwordsafe.de/api/v9/html/${page}`])
    }
  }

  const unresolved = collectMissingLinkedPages()
  console.error(
    `Mirror closure exceeded the pass limit with ${unresolved.length} unresolved pages:`,
  )
  console.error(unresolved.join('\n'))
  process.exit(1)
}

for (const seed of seeds) {
  run('wget', [...commonArgs, seed])
}

fetchMissingLinkedPages()

const markerPath = resolve(outputDir, 'MIRROR_INFO.txt')
mkdirSync(dirname(markerPath), { recursive: true })
run('python3', [
  '-c',
  [
    'from pathlib import Path',
    `Path(${JSON.stringify(markerPath)}).write_text(` +
      JSON.stringify(
        [
          'Netwrix Password Secure docs mirror',
          '',
          `Output: ${outputDir}`,
          `Source: ${seeds.join(', ')}`,
          `HTML root: ${htmlRoot}`,
        ].join('\n'),
      ) +
      ', encoding="utf-8")',
  ].join('; '),
])
