<template>
    <div class="app-container">
        <!-- Nội dung chính -->
        <header>
            <AppHeaderDg v-if="role === 'reader'" />
            <AppHeader v-else-if="role !== 'reader'" />
            <AppHeader v-else-if="route.name !== 'login'" />
        </header>
        <main class="main-content">
            <router-view />
        </main>
        <!-- Footer luôn nằm dưới cùng -->
        <footer>
            <AppFooter />
        </footer>
    </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import { useRoute } from "vue-router";
import AppHeaderDg from "./components/AppHeaderDg.vue";
import AuthService from "@/services/auth.service";


export default {
    components: {
        AppHeader,
        AppHeaderDg,
        AppFooter,
    },
    data() {
        return {
            role: null, // Vai trò người dùng
        };
    },
    setup() {
        const route = useRoute();
        return {
            route,
        };
    },
    methods: {
        async checkUserRole() {
            try {
                const userId = localStorage.getItem("userId");
                if (!userId) throw new Error("Người dùng chưa đăng nhập.");

                // Gọi API kiểm tra vai trò
                const role = await AuthService.checkRole(userId);
                this.role = role;
            } catch (error) {
                console.error("Lỗi khi kiểm tra vai trò:", error.message);
                this.$router.push({ name: "login" });
            }
        },
    },
    async mounted() {
        await this.checkUserRole();
    },
};
</script>

<style>
/* Đặt chiều cao toàn bộ trang */
html,
body,
#app {
    height: 100%;
    margin: 0;
    display: flex;
    flex-direction: column;
}

/* Container chính của ứng dụng */
.app-container {
    display: flex;
    flex-direction: column;
    min-height: 100%;
}

/* Phần nội dung chính (chiếm hết khoảng trống còn lại) */
.main-content {
    flex: 1;
    padding: 20px;
}

/* Footer luôn nằm dưới cùng */
footer {
    background-color: #343a40;
    color: white;
    text-align: center;
    /* padding: 10px; */
}
</style>
