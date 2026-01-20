const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getAllProviders() {
  const res = await fetch(`${BASE_URL}/v1/providers`);
  if (!res.ok) {
    throw new Error('Failed to fetch providers');
  }
  return res.json();
}
