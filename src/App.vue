<script>
import AppHeader from "@/components/AppHeader.vue";
export default {
    components: {
        AppHeader,
    },
};
</script>
<template>
    <AppHeader />
    <!-- <div class="container mt-5"> -->
    <router-view />
    <!-- </div> -->
</template>
<style>
.page {
    margin: 0px;
    width: 90%;
}

.container {
    width: 100%;
    padding-left: 0;
    /* Giảm padding */
    padding-right: 0;
    /* Giảm padding */
}

@media (min-width: 1200px) {
    .container {
        max-width: none;
        /* Bỏ giới hạn max-width */
    }
}
</style>