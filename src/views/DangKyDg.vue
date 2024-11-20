<template>
    <button @click="goBack" class="btn btn-secondary back-button">← Trở về</button>
    <div class="register-container">
        <h2>Đăng Ký Độc Giả</h2>
        <form @submit.prevent="registerDocGia">
            <!-- Họ Lót -->
            <div class="form-group">
                <label for="hoLot">Họ Lót:</label>
                <input type="text" id="hoLot" v-model="formData.HoLot" class="form-control" placeholder="Nhập họ lót"
                    required />
            </div>

            <!-- Tên -->
            <div class="form-group">
                <label for="ten">Tên:</label>
                <input type="text" id="ten" v-model="formData.Ten" class="form-control" placeholder="Nhập tên"
                    required />
            </div>

            <!-- Số điện thoại -->
            <div class="form-group">
                <label for="dienThoai">Số Điện Thoại:</label>
                <input type="text" id="dienThoai" v-model="formData.DienThoai" class="form-control"
                    placeholder="Nhập số điện thoại" required />
            </div>

            <!-- Mật khẩu -->
            <div class="form-group">
                <label for="password">Mật khẩu:</label>
                <input type="password" id="password" v-model="formData.Password" class="form-control"
                    placeholder="Nhập mật khẩu" required />
            </div>

            <button type="submit" class="btn btn-primary">Đăng Ký</button>
        </form>
        <p v-if="message" class="success-message">{{ message }}</p>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
</template>

<script>
import DocGiaService from "@/services/docgia.service";

export default {
    data() {
        return {
            formData: {
                HoLot: "",
                Ten: "",
                DienThoai: "",
                Password: "",
            },
            message: "",
            errorMessage: "",
        };
    },
    methods: {
        async registerDocGia() {
            try {
                // Gọi API tạo mới độc giả
                await DocGiaService.create(this.formData);
                this.message = "Đăng ký thành công!";
                this.errorMessage = "";

                // Reset form sau khi thành công
                this.formData.HoLot = "";
                this.formData.Ten = "";
                this.formData.DienThoai = "";
                this.formData.Password = "";
            } catch (error) {
                this.message = "";
                this.errorMessage = error.response?.data?.message || "Đăng ký thất bại!";
            }
        },
        goBack() {
            this.$router.back(); // Chuyển về trang trước
        },
    },

};
</script>

<style scoped>
.register-container {
    max-width: 400px;
    margin: 30px auto;
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

.success-message {
    color: green;
    text-align: center;
    margin-top: 10px;
}

.error-message {
    color: red;
    text-align: center;
    margin-top: 10px;
}

.back-button {
    background-color: #6c757d;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 70px;
    width: 100px;
    margin-left: 20px;
}

.back-button:hover {
    background-color: #5a6268;
}
</style>
