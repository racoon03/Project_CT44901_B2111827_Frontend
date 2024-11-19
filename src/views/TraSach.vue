<template>
    <div class="return-book-container">
        <h2>Trả Sách</h2>
        <div class="cards-wrapper">
            <CardMuon v-for="phieu in filteredPhieuMuons" :key="phieu._id" :ngayMuon="formatDate(phieu.NgayMuon)"
                :ngayTra="formatDate(phieu.NgayTra)" :tenNguoiMuon="phieu.TenNguoiMuon" :tenSach="phieu.TenSach"
                :class="{ 'card-returned': phieu.isReturned }" @click="markAsReturned(phieu)" />
        </div>
    </div>
</template>

<script>
import PhieuMuonService from "@/services/phieumuon.service";
import DocGiaService from "@/services/docgia.service";
import SachService from "@/services/sach.service";
import CardMuon from "@/components/CardMuon.vue";

export default {
    components: {
        CardMuon,
    },
    data() {
        return {
            phieuMuons: [], // Danh sách phiếu mượn từ API
        };
    },
    computed: {
        // Lọc danh sách phiếu mượn với ngày trả lớn hơn hôm nay
        filteredPhieuMuons() {
            const currentDate = new Date();
            return this.phieuMuons.filter(
                (phieu) => new Date(phieu.NgayTra) > currentDate || phieu.isReturned
            );
        },
    },
    methods: {
        async fetchPhieuMuons() {
            try {
                const returnedBooks = JSON.parse(localStorage.getItem("returnedBooks")) || [];
                const phieuMuons = await PhieuMuonService.getAll();

                for (const phieu of phieuMuons) {
                    const docGia = await DocGiaService.get(phieu.MaDocGia);
                    phieu.TenNguoiMuon = docGia ? `${docGia.HoLot} ${docGia.Ten}` : "Không rõ";

                    const sach = await SachService.get(phieu.MaSach);
                    phieu.TenSach = sach ? sach.TenSach : "Không rõ";

                    // Kiểm tra trạng thái isReturned từ localStorage
                    phieu.isReturned = returnedBooks.includes(phieu._id);

                }

                this.phieuMuons = phieuMuons;
            } catch (error) {
                console.error("Lỗi khi tải danh sách phiếu mượn:", error);
            }
        },
        formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString("vi-VN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            });
        },
        isReturned(phieu) {
            const returnedBooks = JSON.parse(localStorage.getItem("returnedBooks")) || [];
            return returnedBooks.includes(phieu._id); // Kiểm tra nếu ID phiếu mượn đã trả
        },
        async markAsReturned(phieu) {
            if (phieu.isReturned) {
                alert(`Phiếu mượn sách "${phieu.TenSach}" đã được trả.`);
                return;
            }

            if (confirm(`Bạn có chắc chắn đánh dấu sách "${phieu.TenSach}" đã được trả?`)) {
                try {
                    // Tăng số lượng sách trong kho
                    const sach = await SachService.get(phieu.MaSach);
                    await SachService.update(phieu.MaSach, { ...sach, SoQuyen: sach.SoQuyen + 1 });

                    // Đánh dấu phiếu là đã trả
                    phieu.isReturned = true;
                    // Lưu trạng thái vào localStorage
                    const returnedBooks = JSON.parse(localStorage.getItem("returnedBooks")) || [];
                    returnedBooks.push(phieu._id);
                    localStorage.setItem("returnedBooks", JSON.stringify(returnedBooks));

                    alert("Đã đánh dấu sách là đã trả thành công!");
                } catch (error) {
                    console.error("Lỗi khi trả sách:", error);
                    alert("Đã xảy ra lỗi khi trả sách.");
                }
            }
        },
    },
    async mounted() {
        await this.fetchPhieuMuons();
    },
};
</script>

<style scoped>
.return-book-container {
    margin: 60px auto;
    padding: 20px;
}

.cards-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

/* Màu xanh cho sách đã trả */
.card-returned {
    background-color: #abefbb;
    border: 1px solid #c3e6cb;
    transition: transform 0.2s ease;
}

/* Hiệu ứng phóng to khi hover */
.card-returned:hover {
    transform: scale(1.05);
}
</style>
