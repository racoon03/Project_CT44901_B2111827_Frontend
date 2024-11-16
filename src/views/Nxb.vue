<template>
    <div class="nxb-container mt-5">
        <h2>Quản lý Nhà Xuất Bản</h2>

        <!-- Nút tạo mới nhà xuất bản -->
        <button @click="createNewNxb" class="create-button">Thêm Nxb Mới</button>

        <div class="cards-wrapper">
            <!-- Hiển thị từng nhà xuất bản dưới dạng card -->
            <CardNxb v-for="nxb in paginatedNxbList" :key="nxb._id" :tenNxb="nxb.TenNXB" :diaChi="nxb.DiaChi"
                @edit="editNxb(nxb)" @delete="deleteNxb(nxb._id)" />
        </div>

        <!-- Phân trang -->
        <Pagination :itemsPerPage="itemsPerPage" :totalItems="nxbList.length" @update-items="updatePaginatedItems" />
    </div>
</template>

<script>
import NxbService from "@/services/nxb.service";
import CardNxb from "@/components/CardNxb.vue";
import Pagination from "@/components/Pagination.vue";

export default {
    components: {
        CardNxb,
        Pagination,
    },
    data() {
        return {
            nxbList: [], // Danh sách nhà xuất bản
            paginatedNxbList: [], // Danh sách nhà xuất bản sau khi phân trang
            itemsPerPage: 6,      // Số lượng nhà xuất bản mỗi trang
        };
    },
    methods: {
        async fetchNxbList() {
            // Gọi NxbService để lấy tất cả nhà xuất bản
            this.nxbList = await NxbService.getAll();
            // Khởi tạo các mục hiển thị cho trang đầu tiên
            this.updatePaginatedItems({ start: 0, end: this.itemsPerPage });
        },
        createNewNxb() {
            // Điều hướng đến FormNxb.vue để tạo mới nhà xuất bản
            this.$router.push({ name: "create-nxb" });
        },
        editNxb(nxb) {
            // Điều hướng đến FormNxb.vue với id của NXB để chỉnh sửa
            this.$router.push({ name: "edit-nxb", params: { id: nxb._id } });
        },
        async deleteNxb(id) {
            // Xác nhận xóa và gọi API để xóa nhà xuất bản
            if (confirm("Bạn có chắc chắn muốn xóa nhà xuất bản này?")) {
                await NxbService.delete(id);
                this.fetchNxbList(); // Cập nhật lại danh sách sau khi xóa
            }
        },
        updatePaginatedItems({ start, end }) {
            this.paginatedNxbList = this.nxbList.slice(start, end);
        },
    },
    async mounted() {
        // Tải dữ liệu nhà xuất bản khi component được mount
        await this.fetchNxbList();
    },
};
</script>

<style scoped>
.nxb-container {
    margin: auto;
    padding: 20px;
}

.create-button {
    margin-bottom: 20px;
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
