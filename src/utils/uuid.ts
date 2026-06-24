// Generate a RFC4122-ish v4 UUID.
//
// `crypto.randomUUID()` is only available in a "secure context": HTTPS or
// http://localhost. When the dev server is opened over a plain-HTTP LAN IP
// (e.g. http://192.168.1.4:3000 on a phone) it is undefined, so we fall back
// to building the UUID from crypto.getRandomValues, and finally to Math.random
// for very old browsers. This is only used for a client-side session id, so the
// fallback's weaker randomness is acceptable.
export function uuid(): string {
  const c = (globalThis as any).crypto

  if (c?.randomUUID) {
    return c.randomUUID()
  }

  if (c?.getRandomValues) {
    // RFC4122 v4 from 16 random bytes.
    const bytes: Uint8Array = c.getRandomValues(new Uint8Array(16))
    bytes[6] = (bytes[6] & 0x0f) | 0x40 // version 4
    bytes[8] = (bytes[8] & 0x3f) | 0x80 // variant 10
    const hex = Array.from(bytes, (b: number) => b.toString(16).padStart(2, '0'))
    return (
      hex.slice(0, 4).join('') +
      '-' +
      hex.slice(4, 6).join('') +
      '-' +
      hex.slice(6, 8).join('') +
      '-' +
      hex.slice(8, 10).join('') +
      '-' +
      hex.slice(10, 16).join('')
    )
  }

  // Last-resort fallback for environments without the Web Crypto API.
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (ch) => {
    const r = (Math.random() * 16) | 0
    const v = ch === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
