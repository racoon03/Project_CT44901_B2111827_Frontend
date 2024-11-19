<template>
    <div class="app-footer">
        <span>Author : Phan Văn Trường</span>
        <span>Emai : truongb2111827@student.ctu.edu.vn</span>
    </div>
</template>

<script>
export default {
    name: "AppFooter",
};
</script>

<style>
.app-footer {
    background-color: #000;
    /* Nền đen */
    color: #fff;
    /* Chữ trắng */
    padding: 15px;
    /* Khoảng cách bên trong */
    text-align: center;
    /* Căn giữa nội dung */
    display: flex;
    /* Sử dụng Flexbox */
    justify-content: center;
    /* Căn giữa theo chiều ngang */
    gap: 20px;
    /* Khoảng cách giữa các phần tử */
}

.app-footer span {
    font-size: 14px;
    /* Kích thước chữ */
    line-height: 1.5;
    /* Dòng cách chữ */
}
</style>
