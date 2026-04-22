import forge from 'node-forge'
import {
  RSA_SEPARATOR,
  type CryptoValue,
  toBinaryString,
  toSerializedKeyBytes,
  utf8ToBinary,
} from './shared.js'

function parseXmlTag(tagName: string, xml: string) {
  const openTag = `<${tagName}>`
  const closeTag = `</${tagName}>`
  const start = xml.indexOf(openTag)
  const end = xml.indexOf(closeTag, start + openTag.length)
  if (start < 0 || end < 0) {
    throw new Error(`Missing RSA XML field ${tagName}`)
  }

  return xml.slice(start + openTag.length, end)
}

function bigIntegerFromBase64(value: string) {
  const hex = forge.util.createBuffer(forge.util.decode64(value)).toHex()
  return new forge.jsbn.BigInteger(hex, 16)
}

function base64FromHex(value: string) {
  return forge.util.encode64(forge.util.hexToBytes(value))
}

function padHex(value: string) {
  const extra = (8 - (value.length % 8)) % 8
  return `${'0'.repeat(extra)}${value}`
}

function decodeMaybeBase64Xml(value: string) {
  let decoded = value
  let attempts = 0

  while (!decoded.startsWith('<') && attempts < 4) {
    decoded = forge.util.decode64(decoded)
    attempts += 1
  }

  return decoded
}

export class NativeRsa {
  private privateKey: forge.pki.rsa.PrivateKey | null = null
  private publicKey: forge.pki.rsa.PublicKey | null = null

  generateKeyPair() {
    const pair = forge.pki.rsa.generateKeyPair({ bits: 2048, e: 0x10001 })
    this.privateKey = pair.privateKey
    this.publicKey = pair.publicKey
  }

  publicKeyFromXml(value: string) {
    const xml = decodeMaybeBase64Xml(value)
    this.publicKey = forge.pki.setRsaPublicKey(
      bigIntegerFromBase64(parseXmlTag('Modulus', xml)),
      bigIntegerFromBase64(parseXmlTag('Exponent', xml)),
    )
  }

  privateKeyFromXml(value: string) {
    const xml = decodeMaybeBase64Xml(value)
    this.privateKey = forge.pki.setRsaPrivateKey(
      bigIntegerFromBase64(parseXmlTag('Modulus', xml)),
      bigIntegerFromBase64(parseXmlTag('Exponent', xml)),
      bigIntegerFromBase64(parseXmlTag('D', xml)),
      bigIntegerFromBase64(parseXmlTag('P', xml)),
      bigIntegerFromBase64(parseXmlTag('Q', xml)),
      bigIntegerFromBase64(parseXmlTag('DP', xml)),
      bigIntegerFromBase64(parseXmlTag('DQ', xml)),
      bigIntegerFromBase64(parseXmlTag('InverseQ', xml)),
    )
  }

  publicKeyToXml() {
    if (!this.publicKey) {
      throw new Error('RSA public key is not initialized')
    }

    const xml = [
      '<RSAKeyValue>',
      `<Modulus>${base64FromHex(this.publicKey.n.toString(16))}</Modulus>`,
      `<Exponent>${base64FromHex(this.publicKey.e.toString(16))}</Exponent>`,
      '</RSAKeyValue>',
    ].join('')

    return forge.util.encode64(xml)
  }

  privateKeyToXml() {
    if (!this.privateKey) {
      throw new Error('RSA private key is not initialized')
    }

    const xml = [
      '<RSAKeyValue>',
      `<Modulus>${base64FromHex(this.privateKey.n.toString(16))}</Modulus>`,
      `<Exponent>${base64FromHex(this.privateKey.e.toString(16))}</Exponent>`,
      `<P>${base64FromHex(this.privateKey.p.toString(16))}</P>`,
      `<Q>${base64FromHex(this.privateKey.q.toString(16))}</Q>`,
      `<DP>${base64FromHex(padHex(this.privateKey.dP.toString(16)))}</DP>`,
      `<DQ>${base64FromHex(padHex(this.privateKey.dQ.toString(16)))}</DQ>`,
      `<InverseQ>${base64FromHex(padHex(this.privateKey.qInv.toString(16)))}</InverseQ>`,
      `<D>${base64FromHex(padHex(this.privateKey.d.toString(16)))}</D>`,
      '</RSAKeyValue>',
    ].join('')

    return forge.util.encode64(xml)
  }

