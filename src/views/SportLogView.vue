<template>
    <div class="page-view">
        <div class="page-container">
            <header class="page-header">
                <div class="header-content">
                    <h2>Sport Log</h2>
                    <p>Explore and track your sport logs. Stay consistent and achieve your fitness goals!</p>
                </div>
                <button @click="navigateTo('/sportlog/create')" class="header-btn">Add New Log</button>
            </header>
            <div class="main-content">
                <div class="log-cards">
                    <div v-for="log in logs" :key="log.id" class="log-card">
                        <div class="log-content">
                            <div class="log-header">
                                <h3>{{ log.activity_type }}</h3>
                                <p>{{ log.duration }} minutes burned {{ log.calories_burned }} kcal</p>
                            </div>
                            <footer class="log-footer">
                                <small>Logged on {{ formatDate(log.date) }}</small>
                            </footer>
                        </div>
                    </div>
                </div>
                <div v-if="!logs.length" class="no-logs">
                    <p>No sport logs available. Start by adding your first log!</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "SportLog",
    data() {
        return {
            logs: [],
        };
    },
    mounted() {
        this.fetchLogs();
    },
    methods: {
        navigateTo(route) {
            this.$router.push(route);
        },
        async fetchLogs() {
            const token = localStorage.getItem("jwtToken");
            let response = await this.$http.get("/api/activity/fetch", {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.data.is_valid) {
                this.logs = response.data.records;
            }
        },
        formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString();
        },
    },
};
</script>

<style scoped>
@import url(../assets/page.css);

.log-cards {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.log-card {
    display: flex;
    border-radius: 8px;
    background: white;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.3s;
}

.log-card:hover {
    transform: scale(1.02);
}

.log-image img {
    width: 100%;
    height: auto;
}

.log-content {
    padding: 10px;
}

.log-header h3 {
    font-size: 1.5em;
    color: #333;
    margin: 0;
}

.log-header p {
    font-size: 1em;
    color: #555;
    margin: 5px 0 0;
}

.log-footer {
    margin-top: 10px;
    font-size: 0.9em;
    color: #888;
}

/* 无日志时的提示 */
.no-logs {
    text-align: center;
}

.no-logs p {
    font-size: 1.2em;
    color: #555;
    font-style: italic;
}
</style>