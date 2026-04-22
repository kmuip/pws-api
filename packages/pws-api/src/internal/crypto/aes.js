import { randomBytes } from 'node:crypto';
import { deserializeSymmetricAesRightKey, deserializeSymmetricPasswordRightKey, serializeSymmetricAesRightKey, serializeSymmetricPasswordRightKey, } from './message-pack.js';
import { cryptoImpl, randomUint8Array, textEncoder, toArrayBuffer, toBinaryString, toUint8Array, } from './shared.js';
function addPadding(value, padBytes = 128) {
    const missingLength = padBytes - (value.length % padBytes);
    const result = new Uint8Array(value.length + missingLength);
    result.set(value, 0);
    const randomPaddingLength = missingLength - 1;
    if (randomPaddingLength > 0) {
        result.set(randomUint8Array(randomPaddingLength), value.length);
    }
    result[result.length - 1] = randomPaddingLength;
    return result;
}
function removePadding(value) {
    const paddingLength = value[value.length - 1] ?? 0;
    return value.slice(0, value.length - paddingLength - 1);
}
export async function pbkdf2(password, salt, iterations, hash, bits) {
    const passwordKey = await cryptoImpl.subtle.importKey('raw', toArrayBuffer(textEncoder.encode(password)), 'PBKDF2', false, ['deriveBits']);
    return new Uint8Array(await cryptoImpl.subtle.deriveBits({ name: 'PBKDF2', hash, salt: toArrayBuffer(salt), iterations }, passwordKey, bits));
}
async function importAesGcmKey(key) {
    return cryptoImpl.subtle.importKey('raw', toArrayBuffer(toUint8Array(key)), { name: 'AES-GCM' }, false, ['encrypt', 'decrypt']);
}
export async function encryptAesGcm(key, iv, value) {
    const cryptoKey = await importAesGcmKey(key);
    return new Uint8Array(await cryptoImpl.subtle.encrypt({ name: 'AES-GCM', iv: toArrayBuffer(iv) }, cryptoKey, toArrayBuffer(value)));
}
export async function decryptAesGcm(key, iv, value) {
    const cryptoKey = await importAesGcmKey(key);
    return new Uint8Array(await cryptoImpl.subtle.decrypt({ name: 'AES-GCM', iv: toArrayBuffer(iv) }, cryptoKey, toArrayBuffer(value)));
}
async function derivePasswordAesKey(password, salt, iterations) {
    const bits = await pbkdf2(password, salt, iterations, 'SHA-256', 256);
    return cryptoImpl.subtle.importKey('raw', toArrayBuffer(bits), 'AES-GCM', false, [
        'encrypt',
        'decrypt',
    ]);
}
export async function encryptWithPasswordProviderV2(password, plaintext) {
    const salt = randomUint8Array(16);
    const aesIv = randomUint8Array(12);
    const key = await derivePasswordAesKey(password, salt, 1000);
    const encryptedValue = new Uint8Array(await cryptoImpl.subtle.encrypt({ name: 'AES-GCM', iv: toArrayBuffer(aesIv) }, key, toArrayBuffer(toUint8Array(plaintext))));
    return toBinaryString(serializeSymmetricPasswordRightKey({ salt, aesIv, encryptedValue }));
}
export async function decryptWithPasswordProviderV2(password, encryptedValue) {
    const payload = deserializeSymmetricPasswordRightKey(encryptedValue);
    const key = await derivePasswordAesKey(password, payload.salt, 1000);
    const decryptedValue = await cryptoImpl.subtle.decrypt({ name: 'AES-GCM', iv: toArrayBuffer(payload.aesIv) }, key, toArrayBuffer(payload.encryptedValue));
    return toBinaryString(new Uint8Array(decryptedValue));
}
export async function encryptWithPasswordProviderV3(password, plaintext) {
    const salt = randomUint8Array(16);
    const aesIv = randomUint8Array(12);
    const key = await derivePasswordAesKey(password, salt, 610005);
    const encryptedValue = new Uint8Array(await cryptoImpl.subtle.encrypt({ name: 'AES-GCM', iv: toArrayBuffer(aesIv) }, key, toArrayBuffer(addPadding(toUint8Array(plaintext)))));
    return toBinaryString(serializeSymmetricPasswordRightKey({ salt, aesIv, encryptedValue }));
}
export async function decryptWithPasswordProviderV3(password, encryptedValue) {
    const payload = deserializeSymmetricPasswordRightKey(encryptedValue);
    const key = await derivePasswordAesKey(password, payload.salt, 610005);
    const decryptedValue = new Uint8Array(await cryptoImpl.subtle.decrypt({ name: 'AES-GCM', iv: toArrayBuffer(payload.aesIv) }, key, toArrayBuffer(payload.encryptedValue)));
    return toBinaryString(removePadding(decryptedValue));
}
export async function encryptWithAesGcm(key, plaintext) {
    const iv = randomUint8Array(12);
    const encryptedValue = await encryptAesGcm(key, iv, toUint8Array(plaintext));
    return toBinaryString(serializeSymmetricAesRightKey({ iv, encryptedValue }));
}
export async function decryptWithAesGcm(key, encryptedValue) {
    const payload = deserializeSymmetricAesRightKey(encryptedValue);
    return toBinaryString(await decryptAesGcm(key, payload.iv, payload.encryptedValue));
}
export async function encryptWithAesGcmPadding(key, plaintext) {
    const iv = randomUint8Array(12);
    const encryptedValue = await encryptAesGcm(key, iv, addPadding(toUint8Array(plaintext)));
    return toBinaryString(serializeSymmetricAesRightKey({ iv, encryptedValue }));
}
export async function decryptWithAesGcmPadding(key, encryptedValue) {
    const payload = deserializeSymmetricAesRightKey(encryptedValue);
    const decryptedValue = await decryptAesGcm(key, payload.iv, payload.encryptedValue);
    return toBinaryString(removePadding(decryptedValue));
}
export function generateAesKey() {
    return randomBytes(32).toString('binary');
}
