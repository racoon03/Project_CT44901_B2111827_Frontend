<template>
    <button @click="goBack" class="btn btn-secondary back-button">← Trở về</button>
    <div class="form-container">
        <h2>Tạo Phiếu Mượn Mới</h2>
        <form @submit.prevent="createPhieuMuon">
            <!-- Trường Mã Sách -->
            <div class="form-group">
                <label for="maSach">Chọn Sách:</label>
                <select id="maSach" v-model="formData.MaSach" class="form-control" required>
                    <option v-for="sach in sachList" :key="sach._id" :value="sach._id">
                        {{ sach.TenSach }}
                    </option>
                </select>
            </div>

            <!-- Trường Ngày Mượn -->
            <div class="form-group">
                <label for="ngayMuon">Ngày Mượn:</label>
                <input type="date" id="ngayMuon" v-model="formData.NgayMuon" class="form-control" readonly />
            </div>

            <!-- Trường Số Ngày Mượn -->
            <div class="form-group">
                <label for="soNgayMuon">Số Ngày Mượn:</label>
                <select id="soNgayMuon" v-model="soNgayMuon" class="form-control" required>
                    <option value="3">3 ngày</option>
                    <option value="5">5 ngày</option>
                    <option value="10">10 ngày</option>
                </select>
            </div>

            <!-- Trường Ngày Trả (Tự động tính) -->
            <div class="form-group">
                <label for="ngayTra">Ngày Trả (Tự động tính):</label>
                <input type="date" id="ngayTra" v-model="formData.NgayTra" class="form-control" readonly />
            </div>

            <button type="submit" class="btn btn-primary">Tạo Phiếu Mượn</button>
        </form>
        <p v-if="message" class="success-message">{{ message }}</p>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
</template>

<script>
import PhieuMuonService from "@/services/phieumuon.service";
import SachService from "@/services/sach.service";

export default {
    data() {
        return {
            formData: {
                MaDocGia: "", // Lấy từ localStorage
                MaSach: "", // Mã sách
                NgayMuon: "", // Ngày mượn
                NgayTra: "", // Ngày trả (tự động tính)
            },
            soNgayMuon: 3, // Số ngày mượn (mặc định là 3 ngày)
            sachList: [], // Danh sách sách để chọn
            message: "", // Thông báo thành công
            errorMessage: "", // Thông báo lỗi
        };
    },
    watch: {
        // Theo dõi thay đổi của Ngày Mượn hoặc Số Ngày Mượn để tính Ngày Trả
        soNgayMuon(newVal, oldVal) {
            this.calculateNgayTra();
        },
        "formData.NgayMuon": function () {
            this.calculateNgayTra();
        },
    },
    methods: {
        goBack() {
            this.$router.back(); // Chuyển về trang trước
        },
        async fetchSachList() {
            try {
                this.sachList = await SachService.getAll();
            } catch (error) {
                this.errorMessage = "Không thể tải danh sách sách.";
            }
        },
        calculateNgayTra() {
            if (this.formData.NgayMuon) {
                const ngayMuonDate = new Date(this.formData.NgayMuon);
                ngayMuonDate.setDate(ngayMuonDate.getDate() + parseInt(this.soNgayMuon));
                this.formData.NgayTra = ngayMuonDate.toISOString().split("T")[0]; // Chuyển sang định dạng yyyy-MM-dd
            }
        },
        async createPhieuMuon() {
            try {
                // Lấy ID độc giả từ localStorage
                this.formData.MaDocGia = localStorage.getItem("userId");

                // Gọi API để tạo phiếu mượn mới
                const response = await PhieuMuonService.create(this.formData);
                this.message = "Phiếu mượn đã được tạo thành công!";
                this.errorMessage = "";

                // Reset form sau khi tạo thành công
                this.formData.MaSach = "";
                this.formData.NgayMuon = "";
                this.formData.NgayTra = "";
                this.soNgayMuon = 3;
            } catch (error) {
                this.message = "";
                this.errorMessage =
                    error.response?.data?.message || "Đã xảy ra lỗi khi tạo phiếu mượn.";
            }
        },
    },
    async mounted() {
        // Gán ngày hôm nay cho Ngày Mượn
        const today = new Date();
        this.formData.NgayMuon = today.toISOString().split("T")[0];
        await this.fetchSachList();
    },
};
</script>

<style scoped>
.form-container {
    max-width: 600px;
    margin: 60px auto;
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
