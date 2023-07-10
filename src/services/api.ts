const api = {
  baseUrl: "http://localhost:3000",

  async getData() {
    const res = await fetch(`${this.baseUrl}/data`);
    const data = await res.json();
    if (data) return data;
  },
};

export default api;
