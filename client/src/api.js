const API_BASE = import.meta.env.PROD ? "/api" : "http://localhost:5000/api";

export async function postApi(path, payload) {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Request failed");
    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("Cannot connect to backend API.");
    }
    throw error;
  }
}
