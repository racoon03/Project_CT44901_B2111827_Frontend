<template>
    <button @click="goBack" class="btn btn-secondary back-button">← Trở về</button>
    <div class="form-nxb-container">
        <h2>{{ isEditMode ? "Chỉnh sửa Nhà Xuất Bản" : "Thêm Nhà Xuất Bản Mới" }}</h2>

        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="tenNxb">Tên Nhà Xuất Bản</label>
                <input type="text" id="tenNXB" v-model="nxbData.TenNXB" required placeholder="Nhập tên Nhà Xuất Bản" />
            </div>

            <div class="form-group">
                <label for="diaChi">Địa chỉ</label>
                <input type="text" id="diaChi" v-model="nxbData.DiaChi" required placeholder="Nhập địa chỉ" />
            </div>

            <button type="submit" class="submit-button">
                {{ isEditMode ? "Cập Nhật" : "Tạo Mới" }}
            </button>
        </form>
    </div>
</template>

<script>
import NxbService from "@/services/nxb.service"; // Đảm bảo rằng NxbService được định nghĩa trong services

export default {
    props: {
        id: {
            type: String,
            required: false,
        },
    },
    data() {
        return {
            nxbData: {
                TenNXB: "",
                DiaChi: "",
            },
            isEditMode: false,
        };
    },
    async created() {
        if (this.id) {
            this.isEditMode = true;
            await this.fetchNxbData();
        }
    },
    methods: {
        async fetchNxbData() {
            try {
                const nxb = await NxbService.get(this.id);
                this.nxbData.TenNXB = nxb.TenNXB;
                this.nxbData.DiaChi = nxb.DiaChi;
            } catch (error) {
                console.error("Lỗi khi tải thông tin NXB:", error);
            }
        },
        async handleSubmit() {
            try {
                if (this.isEditMode) {
                    await NxbService.update(this.id, this.nxbData);
                    alert("Cập nhật thành công!");
                } else {
                    await NxbService.create(this.nxbData);
                    alert("Tạo mới thành công!");
                }
                this.$router.push("/nxb"); // Điều hướng về trang danh sách NXB sau khi thành công
            } catch (error) {
                console.error("Lỗi khi lưu dữ liệu:", error);
                alert("Đã xảy ra lỗi khi lưu dữ liệu. Vui lòng thử lại.");
            }
        },
    },
};
</script>

<style scoped>
.form-nxb-container {
    max-width: 600px;
    margin: auto;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
}

h2 {
    text-align: center;
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

input[type="text"] {
    width: 100%;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
}

.submit-button {
    width: 100%;
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    margin-top: 10px;
}

.submit-button:hover {
    background-color: #45a049;
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
