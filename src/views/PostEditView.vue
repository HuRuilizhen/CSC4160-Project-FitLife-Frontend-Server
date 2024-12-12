<template>
    <div class="post-edit-view">
        <div class="post-edit-container">
            <header class="page-header">
                <div class="header-content">
                    <h2>Edit Community Post </h2>
                    <p>Something wrong? Edit it.</p>
                </div>
                <button @click="$router.go(-1)" class="back-btn">Last Page</button>
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
.post-edit-view {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 98vh;
    background-color: #eeeeee;
}

.post-edit-container {
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

.back-btn {
    padding: 10px 20px;
    font-size: 1em;
    color: white;
    background-color: #4CAF50;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.back-btn:hover {
    background-color: #45a049;
}

.main-content {
    width: 90%;
    max-width: 800px;
    padding: 30px;
    background-color: white;
    text-align: left;
}

.form-group {
    margin-bottom: 20px;
}

.title-group .input-with-button {
    display: flex;
    align-items: center;
}

.title-group input {
    flex-grow: 1;
    margin-right: 10px;
}

.title-group button {
    width: 100px;
    padding: 10px 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.title-group button:hover:not(:disabled) {
    background-color: #45a049;
}

.title-group button:disabled {
    background-color: #dddddd;
    cursor: not-allowed;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

.form-group textarea {
    resize: vertical;
    min-height: 150px;
}

button[type="submit"] {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    width: 100%;
}

button[type="submit"]:hover:not(:disabled) {
    background-color: #45a049;
}

button[type="submit"]:disabled {
    background-color: #dddddd;
    cursor: not-allowed;
}

.error-message {
    color: red;
    margin-top: 10px;
}
</style>