import { getAccessToken } from "./useAuth";

export async function useEndpoint(endpoint) {
  const token = await getAccessToken();

  if(!token) {
    throw new Error("Token não disponível");
  }

  const response = await fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`API falhou: ${response.statusText}`);
  }

  return response.json();
}
