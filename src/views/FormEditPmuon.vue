<template>
    <button class="btn btn-secondary btnback" @click="$router.back()">Trở lại</button>
    <div class="form-container">
        <h2>Chỉnh Sửa Phiếu Mượn</h2>
        <form @submit.prevent="updatePhieuMuon">
            <div class="form-group">
                <label for="maDocGia">Người mượn:</label>
                <select id="maDocGia" v-model="formData.MaDocGia" class="form-control" required>
                    <option v-for="docGia in docGiaList" :key="docGia._id" :value="docGia._id">
                        {{ docGia.HoLot }} {{ docGia.Ten }}
                    </option>
                </select>
            </div>
            <div class="form-group">
                <label for="maSach">Sách:</label>
                <select id="maSach" v-model="formData.MaSach" class="form-control" required>
                    <option v-for="sach in sachList" :key="sach._id" :value="sach._id">
                        {{ sach.TenSach }}
                    </option>
                </select>
            </div>
            <div class="form-group">
                <label for="ngayMuon">Ngày mượn:</label>
                <input type="date" id="ngayMuon" v-model="formData.NgayMuon" class="form-control" required />
            </div>
            <div class="form-group">
                <label for="ngayTra">Ngày trả:</label>
                <input type="date" id="ngayTra" v-model="formData.NgayTra" class="form-control" required />
            </div>
            <button type="submit" class="btn btn-primary btnsubmit">Cập Nhật</button>
        </form>

    </div>
</template>

<script>
import PhieuMuonService from "@/services/phieumuon.service";
import DocGiaService from "@/services/docgia.service";
import SachService from "@/services/sach.service";

export default {
    data() {
        return {
            formData: {
                MaDocGia: "",
                MaSach: "",
                NgayMuon: "",
                NgayTra: "",
            },
            docGiaList: [],
            sachList: [],
        };
    },
    methods: {
        async fetchData() {
            const phieuMuonId = this.$route.params.id;
            const phieuMuon = await PhieuMuonService.get(phieuMuonId);
            this.formData = {
                MaDocGia: phieuMuon.MaDocGia,
                MaSach: phieuMuon.MaSach,
                NgayMuon: this.formatDate(phieuMuon.NgayMuon),
                NgayTra: this.formatDate(phieuMuon.NgayTra),
            };
            this.docGiaList = await DocGiaService.getAll();
            this.sachList = await SachService.getAll();
        },
        formatDate(dateString) {
            const date = new Date(dateString);
            return date.toISOString().split("T")[0]; // Cắt bỏ phần "T" và múi giờ để lấy định dạng yyyy-MM-dd
        },
        async updatePhieuMuon() {
            try {
                await PhieuMuonService.update(this.$route.params.id, this.formData);
                alert("Cập nhật phiếu mượn thành công!");
                this.$router.push({ name: "PhieuMuon" });
            } catch (error) {
                console.error("Lỗi khi cập nhật phiếu mượn:", error.message);
            }
        },
    },
    async mounted() {
        await this.fetchData();
        console.log(this.formData);
    },
};
</script>

<style>
.form-container {
    max-width: 600px;
    margin: 20px auto;
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

.btnsubmit {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
}

.btnback {
    background-color: #6c757d;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 70px;
    width: 100px;
    margin-left: 20px;
}
</style>
