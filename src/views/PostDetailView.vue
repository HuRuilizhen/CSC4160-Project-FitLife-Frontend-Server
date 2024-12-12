<template>
    <div class="post-detail-view">
        <div class="post-detail-container">
            <header class="page-header">
                <div class="header-content">
                    <div v-if="!post">
                        <h2>Post Detail</h2>
                        <p>Explore the details of a specific post.</p>
                    </div>
                    <div v-else>
                        <h2> {{ post.title }} </h2>
                        <p> {{ post.summary }}</p>
                        <div class="author-info">
                            <img :src="`${$http.defaults.baseURL}${post.author_avatar_url}`" alt="Author Avatar"
                                class="author-avatar" />
                            <span>{{ post.author }} | {{ formatDate(post.date) }}</span>
                        </div>
                    </div>
                </div>
                <button @click="$router.go(-1)" class="header-btn">Last Page</button>
            </header>
            <div v-if='post' class="main-content">
                <div v-if="post.image_url" class="post-image">
                    <img :src="`${$http.defaults.baseURL}${post.image_url}`" alt="Post Cover" />
                </div>
                <div class="post-content">
                    <article v-html="post.content.replace(/\n/g, '<br>')">
                    </article>
                </div>
                <div v-if="post.author_id === $store.state.user.id" class="post-options">
                    <button @click="navigateTo(`/community/post/edit?id=${post.id}`)" class="edit-btn">Edit</button>
                    <button @click="deletePost" class="delete-btn">Delete</button>
                </div>
                <div class="comments-content">
                    <h3>Comments</h3>
                    <ul v-if="comments.length > 0" class="comments-list">
                        <li v-for="comment in comments" :key="comment.id" class="comment-item">
                            <div class="comment-author">
                                <img :src="`${$http.defaults.baseURL}${comment.author_avatar_url}`" alt="Author Avatar"
                                    class="comment-author-avatar" />
                                <span>{{ comment.author }} | {{ formatDate(comment.date) }}</span>
                            </div>
                            <p>{{ comment.content }}</p>
                        </li>
                    </ul>
                    <p v-else>No comments yet. Be the first to comment!</p>
                    <form @submit.prevent="submitComment" class="comment-form">
                        <textarea v-model="newCommentContent" placeholder="Write your comment here..."
                            required></textarea>
                        <button type="submit" class="submit-comment-btn">Submit Comment</button>
                    </form>
                </div>
            </div>
            <div v-else class="loading">Loading...</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PostDetail',
    data() {
        return {
            post: null,
            loading: true,
            postId: this.$route.query.id,
            comments: [],
            newCommentContent: '',
        };
    },
    methods: {
        navigateTo(route) {
            this.$router.push(route);
        },
        async fetchPost() {
            const token = localStorage.getItem('jwtToken');
            try {
                let response = await this.$http.get(`/api/post/detail`, { params: { id: this.postId }, headers: { Authorization: `Bearer ${token}` } });
                if (response.data.is_valid) {
                    this.post = response.data.post;
                    this.comments = response.data.comments;
                }
            } catch (error) {
                console.error("Failed to fetch post:", error);
            } finally {
                this.loading = false;
            }
        },
        async submitComment() {
            const token = localStorage.getItem('jwtToken');
            try {
                let response = await this.$http.post(`/api/comment/create`, { post_id: this.postId, content: this.newCommentContent }, { headers: { Authorization: `Bearer ${token}` } });
                if (response.data.is_valid) {
                    this.fetchPost();
                    this.newCommentContent = '';
                };
            }
            catch (error) {
                console.error("Failed to create comment:", error);
            }
        },
        formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString();
        }
    },
    mounted() {
        this.fetchPost();
    }
};
</script>

<style scoped>
@import url(../assets/comments.css);

.post-detail-view {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 98vh;
    background-color: #eeeeee;
}

.post-detail-container {
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
    overflow-y: auto;
}

.page-header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
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

.author-info {
    display: flex;
    align-items: center;
    margin-top: 10px;
    gap: 10px;
    margin-bottom: 20px;
}

.author-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
}

.author-info span {
    font-size: 1.2em;
    color: #555;
}

.header-btn {
    padding: 10px 20px;
    font-size: 1em;
    color: white;
    background-color: #4CAF50;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.header-btn:hover {
    background-color: #45a049;
}

.main-content {
    width: 100%;
    padding: 20px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    align-items: center;
}

.post-image {
    width: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
}

.post-image img {
    width: 80%;
    height: auto;
    display: block;
    border-radius: 8px;
    margin-bottom: 20px;
}

.post-content {
    text-align: left;
}

.post-content article {
    padding: 5%;
    font-size: 1.2em;
    color: #333;
}

.post-options {
    display: flex;
    float: right;
    gap: 10px;
    margin-top: 20px;
    margin-right: 5%;
}

.post-options button {
    padding: 10px 20px;
    font-size: 1em;
    color: white;
    background-color: #4CAF50;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.post-options button:hover {
    background-color: #45a049;
}

.loading {
    text-align: center;
    font-size: 1.5em;
    color: #555;
}
</style>