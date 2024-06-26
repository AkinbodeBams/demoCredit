export function generateToken(bvn: string): string {
  const expirationEpoch = Date.now() + 20 * 60 * 1000;
  return `${bvn}-${expirationEpoch}`;
}
