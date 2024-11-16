import createApiClient from "./api.service";

class SachService {
  constructor(baseUrl = "/api/sach") {
    this.api = createApiClient(baseUrl);
  }

  // Lấy tất cả các sách
  async getAll() {
    return (await this.api.get("/")).data;
  }

  // Tạo một sách mới
  async create(data) {
    return (await this.api.post("/", data)).data;
  }

  // Xóa tất cả các sách
  async deleteAll() {
    return (await this.api.delete("/")).data;
  }

  // Lấy thông tin một sách theo ID
  async get(id) {
    return (await this.api.get(`/${id}`)).data;
  }

  // Cập nhật thông tin sách theo ID
  async update(id, data) {
    return (await this.api.put(`/${id}`, data)).data;
  }

  // Xóa một sách theo ID
  async delete(id) {
    return (await this.api.delete(`/${id}`)).data;
  }

  // Tìm sách theo tên
  async findByName(name) {
    return (await this.api.get(`/search?name=${name}`)).data;
  }
}

export default new SachService();
