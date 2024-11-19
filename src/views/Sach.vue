<template>
    <div class="sach-container mt-5">
        <h2 v-if="role === 'employee'">Quản Lý Sách</h2>
        <h2 v-if="role === 'reader'">Thông Tin Sách</h2>

        <!-- Nút tạo mới sách (chỉ hiển thị nếu vai trò là nhân viên) -->
        <button v-if="role === 'employee'" @click="createNewSach" class="create-button">Thêm Sách Mới</button>

        <div class="cards-wrapper">
            <!-- Truyền role vào mỗi CardSach -->
            <CardSach v-for="sach in paginatedSachList" :key="sach._id" :tenSach="sach.TenSach" :tacGia="sach.TacGia"
                :namXuatBan="sach.NamXuatBan" :donGia="sach.DonGia" :maNxb="sach.MaNXB" :soQuyen="sach.SoQuyen"
                :role="role" @edit="editSach(sach)" @delete="deleteSach(sach._id)" />
        </div>
        <!-- Phân trang -->
        <Pagination :itemsPerPage="itemsPerPage" :totalItems="sachList.length" @update-items="updatePaginatedItems" />
    </div>
</template>

<script>
import CardSach from "@/components/CardSach.vue";
import SachService from "@/services/sach.service";
import Pagination from "@/components/Pagination.vue";
import AuthService from "@/services/auth.service";



export default {
    components: {
        CardSach,
        Pagination,

    },
    data() {
        return {
            sachList: [], // Danh sách sách từ cơ sở dữ liệu
            paginatedSachList: [], // Danh sách sách sau khi phân trang
            itemsPerPage: 6,       // Số lượng sách mỗi trang
            role: null, // Vai trò của người dùng
        };
    },
    methods: {
        async fetchSachList() {
            // Lấy danh sách sách từ service
            this.sachList = await SachService.getAll();
            // Khởi tạo các mục hiển thị cho trang đầu tiên
            this.updatePaginatedItems({ start: 0, end: this.itemsPerPage });
        },
        async checkUserRole() {
            try {
                const userId = localStorage.getItem("userId");
                if (!userId) throw new Error("Người dùng chưa đăng nhập.");

                // Gọi API kiểm tra vai trò
                const role = await AuthService.checkRole(userId);
                this.role = role;
            } catch (error) {
                console.error("Lỗi khi kiểm tra vai trò:", error.message);
                this.$router.push({ name: "login" });
            }
        },
        createNewSach() {
            // Điều hướng đến FormSach.vue để tạo mới sách
            this.$router.push({ name: "create-sach" });
        },
        editSach(sach) {
            // Điều hướng đến FormSach.vue với id của sách để chỉnh sửa
            this.$router.push({ name: "edit-sach", params: { id: sach._id } });
        },
        async deleteSach(id) {
            // Xác nhận xóa và gọi API để xóa sách
            if (confirm("Bạn có chắc chắn muốn xóa sách này?")) {
                await SachService.delete(id);
                this.fetchSachList(); // Cập nhật lại danh sách sau khi xóa
            }
        },
        updatePaginatedItems({ start, end }) {
            this.paginatedSachList = this.sachList.slice(start, end);
        },
    },
    async mounted() {
        // Tải dữ liệu sách khi component được mount
        await this.fetchSachList();
        await this.checkUserRole();

    },
};
</script>

<style scoped>
.sach-container {
    margin: auto;
    padding: 20px;
}

.create-button {
    margin-bottom: 20px;
    margin-left: 30px;
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
}

.cards-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}
</style>
