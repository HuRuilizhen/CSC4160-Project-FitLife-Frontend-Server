<template>
    <div class="page-view">
        <div class="page-container">
            <header class="page-header">
                <div class="header-content">
                    <h2>Add New Diet Log</h2>
                    <p>Try our AI-generated sport log feature! Write something about your diet.</p>
                </div>
                <button @click="navigateTo('/dietlog')" class="header-btn">Back to Diet Log</button>
            </header>
            <form class="main-content" @submit.prevent="submitLog">
                <div class="form-group">
                    <label for="note">Diet Note:</label>
                    <textarea id="note" v-model="note"
                        placeholder="Write something about your diet, e.g. 'I ate an egg and some bacon for breakfast'"
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
    name: "DietLogCreate",
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
                const response = await this.$http.post("/api/diet/create", formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                })

                if (response.data.is_valid) {
                    this.$router.push("/dietlog");
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