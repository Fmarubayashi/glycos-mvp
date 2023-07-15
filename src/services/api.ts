const api = {
  baseUrl: "http://localhost:3000",

  async getUsers() {
    const res = await fetch(`${this.baseUrl}/users`);
    const data = await res.json();
    if (data) return data;
  },
  async getUserById(id: string) {
    const res = await fetch(`${this.baseUrl}/users/${id}`);
    const data = await res.json();
    if (data) return data;
  },
};

export default api;
