<template>
    <div class="page-view">
        <div class="page-container">
            <header class="page-header">
                <div class="header-content">
                    <h2>Report Chart</h2>
                    <p>View your report chart and insights.</p>
                </div>
                <button @click="navigateTo('/report/tips')" class="header-btn">View Tips</button>
            </header>
            <div class="main-content">
                <div class="charts-container" v-if="!loading">
                    <CaloriesChartComponent :calories-consumed="caloriesConsumedWeek"
                        :calories-burned="caloriesBurnedWeek" :dates="datesWeek" :chartTitle="'Weekly Calories Chart'"
                        class="chart" />
                    <CaloriesChartComponent :calories-consumed="caloriesConsumedMonth"
                        :calories-burned="caloriesBurnedMonth" :dates="datesMonth"
                        :chartTitle="'Monthly Calories Chart'" class="chart" />
                </div>
                <div class="loading" v-else>Loading...</div>
            </div>
        </div>
    </div>
</template>

<script>
import CaloriesChartComponent from '@/components/CaloriesChartComponent.vue';

export default {
    name: "ReportChartView",
    components: {
        CaloriesChartComponent
    },
    data() {
        return {
            caloriesConsumedWeek: null,
            caloriesBurnedWeek: null,
            datesWeek: null,
            caloriesConsumedMonth: null,
            caloriesBurnedMonth: null,
            datesMonth: null,
            loading: true
        };
    },
    methods: {
        navigateTo(route) {
            this.$router.push(route);
        },
        formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString();
        },
        async fetchCharts() {
            const token = localStorage.getItem('jwtToken');
            let response = await this.$http.get('/api/report/chart/fetch', { headers: { Authorization: `Bearer ${token}` } });
            if (response.data.is_valid) {
                this.caloriesConsumedWeek = response.data.caloriesConsumedWeek;
                this.caloriesBurnedWeek = response.data.caloriesBurnedWeek;
                this.datesWeek = response.data.datesWeek;
                this.caloriesConsumedMonth = response.data.caloriesConsumedMonth;
                this.caloriesBurnedMonth = response.data.caloriesBurnedMonth;
                this.datesMonth = response.data.datesMonth;
                this.loading = false;
            }
        }
    },
    mounted() {
        this.fetchCharts();
    }
}
</script>

<style scoped>
@import url(../assets/page.css);

.charts-container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.chart {
    margin-bottom: 50px;
}

.loading {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    color: #555;
    height: 100%;
    width: 100%;
}
</style>