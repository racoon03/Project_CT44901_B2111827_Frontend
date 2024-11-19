import createApiClient from "./api.service";

class AuthService {
  constructor(baseUrl = "/api/auth") {
    this.api = createApiClient(baseUrl);
  }

  // Kiểm tra vai trò của người dùng (nhân viên hoặc đọc giả)
  async checkRole(userId) {
    try {
      const response = await this.api.get(`/checkrole/${userId}`);
      return response.data.role; // Trả về vai trò ("employee" hoặc "reader")
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Lỗi khi kiểm tra vai trò người dùng."
      );
    }
  }
}

export default new AuthService();
