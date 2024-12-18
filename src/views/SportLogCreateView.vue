<template>
    <div class="page-view">
        <div class="page-container">
            <header class="page-header">
                <div class="header-content">
                    <h2>Add New Sport Log</h2>
                    <p>Try our AI-generated sport log feature! Write something about your exercise.</p>
                </div>
                <button @click="navigateTo('/sportlog')" class="header-btn">Back to Sport Log</button>
            </header>
            <form class="main-content" @submit.prevent="submitLog">
                <div class="form-group">
                    <label for="note">Exercise Note:</label>
                    <textarea id="note" v-model="note"
                        placeholder="Write something about your exercise, e.g. 'I ran for 30 minutes today'"
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
    name: "SportLogCreate",
    data() {
        return {
            note: "",
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

            const formData = new FormData();
            formData.append("note", this.note);

            try {
                const token = localStorage.getItem("jwtToken");
                const response = await this.$http.post("/api/activity/create", formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                });

                if (response.data.is_valid) {
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
@import url(../assets/form.css);
</style>