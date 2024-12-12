<template>
    <div class="community-view">
        <div class="community-container">
            <header class="page-header">
                <div class="header-content">
                    <h2>Community</h2>
                    <p>Welcome to our community posts. Explore the latest posts and join the conversation.</p>
                </div>
                <button @click="navigateTo('/community/create')" class="create-post-btn">Create New Blog</button>
            </header>
            <div class="post-cards">
                <div v-for="post in posts" :key="post.id" class="post-card"
                    @click="navigateTo(`/community/post/${post.id}`)">
                    <h3>{{ post.title }}</h3>
                    <p>{{ post.summary }}</p>
                    <small>{{ post.author }} | {{ formatDate(post.created_at) }}</small>
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
        fetchPosts() {
            const token = localStorage.getItem('jwtToken');
            this.$http.get('/api/blogs', { headers: { Authorization: `Bearer ${token}` } })
                .then(response => {
                    this.posts = response.data;
                })
                .catch(error => console.log(error));
        },
        formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString();
        }
    }
};
</script>

<style scoped>
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
}

.page-header {
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
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.post-card {
    background-color: #f8f8f8;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 15px;
    width: calc(100% / 3 - 40px);
    cursor: pointer;
    transition: transform 0.3s ease;
}

.post-card:hover {
    transform: translateY(-5px);
    background-color: #f0f0f0;
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