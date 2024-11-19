<template>
    <div class="login-container mt-10">

        <!-- Tabs lựa chọn Nhân Viên / Độc Giả -->
        <div class="login-tabs">
            <span :class="{ active: docgia }" @click="switchToReader">Đọc Giả</span>
            <span :class="{ active: !docgia }" @click="switchToEmployee">Nhân Viên</span>
        </div>
        <h2>Đăng Nhập {{ docgia ? "Độc Giả" : "Nhân Viên" }}</h2>

        <form @submit.prevent="handleLogin">
            <div class="form-group">
                <label for="dienthoai">Số điện thoại:</label>
                <input type="text" id="dienthoai" v-model="formData.DienThoai" class="form-control"
                    placeholder="Nhập số điện thoại" required />
            </div>
            <div class="form-group">
                <label for="password">Mật khẩu:</label>
                <input type="password" id="password" v-model="formData.Password" class="form-control"
                    placeholder="Nhập mật khẩu" required />
            </div>
            <button type="submit" class="btn btn-primary">Đăng Nhập</button>
        </form>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
</template>

<script>
import DocGiaService from "@/services/docgia.service";
import NhanVienService from "@/services/nhanvien.service";

export default {
    data() {
        return {
            formData: {
                DienThoai: "", // Lưu trữ số điện thoại nhập vào
                Password: "", // Lưu trữ mật khẩu nhập vào
            },
            docgia: true,
            errorMessage: "", // Hiển thị lỗi nếu đăng nhập không thành công
        };
    },
    methods: {
        async handleLogin() {
            try {
                let user;
                let role;

                if (this.docgia) {
                    // Gọi hàm login cho Độc Giả
                    user = await DocGiaService.login(this.formData.DienThoai, this.formData.Password);
                    role = "docgia";
                } else {
                    // Gọi hàm login cho Nhân Viên
                    user = await NhanVienService.login(this.formData.DienThoai, this.formData.Password);
                    role = "nhanvien";
                }

                // Lưu ID trả về từ API vào localStorage
                localStorage.setItem("userId", user._id);

                // Kiểm tra role để điều hướng
                if (role === "nhanvien") {
                    this.$router.push({ path: "/" }); // Chuyển tới trang chính cho admin
                } else {
                    this.$router.push({ name: "docgia" }); // Chuyển tới trang độc giả
                }
            } catch (error) {
                this.errorMessage = error.message;
            }
        },
        switchToReader() {
            this.docgia = true;
            this.resetForm();
        },
        switchToEmployee() {
            this.docgia = false;
            this.resetForm();
        },
        resetForm() {
            this.formData.DienThoai = "";
            this.formData.Password = "";
            this.errorMessage = "";
        },
    },
};
</script>

<style scoped>
/* Tabs lựa chọn Nhân Viên / Độc Giả */
.login-tabs {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 20px;
    font-size: 18px;
}

.login-tabs span {
    cursor: pointer;
    padding-bottom: 5px;
    position: relative;
}

.login-tabs span.active {
    font-weight: bold;
    color: #007bff;
}

.login-tabs span.active::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background-color: #007bff;
}

/* login form  */
.login-container {
    max-width: 400px;
    margin: 100px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
}

h2 {
    text-align: center;
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 15px;
}

.form-control {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.btn {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.btn:hover {
    background-color: #0056b3;
}

.error-message {
    color: red;
    text-align: center;
    margin-top: 10px;
}
</style>
