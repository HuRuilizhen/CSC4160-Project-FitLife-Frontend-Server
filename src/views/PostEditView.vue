<template>
    <div class="page-view">
        <div class="page-container">
            <header class="page-header">
                <div class="header-content">
                    <h2>Edit Community Post </h2>
                    <p>Something wrong? Edit it.</p>
                </div>
                <button @click="$router.go(-1)" class="header-btn">Last Page</button>
            </header>
            <form class="main-content" @submit.prevent="submitForm">
                <div class="form-group title-group">
                    <label for="title">Title:</label>
                    <div class="input-with-button">
                        <input id="title" v-model="title" required />
                    </div>
                </div>
                <div class="form-group">
                    <label for="summary">Summary:</label>
                    <input id="summary" v-model="summary" required></input>
                </div>
                <div class="form-group">
                    <label for="content">Content:</label>
                    <textarea id="content" v-model="content" required></textarea>
                </div>
                <p v-if="submitError" class="error-message">{{ submitError }}</p>
                <button type="submit" :disabled="isSubmitting">Edit</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PostEdit',
    data() {
        return {
            id: this.$route.query.id,
            title: '',
            summary: '',
            content: '',
            submitError: null,
            isSubmitting: false,
        };
    },
    methods: {
        async fetchPost() {
            console.log("Fetching post...");
            const token = localStorage.getItem('jwtToken');
            try {
                let response = await this.$http.get(`/api/post/detail`, { params: { id: this.id }, headers: { Authorization: `Bearer ${token}` } });
                if (response.data.is_valid) {
                    this.title = response.data.post.title;
                    this.summary = response.data.post.summary;
                    this.content = response.data.post.content;
                }
            } catch (error) {
                console.error("Failed to fetch post:", error);
            }
        },
        navigateTo(route) {
            this.$router.push(route);
        },
        async submitForm() {
            this.isSubmitting = true;
            this.submitError = null;

            const formData = new FormData();
            formData.append('post_id', this.id);
            formData.append('title', this.title);
            formData.append('summary', this.summary);
            formData.append('content', this.content);

            try {
                const token = localStorage.getItem('jwtToken');
                let response = await this.$http.post('/api/post/update', formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });
                if (!response.data.is_valid) {
                    this.submitError = response.data.message;
                    return;
                }
                this.$router.push('/community');
            } catch (error) {
                console.error("Failed to create post:", error);
                this.submitError = "Failed to create the post. Please try again.";
            } finally {
                this.isSubmitting = false;
            }
        }
    },
    mounted() {
        this.fetchPost();
    }
}
</script>

<style scoped>
@import url(../assets/page.css);
@import url(../assets/post-compose.css);
</style>