  encrypt(value: string) {
    if (!this.publicKey) {
      throw new Error('RSA public key is not initialized')
    }

    return this.publicKey.encrypt(value)
  }

  decrypt(value: string) {
    if (!this.privateKey) {
      throw new Error('RSA private key is not initialized')
    }

    return this.privateKey.decrypt(value)
  }

  signData(value: string) {
    if (!this.privateKey) {
      throw new Error('RSA private key is not initialized')
    }

    const digest = forge.md.sha512.create()
    digest.update(value, 'raw')
    return this.privateKey.sign(digest)
  }
}

export function getPublicKeyType(value: CryptoValue) {
  const bytes = toSerializedKeyBytes(value)
  if (bytes[0] === 80 && bytes[1] === 70) {
    return 'RSA'
  }

  if (bytes[0] === 146 && bytes[1] === 196) {
    return 'ECC'
  }

  throw new Error('Key-type could not be determined!')
}

export function getPrivateKeyType(value: CryptoValue) {
  const bytes = toSerializedKeyBytes(value)
  if (bytes[0] === 80 && bytes[1] === 70) {
    return 'RSA'
  }

  if (bytes[0] === 147 && bytes[1] === 196) {
    return 'ECC'
  }

  throw new Error('Key-type could not be determined!')
}

export async function encryptWithPasswordProviderV1(password: string, plaintext: CryptoValue) {
  const salt = forge.random.getBytesSync(16)
  const key = forge.util.decode64(forge.pkcs5.pbkdf2(password, salt, 1000, 32))
  const iv = forge.random.getBytesSync(16)
  const cipher = forge.cipher.createCipher('AES-CBC', key)
  cipher.start({ iv })
  cipher.update(forge.util.createBuffer(toBinaryString(plaintext)))
  cipher.finish()
  return `${RSA_SEPARATOR}${salt}${RSA_SEPARATOR}${iv}${RSA_SEPARATOR}${cipher.output.data}`
}

export async function decryptWithPasswordProviderV1(password: string, encryptedValue: CryptoValue) {
  const parts = toBinaryString(encryptedValue).split(RSA_SEPARATOR)
  const salt = parts[1]
  const iv = parts[2]
  const ciphertext = parts[3]
  const key = forge.util.decode64(forge.pkcs5.pbkdf2(utf8ToBinary(password), salt, 1000, 32))
  const decipher = forge.cipher.createDecipher('AES-CBC', key)
  decipher.start({ iv })
  decipher.update(forge.util.createBuffer(ciphertext))
  decipher.finish()
  return decipher.output.data
}

export async function encryptWithRsaProvider(publicKey: CryptoValue, plaintext: CryptoValue) {
  const randomSecret = forge.random.getBytesSync(32)
  const salt = forge.random.getBytesSync(32)
  const key = forge.util.decode64(forge.pkcs5.pbkdf2(randomSecret, salt, 1000, 32))
  const rsa = new NativeRsa()
  rsa.publicKeyFromXml(toBinaryString(publicKey))
  const encryptedSecret = rsa.encrypt(randomSecret)
  const iv = forge.random.getBytesSync(16)
  const cipher = forge.cipher.createCipher('AES-CBC', key)
  cipher.start({ iv })
  cipher.update(forge.util.createBuffer(toBinaryString(plaintext)))
  cipher.finish()
  return `${RSA_SEPARATOR}${salt}${RSA_SEPARATOR}${encryptedSecret}${RSA_SEPARATOR}${iv}${RSA_SEPARATOR}${cipher.output.data}`
}

export async function decryptWithRsaProvider(privateKey: CryptoValue, encryptedValue: CryptoValue) {
  const parts = toBinaryString(encryptedValue).split(RSA_SEPARATOR)
  if (parts.length < 5) {
    return ''
  }

  const salt = parts[1]
  const encryptedSecret = parts[2]
  const iv = parts[3]
  const ciphertext = parts[4]
  const rsa = new NativeRsa()
  rsa.privateKeyFromXml(toBinaryString(privateKey))
  const secret = rsa.decrypt(encryptedSecret)
  const key = forge.util.decode64(forge.pkcs5.pbkdf2(secret, salt, 1000, 32))
  const decipher = forge.cipher.createDecipher('AES-CBC', key)
  decipher.start({ iv })
  decipher.update(forge.util.createBuffer(ciphertext))
  decipher.finish()
  return decipher.output.data
}
