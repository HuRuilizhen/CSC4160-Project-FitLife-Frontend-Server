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
                <div class="tip-cards">
                    <div v-for="tip in tips" :key="log.id" class="tip-card">
                        <div class="tip-content">
                            <div class="tip-header">
                                <p>{{ tips.activity_type }}</p>
                            </div>
                            <footer class="tip-footer">
                                <small>Logged on {{ formatDate(log.date) }}</small>
                            </footer>
                        </div>
                    </div>
                </div>
                <div v-if="!tips.length" class="no-tips">
                    <p>No tips available. Start by creating your first tip by clicking the button!</p>
                </div>
                <button class="bottom-btn">Create Health Tip</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ReportTipView",
    data() {
        return {
            tips: []
        }
    },
    methods: {
        navigateTo(route) {
            this.$router.push(route);
        },
        formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString();
        },
        async fetchTips() {
            const token = localStorage.getItem('jwtToken');
            let response = await this.$http.get('/api/report/tips/fetch', { headers: { Authorization: `Bearer ${token}` } });
            if (response.data.is_valid) {
                this.tips = response.data.tips;
            }
        },
        async createTip() {
            const token = localStorage.getItem('jwtToken');
            let response = await this.$http.post('/api/tip/create', { headers: { Authorization: `Bearer ${token}` } });
        }
    },
    mounted() {
        this.fetchTips();
    }
}
</script>

<style scoped>
@import url(../assets/page.css);
@import url(../assets/tip-cards.css);
</style>