import parseUrl from 'parse-url'

import { pipe } from 'fp-ts/lib/function'
import * as O from 'fp-ts/lib/Option'
import * as A from 'fp-ts/lib/Array'

export type ParsedUrl = ReturnType<typeof parseUrl>

const url = 'http://www.domain.com/path/name?foo=bar&bar=42#some-hash'

function tryParsingUrl(url: string): O.Option<ParsedUrl> {
  return O.tryCatch(() => parseUrl(url))
}

function getTld(resource: string): O.Option<string> {
  return pipe(resource, (r) => r.split('.'), A.last)
}

function isDotComOpt(url: string): boolean {
  return pipe(
    url,
    tryParsingUrl,
    O.map((p) => p.resource),
    O.chain(getTld),
    O.exists((tld) => tld == 'com')
  )
}

console.log('result:', isDotComOpt(url))
