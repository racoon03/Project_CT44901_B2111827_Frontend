<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark fixed-top">
        <router-link to="/" class="navbar-brand">Nhân viên</router-link>
        <router-link to="/nxb" class="navbar-brand">NXB</router-link>
        <router-link to="/sach" class="navbar-brand">Sach</router-link>
        <router-link to="/trasach" class="navbar-brand">Trả Sách</router-link>

        <!-- Nút Đăng Xuất -->
        <button class="btn btn-danger ml-auto" @click="handleLogout">Đăng Xuất</button>
    </nav>
</template>

<script>
export default {
    name: "AppHeader",
    methods: {
        handleLogout() {
            // Xóa toàn bộ dữ liệu trong localStorage
            localStorage.clear();

            // Chuyển hướng đến trang đăng nhập
            this.$router.push({ name: "login" });
        },
    },
};
</script>

<style scoped>
.navbar {
    padding: 0.5rem 1rem;
}

.btn-danger {
    margin-left: auto;
    /* Đẩy nút Đăng Xuất sang bên phải */
}
</style>
