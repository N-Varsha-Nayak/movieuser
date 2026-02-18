const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export async function apiRequest(path, payload) {
  try {
    const response = await fetch(`${API_BASE}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Request failed");
    }

    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("Cannot connect to API server. Check VITE_API_BASE_URL and backend CORS settings.");
    }
    throw error;
  }
}