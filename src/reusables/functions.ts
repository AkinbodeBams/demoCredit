export function generateToken(bvn: string): string {
  const expirationEpoch = Date.now() + 0.2 * 60 * 1000;
  // console.log(exp);

  return `${bvn}-${expirationEpoch}`;
}
