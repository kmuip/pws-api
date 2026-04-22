export declare const MtoHashAlgorithms: {
    readonly Pbkdf2Sha1_100000Iterations: 0;
    readonly Pbkdf2Sha256_100000Iterations: 1;
    readonly Pbkdf2Sha256_623420Iterations: 2;
};
export type MtoHashAlgorithm = (typeof MtoHashAlgorithms)[keyof typeof MtoHashAlgorithms];
