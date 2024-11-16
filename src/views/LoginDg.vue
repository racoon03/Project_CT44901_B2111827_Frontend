<template>
    <div class="login-container mt-5">
        <h2>Đăng Nhập Độc Giả</h2>
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
export default {
    data() {
        return {
            formData: {
                DienThoai: "", // Lưu trữ số điện thoại nhập vào
                Password: "", // Lưu trữ mật khẩu nhập vào
            },
            errorMessage: "", // Hiển thị lỗi nếu đăng nhập không thành công
        };
    },
    methods: {
        async handleLogin() {
            try {
                const response = await fetch("http://localhost:3000/api/docgia/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(this.formData),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || "Đăng nhập thất bại");
                }

                const user = await response.json();

                // Lưu ID của độc giả vào local storage
                localStorage.setItem("docgiaId", user._id);

                this.$router.push({ name: "docgia" });

            } catch (error) {
                this.errorMessage = error.message;
            }
        },
    },
};
</script>

<style scoped>
.login-container {
    max-width: 400px;
    margin: 50px auto;
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
