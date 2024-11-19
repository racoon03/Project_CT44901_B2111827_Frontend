import createApiClient from "./api.service";

class NhanVienService {
  constructor(baseUrl = "/api/nhanvien") {
    this.api = createApiClient(baseUrl);
  }

  // Lấy tất cả nhân viên
  async getAll() {
    return (await this.api.get("/")).data;
  }

  // Tạo một nhân viên mới
  async create(data) {
    return (await this.api.post("/", data)).data;
  }

  // Xóa tất cả nhân viên
  async deleteAll() {
    return (await this.api.delete("/")).data;
  }

  // Lấy thông tin một nhân viên theo ID
  async get(id) {
    return (await this.api.get(`/${id}`)).data;
  }

  // Cập nhật thông tin nhân viên theo ID
  async update(id, data) {
    return (await this.api.put(`/${id}`, data)).data;
  }

  // Xóa một nhân viên theo ID
  async delete(id) {
    return (await this.api.delete(`/${id}`)).data;
  }

  // Tìm nhân viên theo số điện thoại
  async findByPhone(phone) {
    return (await this.api.get(`/phone/${phone}`)).data;
  }

  // Đăng nhập nhân viên
  async login(SoDienThoai, Password) {
    try {
      const response = await this.api.post("/login", {
        SoDienThoai,
        Password,
      });
      return response.data; // Trả về thông tin nhân viên nếu đăng nhập thành công
    } catch (error) {
      throw new Error(error.response?.data?.message || "Đăng nhập thất bại.");
    }
  }
}

export default new NhanVienService();
