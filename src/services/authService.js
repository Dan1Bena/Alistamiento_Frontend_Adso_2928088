const API_URL = "http://localhost:3000/api/auth"

export const loginRequest = async ({ email, password }) => {
  try {
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json().catch(() => null); // ← evita romper

    // Si el backend responde error (401, 400, etc.)
    if (!response.ok) return { token: null, usuario: null };

    return data;
  } catch (error) {
    return { token: null, usuario: null };
  }
};