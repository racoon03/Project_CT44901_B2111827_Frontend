// nxb.service.js
import createApiClient from "./api.service";

class NxbService {
  constructor(baseUrl = "/api/nxb") {
    this.api = createApiClient(baseUrl);
  }

  // Lấy tất cả các nhà xuất bản
  async getAll() {
    return (await this.api.get("/")).data;
  }

  // Tạo một nhà xuất bản mới
  async create(data) {
    return (await this.api.post("/", data)).data;
  }

  // Xóa tất cả các nhà xuất bản
  async deleteAll() {
    return (await this.api.delete("/")).data;
  }

  // Lấy thông tin một nhà xuất bản theo ID
  async get(id) {
    return (await this.api.get(`/${id}`)).data;
  }

  // Cập nhật thông tin nhà xuất bản theo ID
  async update(id, data) {
    return (await this.api.put(`/${id}`, data)).data;
  }

  // Xóa một nhà xuất bản theo ID
  async delete(id) {
    return (await this.api.delete(`/${id}`)).data;
  }

  // Tìm nhà xuất bản theo tên
  async findByName(name) {
    return (await this.api.get(`/search?name=${name}`)).data;
  }
}

export default new NxbService();
