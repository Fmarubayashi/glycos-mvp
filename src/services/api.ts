import { Measure } from "@/types/Measure";

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
  async createMeasure(data: Partial<Measure>) {
    try {
      const response = await fetch(`${this.baseUrl}/measure/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        return responseData;
        console.log(responseData);
      } else {
        throw new Error("Request failed");
      }
    } catch (error) {
      return error;
    }
  },

  async getMeasuresById(id: string) {
    const res = await fetch(`${this.baseUrl}/measure/${id}`);
    const data = await res.json();
    if (data) return data;
  },
};

export default api;
