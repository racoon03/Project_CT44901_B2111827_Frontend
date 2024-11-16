import createApiClient from "./api.service";

class DocGiaService {
  constructor(baseUrl = "/api/docgia") {
    this.api = createApiClient(baseUrl);
  }

  // Lấy tất cả các độc giả
  async getAll() {
    return (await this.api.get("/")).data;
  }

  // Tạo một độc giả mới
  async create(data) {
    return (await this.api.post("/", data)).data;
  }

  // Xóa tất cả các độc giả
  async deleteAll() {
    return (await this.api.delete("/")).data;
  }

  // Lấy thông tin một độc giả theo ID
  async get(id) {
    return (await this.api.get(`/${id}`)).data;
  }

  // Cập nhật thông tin độc giả theo ID
  async update(id, data) {
    return (await this.api.put(`/${id}`, data)).data;
  }

  // Xóa một độc giả theo ID
  async delete(id) {
    return (await this.api.delete(`/${id}`)).data;
  }

  // Tìm độc giả theo số điện thoại
  async findByPhone(phone) {
    return (await this.api.get(`/phone/${phone}`)).data;
  }
}

export default new DocGiaService();
