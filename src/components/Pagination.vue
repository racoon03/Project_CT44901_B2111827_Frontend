<template>
    <div class="pagination">
        <button :disabled="currentPage === 1" @click="previousPage">Trước</button>
        <span>Trang {{ currentPage }} / {{ totalPages }}</span>
        <button :disabled="currentPage === totalPages" @click="nextPage">Tiếp</button>
    </div>
</template>

<script>
export default {
    props: {
        itemsPerPage: {
            type: Number,
            required: true,
        },
        totalItems: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            currentPage: 1,
        };
    },
    computed: {
        totalPages() {
            return Math.ceil(this.totalItems / this.itemsPerPage);
        },
    },
    watch: {
        currentPage() {
            this.emitPaginatedItems();
        },
    },
    methods: {
        emitPaginatedItems() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            this.$emit("update-items", { start, end });
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        previousPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
    },
    mounted() {
        this.emitPaginatedItems();
    },
};
</script>

<style scoped>
.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
}

button {
    padding: 8px 12px;
    font-size: 14px;
}
</style>
