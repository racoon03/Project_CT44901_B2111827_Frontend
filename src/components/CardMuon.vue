<template>
    <div class="card shadow-sm my-card">
        <div class="card-body">
            <h5 class="card-title">Thông tin mượn sách</h5>
            <p class="card-text">
                <strong>Tên Người Mượn:</strong> {{ tenNguoiMuon }}
            </p>
            <p class="card-text">
                <strong>Tên Sách:</strong> {{ tenSach }}
            </p>
            <p class="card-text">
                <strong>Ngày Mượn:</strong> {{ ngayMuon }}
            </p>
            <p class="card-text">
                <strong>Ngày Trả:</strong> {{ ngayTra }}
            </p>
            <div class="card-actions">
                <i class="icon-edit" @click="$emit('edit')">✏️</i>
                <i class="icon-delete" @click="$emit('delete')">🗑️</i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        ngayMuon: {
            type: String,
            required: true,
        },
        ngayTra: {
            type: String,
            required: true,
        },
        tenNguoiMuon: {
            type: String,
            required: false,
            default: "Không rõ"
        },
        tenSach: {
            type: String,
            required: false,
            default: "Không rõ"
        },
    },
};
</script>

<style scoped>
.my-card {
    border-radius: 8px;
    background-color: #e3f2fd;
    color: #333;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin: 1rem 0;
    padding: 1rem;
    position: relative;
    width: 400px;
}

.card-title {
    color: #1565c0;
}

.card-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 10px;
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

.icon-edit:hover {
    color: #e0a800;
}

.icon-delete:hover {
    color: #c82333;
}
</style>
