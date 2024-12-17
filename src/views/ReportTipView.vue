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
                    <div v-for="tip in tips" :key="tips.id" class="tip-card">
                        <div class="tip-content">
                            <div class="tip-header">
                                <p v-html="parsedMarkdownText(tip.health_advice)"></p>
                            </div>
                            <footer class="tip-footer">
                                <small>Logged on {{ formatDate(tip.date) }}</small>
                            </footer>
                        </div>
                    </div>
                </div>
                <div v-if="!tips.length" class="no-tips">
                    <p>No tips available. Start by creating your first tip by clicking the button!</p>
                </div>
                <button @click="createTip" class="bottom-btn">Create Health Tip</button>
            </div>
        </div>
    </div>
</template>

<script>
import { marked } from 'marked';

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
        parsedMarkdownText(markdownText) {
            return markdownText ? marked.parse(markdownText) : '';
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
            console.log(this.tips);
        },
        async createTip() {
            const token = localStorage.getItem('jwtToken');
            let response = await this.$http.get('/api/report/tip/create', { headers: { Authorization: `Bearer ${token}` } });
            if (response.data.is_valid) {
                this.tips.push(response.data.tip);
            }
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