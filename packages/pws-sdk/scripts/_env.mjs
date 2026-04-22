import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

export function loadEnv(path = resolve(process.cwd(), '../../.env')) {
  const values = {}

  for (const rawLine of readFileSync(path, 'utf8').split(/\r?\n/)) {
    const line = rawLine.trim()
    if (!line || line.startsWith('#')) {
      continue
    }

    const separator = line.indexOf('=')
    if (separator === -1) {
      continue
    }

    const key = line.slice(0, separator).trim()
    let value = line.slice(separator + 1).trim()
    if (
      value.length >= 2 &&
      ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'")))
    ) {
      value = value.slice(1, -1)
    }

    values[key] = value
  }

  return values
}

export function requireEnv(values, keys) {
  for (const key of keys) {
    if (!values[key]) {
      throw new Error(`Missing required environment variable: ${key}`)
    }
  }
}
