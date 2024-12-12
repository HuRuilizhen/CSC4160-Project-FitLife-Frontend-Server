<template>
    <div class="community-view">
        <div class="community-container">
            <header class="page-header">
                <div class="header-content">
                    <h2>Community</h2>
                    <p>Welcome to our community posts. Explore the latest posts and join the conversation.</p>
                </div>
                <button @click="navigateTo('/community/create')" class="create-post-btn">Create New Posts</button>
            </header>
            <div class="post-cards">
                <div v-for="post in posts" :key="post.id" class="post-card"
                    @click="navigateTo(`/community/post/${post.id}`)">
                    <div v-if="post.image_url" class="post-image">
                        <img :src="`${$http.defaults.baseURL}${post.image_url}`" alt="Post Cover" />
                    </div>
                    <div class="post-content">
                        <div class="post-header">
                            <h3>{{ post.title }}</h3>
                            <p>{{ post.summary }}</p>
                        </div>
                        <footer class="post-footer">
                            <div class="author-avatar">
                                <img :src="`${$http.defaults.baseURL}${post.author_avatar_url}`" alt="Author Avatar" />
                            </div>
                            <small>{{ post.author }} | {{ formatDate(post.date) }}</small>
                        </footer>
                    </div>
                </div>
            </div>
            <div v-if="!posts.length" class="no-posts">
                <p>No posts currently available.</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Community',
    data() {
        return {
            posts: []
        };
    },
    mounted() {
        this.fetchPosts();
    },
    methods: {
        navigateTo(route) {
            this.$router.push(route);
        },
        async fetchPosts() {
            const token = localStorage.getItem('jwtToken');
            let response = await this.$http.get('/api/post/fetch', { headers: { Authorization: `Bearer ${token}` } });
            if (response.data.is_valid) {
                this.posts = response.data.posts;
            }
        },
        formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString();
        }
    }
};
</script>

<style scoped>
@import url(../assets/post-cards.css);

.community-view {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 98vh;
    background-color: #eeeeee;
    gap: 0;
}

.community-container {
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

.create-post-btn {
    padding: 10px 20px;
    font-size: 1em;
    color: white;
    background-color: #4CAF50;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.create-post-btn:hover {
    background-color: #45a049;
}

.post-cards {
    width: 80%;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.no-posts {
    text-align: center;
}

.no-posts p {
    font-size: 1.2em;
    color: #555;
    font-style: italic;
}
</style>