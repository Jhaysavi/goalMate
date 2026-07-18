export async function webcryptoPasswordHash(password: string): Promise<string> {
  const enc = new TextEncoder();
  const data = enc.encode(`goalmates:v1:${password}`);
  const buf = await crypto.subtle.digest('SHA-256', data);
  const bytes = new Uint8Array(buf);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

