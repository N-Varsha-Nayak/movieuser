const API_BASE = "http://localhost:5000/api";

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
      throw new Error("Cannot connect to API server. Ensure backend is running on http://localhost:5000.");
    }
    throw error;
  }
}
