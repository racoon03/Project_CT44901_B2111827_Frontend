import createApiClient from "./api.service";

class PhieuMuonService {
  constructor(baseUrl = "/api/phieumuon") {
    this.api = createApiClient(baseUrl);
  }

  // Lấy tất cả các phiếu mượn
  async getAll() {
    return (await this.api.get("/")).data;
  }

  // Tạo một phiếu mượn mới
  async create(data) {
    return (await this.api.post("/", data)).data;
  }

  // Xóa tất cả các phiếu mượn
  async deleteAll() {
    return (await this.api.delete("/")).data;
  }

  // Lấy thông tin một phiếu mượn theo ID
  async get(id) {
    return (await this.api.get(`/${id}`)).data;
  }

  // Cập nhật thông tin phiếu mượn theo ID
  async update(id, data) {
    return (await this.api.put(`/${id}`, data)).data;
  }

  // Xóa một phiếu mượn theo ID
  async delete(id) {
    return (await this.api.delete(`/${id}`)).data;
  }

  // Tìm phiếu mượn theo MaDocGia
  async findByDocGiaId(maDocGia) {
    return (await this.api.get(`/docgia/${maDocGia}`)).data;
  }

  // Tìm phiếu mượn theo MaSach
  async findBySachId(maSach) {
    return (await this.api.get(`/sach/${maSach}`)).data;
  }
}

export default new PhieuMuonService();
