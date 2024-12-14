<template>
    <div class="page-view">
        <div class="page-container">
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
                                <span>{{ comment.author }} | {{ formatDate(comment.date) }} {{ comment.author_id ===
                                    $store.state.user.id ? '| You' : '' }}</span>
                                <span v-if="comment.author_id === $store.state.user.id" class="comment-delete-btn"
                                    @click="delteComment(comment.id)">Delete</span>
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
    name: 'PostDetailView',
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
        async deletePost() {
            if (!confirm("Are you sure you want to delete this post?")) {
                return;
            }

            const token = localStorage.getItem('jwtToken');
            try {
                let response = await this.$http.delete(`/api/post/delete`, { params: { post_id: this.postId }, headers: { Authorization: `Bearer ${token}` } });
                if (response.data.is_valid) {
                    this.$router.push('/community');
                }
                else {
                    alert("Failed to delete the post. Please try again. Message: " + response.data.message);
                }
            } catch (error) {
                console.error("Failed to delete post:", error);
                alert("Failed to delete the post. Please try again. Error:", error);
            }
        },
        async delteComment(commentId) {
            if (!confirm("Are you sure you want to delete this comment?")) {
                return;
            }

            const token = localStorage.getItem('jwtToken');
            try {
                let response = await this.$http.delete(`/api/comment/delete`, { params: { comment_id: commentId }, headers: { Authorization: `Bearer ${token}` } });
                if (response.data.is_valid) {
                    this.fetchPost();
                }
                else {
                    alert("Failed to delete the comment. Please try again. Message: " + response.data.message);
                }
            } catch (error) {
                console.error("Failed to delete comment:", error);
                alert("Failed to delete the comment. Please try again. Error:", error);
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
@import url(../assets/page.css);
@import url(../assets/comments.css);

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

.post-image {
    width: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
}

.post-image img {
    width: 100%;
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