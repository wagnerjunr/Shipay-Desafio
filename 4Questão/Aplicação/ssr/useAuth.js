const AUTH_URL = process.env.AUTH_URL;
const ACCESS_KEY = process.env.ACCESS_KEY;
const SECRET_KEY = process.env.SECRET_KEY;
const REFRESH_URL = process.env.REFRESH_URL;

let accessToken = null;
let refreshToken = null;
let tokenExpiresAt = null;
let refreshTokenExpiresAt = null;

export async function useAuth() {
  const response = await fetch(AUTH_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      access_key: ACCESS_KEY,
      secret_key: SECRET_KEY,
    }),
  });

  if (!response.ok) {
    throw new Error("Falha na Autenticação");
  }

  const data = await response.json();
  accessToken = data.access_token;
  refreshToken = data.refresh_token;
  tokenExpiresAt = Date.now() + data.access_token_expires_in * 1000 - 60000;
  refreshTokenExpiresAt = Date.now() + data.refresh_token_expires_in * 1000 - 60000;
}
export async function getAccessToken() {
  if (!accessToken || Date.now() > tokenExpiresAt) {
    try {
      await refreshAccessToken();  // Caso exista uma função refreshAccessToken, se não existir, vai para a função authenticate
    } catch (error) {
      await authenticate(); // Reautentica se os tokens estiverem expirados
    }
  }
  return accessToken;
}

// Caso exista uma função refreshAccessToken esse é um exemplo de como ela pode ser implementada
export async function refreshAccessToken() {
  if (!refreshToken || Date.now() > refreshTokenExpiresAt) {
    throw new Error("Refresh token expirado.");
  }

  const response = await fetch(REFRESH_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  if (!response.ok) {
    throw new Error("Failed to refresh access token");
  }

  const data = await response.json();
  accessToken = data.access_token;
  tokenExpiresAt = Date.now() + data.access_token_expires_in * 1000 - 60000;
}