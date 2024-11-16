<template>
    <div class="card shadow-sm my-card">
        <div class="card-body">
            <h5 class="card-title">Thông tin Sách</h5>
            <p class="card-text">
                <strong>Tên Sách:</strong> {{ tenSach }}
            </p>
            <p class="card-text">
                <strong>Tác Giả:</strong> {{ tacGia }}
            </p>
            <p class="card-text">
                <strong>Năm Xuất Bản:</strong> {{ namXuatBan }}
            </p>
            <p class="card-text">
                <strong>Giá:</strong> {{ donGia }} VND
            </p>
            <p class="card-text">
                <strong>Nhà Xuất Bản:</strong> {{ tenNxb }}
            </p>
            <p class="card-text">
                <strong>Số Quyển:</strong> {{ soQuyen }}
            </p>
            <!-- Icon edit và delete -->
            <div class="card-actions">
                <i class="icon-edit" @click="$emit('edit')">✏️</i>
                <i class="icon-delete" @click="$emit('delete')">🗑️</i>
            </div>
        </div>
    </div>
</template>

<script>
import NxbService from "@/services/nxb.service";

export default {
    props: {
        tenSach: String,
        tacGia: String,
        namXuatBan: Number,
        donGia: Number,
        maNxb: String,
        soQuyen: Number,
    },
    data() {
        return {
            tenNxb: "Không rõ",
        };
    },
    async mounted() {
        try {
            // Lấy tên nhà xuất bản từ MaNXB
            const nxb = await NxbService.get(this.maNxb);
            if (nxb) {
                this.tenNxb = nxb.TenNXB;
            }
        } catch (error) {
            console.error("Lỗi khi lấy thông tin nhà xuất bản:", error);
        }
    },
};
</script>

<style scoped>
.my-card {
    border-radius: 8px;
    background-color: #f5f5f5;
    color: #333;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin: 0;
    padding: 16px;
    position: relative;
    width: 400px;
}

.card-title {
    color: #1565c0;
}

.card-actions {
    position: absolute;
    top: 10px;
    right: 10px;
}

.icon-edit,
.icon-delete {
    font-size: 18px;
    cursor: pointer;
    margin-right: 8px;
}

.icon-edit {
    color: #ffc107;
}

.icon-delete {
    color: #dc3545;
}
</style>
