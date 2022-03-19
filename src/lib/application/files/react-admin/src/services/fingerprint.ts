import FingerprintJS from '@fingerprintjs/fingerprintjs'

let _resolve
const _promise = new Promise((resolve, reject) => {
  _resolve = resolve
})
let _fingerPrint: string

async function loadFingerPrint() {
  const fp = await FingerprintJS.load()
  const result = await fp.get()
  _fingerPrint = result.visitorId
  _resolve(_fingerPrint)
}

loadFingerPrint()

export async function getFingerPrint() {
  if (_fingerPrint) {
    return _fingerPrint
  }
  return await _promise
}
