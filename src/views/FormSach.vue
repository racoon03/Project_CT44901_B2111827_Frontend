<!-- FormSach.vue -->
<template>
    <button @click="goBack" class="btn btn-secondary back-button">← Trở về</button>
    <div class="form-sach-container">
        <h2>{{ isEditMode ? "Chỉnh sửa Sách" : "Thêm Sách Mới" }}</h2>

        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="tenSach">Tên Sách</label>
                <input type="text" id="tenSach" v-model="sachData.TenSach" required placeholder="Nhập tên sách" />
            </div>

            <div class="form-group">
                <label for="tacGia">Tác Giả</label>
                <input type="text" id="tacGia" v-model="sachData.TacGia" required placeholder="Nhập tác giả" />
            </div>

            <div class="form-group">
                <label for="namXuatBan">Năm Xuất Bản</label>
                <input type="number" id="namXuatBan" v-model="sachData.NamXuatBan" required min="0"
                    placeholder="Nhập năm xuất bản" />
            </div>

            <div class="form-group">
                <label for="donGia">Đơn Giá (VND)</label>
                <input type="number" id="donGia" v-model="sachData.DonGia" required min="0"
                    placeholder="Nhập đơn giá" />
            </div>

            <div class="form-group">
                <label for="soQuyen">Số Quyển</label>
                <input type="number" id="soQuyen" v-model="sachData.SoQuyen" required min="0"
                    placeholder="Nhập số quyển" />
            </div>

            <div class="form-group">
                <label for="maNxb">Nhà Xuất Bản</label>
                <select id="maNxb" v-model="sachData.MaNXB" required>
                    <option disabled value="">Chọn Nhà Xuất Bản</option>
                    <option v-for="nxb in nxbList" :key="nxb._id" :value="nxb._id">
                        {{ nxb.TenNXB }}
                    </option>
                </select>
            </div>

            <button type="submit" class="submit-button">
                {{ isEditMode ? "Cập Nhật" : "Tạo Mới" }}
            </button>
        </form>
    </div>
</template>

<script>
import SachService from "@/services/sach.service";
import NxbService from "@/services/nxb.service";

export default {
    props: {
        id: {
            type: String,
            required: false,
        },
    },
    data() {
        return {
            sachData: {
                TenSach: "",
                TacGia: "",
                NamXuatBan: "",
                DonGia: "",
                SoQuyen: "",
                MaNXB: "",
            },
            nxbList: [], // Danh sách nhà xuất bản để chọn
            isEditMode: false,
        };
    },
    methods: {
        async fetchNxbList() {
            try {
                this.nxbList = await NxbService.getAll();
            } catch (error) {
                console.error("Lỗi khi lấy danh sách NXB:", error);
                alert("Đã xảy ra lỗi khi lấy danh sách Nhà Xuất Bản.");
            }
        },
        async fetchSachData() {
            try {
                const sach = await SachService.get(this.id);
                this.sachData = {
                    TenSach: sach.TenSach || "",
                    TacGia: sach.TacGia || "",
                    NamXuatBan: sach.NamXuatBan || "",
                    DonGia: sach.DonGia || "",
                    SoQuyen: sach.SoQuyen || "",
                    MaNXB: sach.MaNXB || "",
                };
            } catch (error) {
                console.error("Lỗi khi lấy thông tin sách:", error);
                alert("Đã xảy ra lỗi khi lấy thông tin sách.");
            }
        },
        goBack() {
            this.$router.back(); // Chuyển về trang trước
        },
        async handleSubmit() {
            try {
                if (this.isEditMode) {
                    await SachService.update(this.id, this.sachData);
                    alert("Cập nhật sách thành công!");
                } else {
                    await SachService.create(this.sachData);
                    alert("Tạo sách mới thành công!");
                }
                this.$router.push({ name: "sach" }); // Điều hướng về trang quản lý sách sau khi thành công
            } catch (error) {
                console.error("Lỗi khi lưu dữ liệu sách:", error);
                alert("Đã xảy ra lỗi khi lưu dữ liệu sách. Vui lòng thử lại.");
            }
        },
    },
    async created() {
        await this.fetchNxbList();
        if (this.id) {
            this.isEditMode = true;
            await this.fetchSachData();
        }
    },
};
</script>

<style scoped>
.form-sach-container {
    max-width: 600px;
    margin: 30px auto;
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

input[type="text"],
input[type="number"],
select {
    width: 100%;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
}

.select {
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
