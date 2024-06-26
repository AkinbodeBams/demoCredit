export function generateToken(bvn: string): string {
    const expirationEpoch = Date.now() + 1 * 60 * 1000;
    return `${bvn}-${expirationEpoch}`;
  }
  