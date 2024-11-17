<template>
    <div class="settings-view">
        <div class="settings-container">
            <h2>Settings</h2>
            <form @submit.prevent="saveSettings">
                <div class="input-group">
                    <label for="avatar">Profile Picture:</label>
                    <input type="file" id="avatar" @change="onFileSelected" accept="image/*" />
                    <img :src="previewImage" alt="Preview" v-if="previewImage" class="preview-image" />
                </div>
                <div class="input-group">
                    <label for="username">Username:</label>
                    <input type="text" id="username" v-model="username" />
                </div>
                <div class="input-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" v-model="email" />
                </div>
                <div class="input-group">
                    <label for="current-password">Current Password:</label>
                    <input type="password" id="current-password" v-model="currentPassword" required />
                </div>
                <div class="input-group">
                    <label for="new-password">New Password:</label>
                    <input type="password" id="new-password" v-model="newPassword" />
                </div>
                <div class="input-group">
                    <label for="confirm-new-password">Confirm New Password:</label>
                    <input type="password" id="confirm-new-password" v-model="confirmNewPassword" />
                </div>
                <p v-if="message" class="message">{{ message }}</p>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    </div>
</template>

<script>
import CryptoJS from 'crypto-js';

export default {
    data() {
        return {
            username: '',
            email: '',
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: '',
            selectedFile: null,
            previewImage: null,
            message: '',
        };
    },
    methods: {
        goToStart() {
            this.$router.push('/');
        },
        logout() {
            this.showDropdown = false;
            this.$store.commit('LOGOUT');
            this.$router.push('/');
        },
        async createSHA256Hash(plainText) {
            const hash = CryptoJS.SHA256(plainText).toString(CryptoJS.enc.Hex);
            return hash;
        },
        async changeSettings(formData) {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 3000);

            const token = this.$store.state.token;
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };

            try {
                const response = await this.$http.post('/api/settings', formData, {
                    ...config,
                    signal: controller.signal
                });
                this.message = response.data.message;
                if (response.data.is_valid) {
                    this.logout();
                    this.goToStart();
                }
            } catch (error) {
                this.message = "Server network error, please try again";
                console.log(error);
            } finally {
                clearTimeout(timeoutId);
            }
        },
        onFileSelected(event) {
            this.selectedFile = event.target.files[0];
            if (this.selectedFile) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.previewImage = e.target.result;
                };
                reader.readAsDataURL(this.selectedFile);
            } else {
                this.previewImage = null;
            }
        },
        async saveSettings() {
            let passwordHash = await this.createSHA256Hash(this.currentPassword);
            let newPasswordHash = '';
            if (this.newPassword && this.newPassword !== this.confirmNewPassword) {
                alert('New passwords do not match');
                return;
            }
            else if (this.newPassword) {
                newPasswordHash = await this.createSHA256Hash(this.newPassword);
            }

            const formData = new FormData();
            formData.append('password', passwordHash);
            if (this.username) {
                formData.append('username', this.username);
            }
            if (this.email) {
                formData.append('email', this.email);
            }
            if (this.newPassword) {
                formData.append('new_password', newPasswordHash);
            }
            if (this.selectedFile) {
                formData.append('avatar', this.selectedFile);
            }

            // Handle form submission logic here
            console.log('Settings saved:', formData);
            this.changeSettings(formData);
        }
    }
};
</script>

<style scoped>
.settings-view {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 60px;
    width: 100%;
    height: 890px;
    background-color: #eeeeee;
    border-radius: 8px;
    border: 1px solid #ccc;
    gap: 0;
}

.settings-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.input-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

input[type="text"],
input[type="email"],
input[type="password"] {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

input[type="file"] {
    margin-top: 5px;
}

button {
    width: 100%;
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #45a049;
}

.preview-image {
    width: 50px;
    height: 50px;
    margin-top: 10px;
    border-radius: 50%;
}

.message {
    color: black;
    margin-top: 10px;
}
</style>