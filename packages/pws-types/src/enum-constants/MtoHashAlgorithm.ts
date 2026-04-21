export const MtoHashAlgorithms = {
  Pbkdf2Sha1_100000Iterations: 0,
  Pbkdf2Sha256_100000Iterations: 1,
  Pbkdf2Sha256_623420Iterations: 2,
} as const

export type MtoHashAlgorithm = (typeof MtoHashAlgorithms)[keyof typeof MtoHashAlgorithms]
