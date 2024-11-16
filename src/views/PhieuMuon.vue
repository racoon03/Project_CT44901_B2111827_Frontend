<template>
    <div class="phieu-muon-container mt-5">
        <h2>Quản lý mượn sách</h2>

        <!-- Khung tìm kiếm -->
        <div class="search-bar">
            <input type="text" v-model="searchQuery" @input="searchPhieuMuon" placeholder="Tìm kiếm người mượn..." />
            <i class="icon-search">🔍</i>
        </div>

        <!-- Button tạo phiếu mượn mới -->
        <button @click="createPhieuMuon" class="create-button">Tạo phiếu mượn mới</button>

        <!-- Hiển thị danh sách phiếu mượn dưới dạng card -->
        <div class="cards-wrapper">
            <CardMuon v-for="phieu in paginatedPhieuMuons" :key="phieu._id" :ngayMuon="phieu.NgayMuon"
                :ngayTra="phieu.NgayTra" :tenNguoiMuon="phieu.TenNguoiMuon" :tenSach="phieu.TenSach" />
        </div>

        <!-- Phân trang -->
        <Pagination :itemsPerPage="itemsPerPage" :totalItems="filteredPhieuMuons.length"
            @update-items="updatePaginatedItems" />
    </div>
</template>

<script>
import PhieuMuonService from "@/services/phieumuon.service";
import DocGiaService from "@/services/docgia.service";
import SachService from "@/services/sach.service";
import CardMuon from "@/components/CardMuon.vue";
import Pagination from "@/components/Pagination.vue";

export default {
    components: {
        CardMuon,
        Pagination,
    },
    data() {
        return {
            searchQuery: "",
            phieuMuons: [], // Danh sách tất cả phiếu mượn từ cơ sở dữ liệu
            itemsPerPage: 6,
            paginatedPhieuMuons: [], // Dữ liệu phân trang
        };
    },
    computed: {
        filteredPhieuMuons() {
            // Lọc danh sách dựa trên tên người mượn
            return this.phieuMuons.filter((phieu) =>
                phieu.TenNguoiMuon && phieu.TenNguoiMuon.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        },
    },
    methods: {
        async fetchPhieuMuons() {
            // Lấy dữ liệu phiếu mượn từ service
            const phieuMuons = await PhieuMuonService.getAll();

            // Duyệt qua từng phiếu mượn và lấy thông tin độc giả từ MaDocGia
            for (const phieu of phieuMuons) {
                const docGia = await DocGiaService.get(phieu.MaDocGia);
                phieu.TenNguoiMuon = docGia ? `${docGia.HoLot} ${docGia.Ten}` : "Không rõ";

                // Lấy thông tin tên sách từ MaSach
                const sach = await SachService.get(phieu.MaSach);
                phieu.TenSach = sach ? sach.TenSach : "Không rõ";
            }

            // Gán danh sách phiếu mượn đã cập nhật vào data
            this.phieuMuons = phieuMuons;
        },
        createPhieuMuon() {
            // Điều hướng đến trang tạo phiếu mượn mới hoặc thực hiện logic tạo mới
            this.$router.push({ name: "CreatePhieuMuon" });
        },
        updatePaginatedItems({ start, end }) {
            this.paginatedPhieuMuons = this.filteredPhieuMuons.slice(start, end);
        },
    },
    async mounted() {
        await this.fetchPhieuMuons();
        this.updatePaginatedItems({ start: 0, end: this.itemsPerPage });
    },
};
</script>

<style scoped>
.phieu-muon-container {
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

.search-bar {
    margin: 10px 0 20px;
}

.cards-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}
</style>
