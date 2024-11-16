<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark fixed-top">
        <router-link to="/" class="navbar-brand">Borrow Book</router-link>
        <router-link to="/nxb" class="navbar-brand">NXB</router-link>
        <router-link to="/sach" class="navbar-brand">Sach</router-link>
    </nav>
</template>

<script>
export default {
    name: "AppHeader",
};
</script>

<style scoped>
.navbar {
    padding: 0.5rem 1rem;
}
</style>
