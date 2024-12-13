<template>
  <div class="sport-log-create-view">
      <div class="sport-log-container">
          <header class="page-header">
              <div class="header-content">
                  <h2>Add New Sport Log</h2>
                  <p>Record your exercise activities and keep track of your progress.</p>
              </div>
              <button @click="navigateTo('/sportlog')" class="back-btn">Back to Sport Log</button>
          </header>
          <form class="main-content" @submit.prevent="submitLog">
              <div class="form-group">
                  <label for="exerciseNote">Exercise Note:</label>
                  <textarea
                      id="exerciseNote"
                      v-model="exerciseNote"
                      placeholder="Write something about your exercise, e.g., 'I ran for 30 minutes today.'"
                      rows="5"
                      required
                  ></textarea>
              </div>
              <p v-if="submitError" class="error-message">{{ submitError }}</p>
              <button type="submit" :disabled="isSubmitting">Add Log</button>
          </form>
      </div>
  </div>
</template>

<script>
export default {
  name: "SportLogCreateView",
  data() {
      return {
          exerciseNote: "", // 用户输入的运动记录
          isSubmitting: false, // 用于控制提交按钮状态
          submitError: null, // 显示错误消息
      };
  },
  methods: {
      navigateTo(route) {
          this.$router.push(route); // 跳转到指定路由
      },
      async submitLog() {
          this.isSubmitting = true; // 禁用提交按钮
          this.submitError = null;

          const payload = {
              note: this.exerciseNote, // 提交的记录内容
          };

          try {
              const token = localStorage.getItem("jwtToken"); // 获取 JWT token
              const response = await this.$http.post("/api/sportlog/create", payload, {
                  headers: {
                      Authorization: `Bearer ${token}`,
                      "Content-Type": "application/json",
                  },
              });

              if (response.data.is_valid && response.data.message === "Sport log created successfully.") {
                  this.$router.push("/sportlog"); // 成功后跳转到 log 页面
              } else {
                  this.submitError = response.data.message; // 显示错误信息
              }
          } catch (error) {
              this.submitError = error.response.data.message; // 显示错误信息
          } finally {
              this.isSubmitting = false; // 恢复提交按钮
          }
      },
  },
};
</script>

<style scoped>
/* 样式部分保持不变 */
.sport-log-create-view {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 98vh;
  background-color: #f7f7f7;
}

.sport-log-container {
  width: 90%;
  max-width: 800px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.page-header h2 {
  font-size: 2.5rem;
  color: #333;
}

.page-header p {
  font-size: 1rem;
  color: #555;
  margin-top: 10px;
}

.back-btn {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.back-btn:hover {
  background-color: #45a049;
}

.main-content {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group label {
  font-weight: bold;
  margin-bottom: 5px;
}

.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  resize: none;
}

button[type="submit"] {
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button[type="submit"]:hover:not(:disabled) {
  background-color: #45a049;
}

button[type="submit"]:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.error-message {
  color: red;
  font-size: 0.9rem;
}
</style>