<template>
    <div class="page-view">
        <div class="page-container">
            <header class="page-header">
                <div class="header-content">
                    <h2>Create Community New Post</h2>
                    <p>Share your thoughts and ideas with the community.</p>
                </div>
                <button @click="navigateTo('/community')" class="header-btn">Back to Community</button>
            </header>
            <form class="main-content" @submit.prevent="submitForm">
                <div class="form-group title-group">
                    <label for="title">Title:</label>
                    <div class="input-with-button">
                        <input id="title" v-model="title" required />
                        <button type="button" @click="openFileInput">
                            <span>Cover</span>
                            <input type="file" ref="image" @change="onFileChange" style="display: none;" />
                        </button>
                    </div>
                </div>
                <div v-if="imagePreview" class="image-preview">
                    <img :src="imagePreview" alt="Preview" />
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
                <button type="submit" :disabled="isSubmitting">Publish</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PostCreate',
    data() {
        return {
            title: '',
            summary: '',
            content: '',
            selectedImage: null,
            imagePreview: null,
            isSubmitting: false,
            submitError: null
        };
    },
    methods: {
        onFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                this.selectedImage = file;
                this.createImage(file);
            }
        },
        createImage(file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.imagePreview = e.target.result;
            };
            reader.readAsDataURL(file);
        },
        openFileInput() {
            this.$refs.image.click();
        },
        navigateTo(route) {
            this.$router.push(route);
        },
        async submitForm() {
            this.isSubmitting = true;
            this.submitError = null;

            const formData = new FormData();
            formData.append('title', this.title);
            formData.append('summary', this.summary);
            formData.append('content', this.content);
            if (this.selectedImage) {
                formData.append('image', this.selectedImage);
            }

            try {
                const token = localStorage.getItem('jwtToken');
                let response = await this.$http.post('/api/post/create', formData, {
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
    }
};
</script>

<style scoped>
@import url(../assets/page.css);
@import url(../assets/post-compose.css);
</style>