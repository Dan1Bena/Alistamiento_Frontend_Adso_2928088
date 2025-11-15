// src/services/instructorService.js
const API_BASE = "/api/instructores"; // asume que tu proxy está configurado o frontend usa full path

export const leerFichasPorInstructor = async (idInstructor) => {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
    };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const resp = await fetch(`${API_BASE}/${idInstructor}/fichas`, {
      method: "GET",
      headers,
    });

    if (!resp.ok) {
      const text = await resp.text();
      throw new Error(`HTTP ${resp.status} - ${text}`);
    }

    const data = await resp.json();
    return data;
  } catch (err) {
    console.error("leerFichasPorInstructor error:", err);
    throw err;
  }
};
