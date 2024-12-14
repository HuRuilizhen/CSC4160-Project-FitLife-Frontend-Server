<template>
    <div class="register-container">
        <h2>Register</h2>
        <form @submit.prevent="handleRegister">
            <div class="input-group">
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="email" required />
            </div>
            <div class="input-group">
                <label for="username">Username:</label>
                <input type="text" id="username" v-model="username" required />
            </div>
            <div class="input-group">
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="password" required />
            </div>
            <div class="input-group">
                <label for="confirm-password">Confirm Password:</label>
                <input type="password" id="confirm-password" v-model="confirmPassword" required />
            </div>
            <p v-if="message" class="message">{{ message }}</p>
            <button type="submit">Register</button>
        </form>
        <p>Already have an account? <a href="#" @click="switchToLogin">Login here</a></p>
    </div>
</template>

<script>
import CryptoJS from 'crypto-js';
export default {
    name: 'RegisterComponent',
    data() {
        return {
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
            message: ''
        };
    },
    methods: {
        async createSHA256Hash(plainText) {
            const hash = CryptoJS.SHA256(plainText).toString(CryptoJS.enc.Hex);
            return hash;
        },
        async register() {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 3000);
            try {
                const response = await this.$http.post('/api/register', {
                    email: this.email,
                    username: this.username,
                    password: await this.createSHA256Hash(this.password)
                }, {
                    signal: controller.signal
                });
                this.message = response.data.message;
                if (response.data.is_valid) {
                    this.switchToLogin();
                }
            } catch (error) {
                this.message = "Server network error, please try again";
                console.log(error);
            } finally {
                clearTimeout(timeoutId);
            }
        },
        async handleRegister() {
            this.register();
        },
        switchToLogin() {
            this.$emit('switchToLogin');
        }
    }
};
</script>

<style scoped>
.register-container {
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

.message {
    color: black;
    margin-top: 10px;
}

label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
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
</style>