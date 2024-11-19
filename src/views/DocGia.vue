<template>
    <div class="docgia-container mt-5">
        <h2 class="title">Phiếu Mượn</h2>

        <!-- Nút thông tin cá nhân và mượn sách -->
        <div class="button-group">
            <button @click="viewPersonalInfo" class="btn btn-info info">Thông Tin Cá Nhân</button>
            <button @click="borrowBook" class="btn btn-success borrow">Mượn Sách</button>
        </div>

        <!-- Hiển thị danh sách phiếu mượn dưới dạng card -->
        <div class="cards-wrapper">
            <CardMuon v-for="phieu in paginatedPhieuMuons" :key="phieu._id" :ngayMuon="phieu.NgayMuon"
                :ngayTra="phieu.NgayTra" :tenNguoiMuon="tenDocGia" :tenSach="phieu.TenSach" />
        </div>

        <!-- Phân trang -->
        <Pagination :itemsPerPage="itemsPerPage" :total-items="phieuMuons.length"
            @update-items="updatePaginatedItems" />

    </div>
</template>

<script>
import CardMuon from "@/components/CardMuon.vue";
import Pagination from "@/components/Pagination.vue";
import DocGiaService from "@/services/docgia.service";
import PhieuMuonService from "@/services/phieumuon.service";
import SachService from "@/services/sach.service";

export default {
    components: {
        CardMuon,
        Pagination,
    },
    data() {
        return {
            id: null, // ID độc giả
            phieuMuons: [], // Danh sách phiếu mượn của độc giả
            tenDocGia: "Không rõ", // Tên độc giả
            itemsPerPage: 6, // Số CardMuon hiển thị trên mỗi trang
            paginatedPhieuMuons: [], // Danh sách phiếu mượn sau khi phân trang
        };
    },

    methods: {
        async fetchPhieuMuons() {
            try {
                const phieuMuons = await PhieuMuonService.findByDocGiaId(this.id);

                for (const phieu of phieuMuons) {
                    const sach = await SachService.get(phieu.MaSach);
                    phieu.TenSach = sach ? sach.TenSach : "Không rõ";
                }

                this.phieuMuons = phieuMuons;
                this.updatePaginatedItems({ start: 0, end: this.itemsPerPage });
            } catch (error) {
                console.error("Lỗi khi tải danh sách phiếu mượn:", error.message);
            }
        },
        async fetchDocGiaInfo() {
            try {
                const docGia = await DocGiaService.get(this.id);
                this.tenDocGia = `${docGia?.HoLot || ""} ${docGia?.Ten || ""}`.trim() || "Không rõ";
            } catch (error) {
                console.error("Lỗi khi tải thông tin độc giả:", error.message);
            }
        },
        updatePaginatedItems({ start, end }) {
            this.paginatedPhieuMuons = this.phieuMuons.slice(start, end);
        },
        viewPersonalInfo() {
            // Điều hướng sang trang chỉnh sửa độc giả
            this.$router.push({ name: "edit-docgia", params: { id: this.id } });
        },
        borrowBook() {
            this.$router.push({ name: "muon-docgia", params: { id: this.id } });
        },
    },
    async mounted() {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            alert("Vui lòng đăng nhập trước.");
            this.$router.push({ name: "login" });
            return;
        }

        this.id = userId;

        await this.fetchDocGiaInfo();
        await this.fetchPhieuMuons();
    },
};
</script>

<style>
.cards-wrapper {
    display: flex;
    /* Sử dụng Flexbox */
    flex-wrap: wrap;
    /* Các card xuống dòng nếu vượt quá chiều rộng */
    gap: 20px;
    /* Khoảng cách giữa các card */
    justify-content: space-around;
    /* Căn đều card trên dòng */
}

.info {
    margin-left: 5px;
    margin-right: 5px;
}

.borrow {
    margin-left: 5px;
    margin-right: 5px;
}

.title {
    text-align: center;
}
</style>
