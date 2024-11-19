<template>
    <button @click="goBack" class="btn btn-secondary back-button">← Trở về</button>
    <div class="edit-dg-container">
        <h2>Chỉnh Sửa Thông Tin Độc Giả</h2>

        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="hoLot">Họ Lót:</label>
                <input type="text" id="hoLot" v-model="formData.HoLot" class="form-control" placeholder="Nhập họ lót"
                    required />
            </div>
            <div class="form-group">
                <label for="ten">Tên:</label>
                <input type="text" id="ten" v-model="formData.Ten" class="form-control" placeholder="Nhập tên"
                    required />
            </div>
            <div class="form-group">
                <label for="ngaySinh">Ngày Sinh:</label>
                <input type="date" id="ngaySinh" v-model="formData.NgaySinh" class="form-control" required />
            </div>
            <div class="form-group">
                <label for="phai">Giới Tính:</label>
                <select id="phai" v-model="formData.Phai" class="form-control" required>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                </select>
            </div>
            <div class="form-group">
                <label for="diaChi">Địa Chỉ:</label>
                <input type="text" id="diaChi" v-model="formData.DiaChi" class="form-control" placeholder="Nhập địa chỉ"
                    required />
            </div>
            <div class="form-group">
                <label for="dienThoai">Số Điện Thoại:</label>
                <input type="text" id="dienThoai" v-model="formData.DienThoai" class="form-control"
                    placeholder="Nhập số điện thoại" required />
            </div>
            <button type="submit" class="btn btn-primary">Cập Nhật</button>
        </form>

        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
    </div>
</template>

<script>
import DocGiaService from "@/services/docgia.service";

export default {
    props: {
        id: {
            type: String,
            required: true, // Nhận `id` độc giả cần chỉnh sửa qua props
        },
    },
    data() {
        return {
            formData: {
                HoLot: "",
                Ten: "",
                NgaySinh: "",
                Phai: "",
                DiaChi: "",
                DienThoai: "",
            },
            errorMessage: "",
            successMessage: "",
        };
    },
    methods: {
        goBack() {
            this.$router.back(); // Chuyển về trang trước
        },
        // Lấy thông tin độc giả từ API và gán vào form
        async fetchDocGia() {
            try {
                const docGia = await DocGiaService.get(this.id);
                this.formData = {
                    HoLot: docGia.HoLot || "",
                    Ten: docGia.Ten || "",
                    NgaySinh: docGia.NgaySinh || "",
                    Phai: docGia.Phai || "Nam",
                    DiaChi: docGia.DiaChi || "",
                    DienThoai: docGia.DienThoai || "",
                };
            } catch (error) {
                this.errorMessage =
                    error.response?.data?.message || "Lỗi khi tải thông tin độc giả.";
            }
        },
        // Gửi thông tin cập nhật về API
        async handleSubmit() {
            try {
                await DocGiaService.update(this.id, this.formData);
                this.successMessage = "Cập nhật thông tin thành công!";
                this.errorMessage = "";

                // Chuyển hướng về trang danh sách hoặc trang khác
                this.$router.push({ name: "docgia" });
            } catch (error) {
                this.errorMessage =
                    error.response?.data?.message || "Cập nhật thất bại.";
                this.successMessage = "";
            }
        },
    },
    async mounted() {
        await this.fetchDocGia(); // Lấy thông tin độc giả khi trang được tải
    },
};
</script>

<style scoped>
.edit-dg-container {
    max-width: 600px;
    margin: 30px auto;
    padding: 30px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
}

h2 {
    text-align: center;
    margin-bottom: 20px;
}

.form-group {
    margin-top: 10px;
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

.success-message {
    color: green;
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
