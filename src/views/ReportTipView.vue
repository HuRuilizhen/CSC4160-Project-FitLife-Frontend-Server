<template>
    <div class="page-view">
        <div class="page-container">
            <header class="page-header">
                <div class="header-content">
                    <h2>Report Tips</h2>
                    <p>Try our AI-generated report tips!</p>
                </div>
                <button @click="navigateTo('/report')" class="header-btn">View Chart</button>
            </header>
            <div class="main-content">
                <div class="chart-container">
                    <canvas id="myChart"></canvas>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ReportTipView",
    methods: {
        navigateTo(route) {
            this.$router.push(route);
        },
        formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString();
        },
    },
}
</script>

<style scoped>
@import url(../assets/page.css);
</style>