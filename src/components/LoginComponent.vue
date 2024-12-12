<template>
    <div class="login-container">
        <h2>Login</h2>
        <form @submit.prevent="handleLogin">
            <div class="input-group">
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="email" required />
            </div>
            <div class="input-group">
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="password" required />
            </div>
            <p v-if="message" class="message">{{ message }}</p>
            <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <a href="#" @click="switchToRegister">Register here</a></p>
    </div>
</template>

<script>
import CryptoJS from 'crypto-js';
export default {
    data() {
        return {
            email: '',
            password: '',
            message: ''
        };
    },
    methods: {
        async createSHA256Hash(plainText) {
            const hash = CryptoJS.SHA256(plainText).toString(CryptoJS.enc.Hex);
            return hash;
        },
        async login() {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 3000);
            try {
                const response = await this.$http.post('/api/login', {
                    email: this.email,
                    password: await this.createSHA256Hash(this.password)
                }, {
                    signal: controller.signal
                });
                this.message = response.data.message;
                if (response.data.is_valid) {
                    clearTimeout(timeoutId);
                    await new Promise(resolve => setTimeout(resolve, 500));
                    this.$store.commit('SET_TOKEN', response.data.access_token);
                    this.$store.commit('SET_USER', response.data.user);
                    this.$store.commit('SET_AVATAR_URL', `${this.$http.defaults.baseURL}${response.data.user.avatar_url}`);
                    this.$router.push('/dashboard');
                }
            } catch (error) {
                this.message = "Server network error, please try again";
                console.log(error);
            } finally {
                clearTimeout(timeoutId);
            }
        },
        async handleLogin() {
            this.login();
        },
        switchToRegister() {
            this.$emit('switchToRegister');
        }
    }
};
</script>

<style scoped>
.login-container {
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