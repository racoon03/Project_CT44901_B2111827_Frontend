<template>
    <div class="card shadow-sm my-card">
        <div class="card-body">
            <h5 class="card-title">Thông tin Nhà Xuất Bản</h5>
            <p class="card-text">
                <strong>Tên NXB:</strong> {{ tenNxb }}
            </p>
            <p class="card-text">
                <strong>Địa chỉ:</strong> {{ diaChi }}
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
export default {
    props: {
        tenNxb: {
            type: String,
            required: false,
            default: "Không rõ"
        },
        diaChi: {
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
    background-color: #092336;
    color: #fefbfb;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin: 1rem 0;
    padding: 16px;
    position: relative;
    width: 460px;
}

.card-title {
    color: #fbfcfd;
    font-weight: bold;
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
