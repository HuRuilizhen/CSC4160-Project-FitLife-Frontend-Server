<template>
    <div class="sportlog-view">
      <div class="sportlog-container">
        <header class="page-header">
          <div class="header-content">
            <h2>Sport Log</h2>
            <p>Explore and track your sport logs. Stay consistent and achieve your fitness goals!</p>
          </div>
          <button @click="navigateTo('/sportlog/create')" class="create-log-btn">Add New Log</button>
        </header>
        <div class="log-cards">
          <div v-for="log in logs" :key="log.id" class="log-card">
            <div v-if="log.image" class="log-image">
              <img :src="`${$http.defaults.baseURL}${log.image}`" alt="Sport Image" />
            </div>
            <div class="log-content">
              <div class="log-header">
                <h3>{{ log.type }}</h3>
                <p>{{ log.duration }} minutes</p>
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
        let response = await this.$http.get("/api/sportlog/fetch", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.is_valid) {
          this.logs = response.data.logs;
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
  /* 页面整体布局 */
  .sportlog-view {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 98vh;
    background-color: #eeeeee;
    gap: 0;
  }
  
  .sportlog-container {
    width: 90%;
    height: 85%;
    margin: 0 auto;
    margin-top: 60px;
    padding: 20px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  /* 页面标题和描述 */
  .page-header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;
    padding: 20px;
  }
  
  .header-content {
    text-align: left;
  }
  
  .page-header h2 {
    font-size: 2.5em;
    color: #333;
    margin: 0;
    padding: 0;
    font-weight: bold;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .page-header p {
    font-size: 1.2em;
    color: #555;
    margin: 10px 0 0;
    font-style: italic;
  }
  
  /* 添加日志按钮 */
  .create-log-btn {
    padding: 10px 20px;
    font-size: 1em;
    color: white;
    background-color: #4CAF50;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .create-log-btn:hover {
    background-color: #45a049;
  }
  
  /* 日志卡片布局 */
  .log-cards {
    width: 80%;
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