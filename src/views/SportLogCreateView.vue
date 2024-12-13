<template>
    <div class="page-view">
        <div class="page-container">
            <header class="page-header">
                <div class="header-content">
                    <h2>Add New Sport Log</h2>
                    <p>Record your exercise activities and keep track of your progress.</p>
                </div>
                <button @click="navigateTo('/sportlog')" class="header-btn">Back to Sport Log</button>
            </header>
            <form class="main-content" @submit.prevent="submitLog">
                <div class="form-group">
                    <label for="exerciseNote">Exercise Note:</label>
                    <textarea id="exerciseNote" v-model="exerciseNote"
                        placeholder="Write something about your exercise, e.g., 'I ran for 30 minutes today.'" rows="5"
                        required></textarea>
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
            exerciseNote: "",
            isSubmitting: false,
            submitError: null,
        };
    },
    methods: {
        navigateTo(route) {
            this.$router.push(route);
        },
        async submitLog() {
            this.isSubmitting = true;
            this.submitError = null;

            const payload = {
                note: this.exerciseNote,
            };

            try {
                const token = localStorage.getItem("jwtToken");
                const response = await this.$http.post("/api/sportlog/create", payload, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (response.data.is_valid && response.data.message === "Sport log created successfully.") {
                    this.$router.push("/sportlog");
                } else {
                    this.submitError = response.data.message;
                }
            } catch (error) {
                this.submitError = error.response.data.message;
            } finally {
                this.isSubmitting = false;
            }
        },
    },
};
</script>

<style scoped>
@import url(../assets/page.css);

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