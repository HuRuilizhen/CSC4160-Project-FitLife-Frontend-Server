<template>
    <div class="page-view">
        <div class="page-container">
            <header class="page-header">
                <div class="header-content">
                    <h2>Community</h2>
                    <p>Welcome to our community posts. Explore the latest posts and join the conversation.</p>
                </div>
                <button @click="navigateTo('/community/create')" class="header-btn">Create New Posts</button>
            </header>
            <div class="main-content">
                <div class="post-cards">
                    <div v-for="post in posts" :key="post.id" class="post-card"
                        @click="navigateTo(`/community/post?id=${post.id}`)">
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
                                    <img :src="`${$http.defaults.baseURL}${post.author_avatar_url}`"
                                        alt="Author Avatar" />
                                </div>
                                <small>{{ post.author }} | {{ formatDate(post.date) }}</small>
                            </footer>
                        </div>
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
    name: 'CommunityView',
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
@import url(../assets/page.css);
@import url(../assets/post-cards.css);

.no-posts {
    text-align: center;
}

.no-posts p {
    font-size: 1.2em;
    color: #555;
    font-style: italic;
}
</style>