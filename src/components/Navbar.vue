<!-- src/components/navbar.vue -->
<template>
    <nav class="navbar">
        <div class="navbar-left">
            <img class="logo-icon" src="./icons/logo.png" alt="logo">
            <span class="logo">FitLife - Your Fitness Companion</span>
        </div>
        <div v-if="$store.getters.isLoggedIn" class="navbar-right">
            <button class="nav-button" @click="navigateTo('/community')">Community</button>
            <button class="nav-button" @click="navigateTo('/dietlog')">Diet Log</button>
            <button class="nav-button" @click="navigateTo('/sportlog')">Sport Log</button>
            <button class="nav-button" @click="navigateTo('/report')">Report</button>
            <button class="nav-button" @click="navigateTo('/dashboard')">Dashboard</button>
            <div class="user-info" @click="showDropdown = !showDropdown">
                <img class="avatar" :src="$store.state.avatar_url" alt="Avatar">
                <span class="user-name">{{ $store.state.user.username }}</span>
                <img v-if="!showDropdown" class="dropdown-icon" src="./icons/downcircle.svg">
                <img v-else class="dropdown-icon" src="./icons/upcircle.svg">
                <div v-if="showDropdown" class="dropdown">
                    <div class="dropdown-item" @click="handleClickLogout"> <img class="dropdown-item-icon"
                            src="./icons/logout.svg">Logout</div>
                    <div class="dropdown-item" @click="handleClickSettings"> <img class="dropdown-item-icon"
                            src="./icons/setting.svg">Settings</div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'NavBarComponent',
    data() {
        return {
            showDropdown: null,
        }
    },
    mounted() {
        this.showDropdown = false;
    },
    methods: {
        handleClickLogout() {
            this.showDropdown = false;
            this.$store.commit('LOGOUT');
            this.$router.push('/');
        },
        handleClickSettings() {
            this.showDropdown = false;
            this.$router.push('/settings');
        },
        navigateTo(route) {
            this.$router.push(route);
        }
    }
}
</script>

<style scoped>
.navbar {
    position: fixed;
    top: 0;
    width: 100%;
    height: 60px;
    background-color: #f8f8f8;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: black;
    z-index: 100;
}

.navbar-left {
    display: flex;
    align-items: center;
    font-size: 24px;
    font-weight: bold;
    margin-left: 20px;
}

.logo-icon {
    width: 32px;
    height: 32px;
    margin-right: 10px;
}

.logo {
    color: #45a049;
    font-weight: bolder;
}

.navbar-right {
    display: flex;
    align-items: center;
    margin-right: 20px;
}

.navbar-right input {
    width: 200px;
    padding: 5px;
    margin-right: 20px;
}

.user-info {
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
}

.avatar {
    width: 32px;
    height: 32px;
    background-color: #ccc;
    border-radius: 50%;
    margin-right: 10px;
}

.user-name {
    font-size: 14px;
    font-weight: bold;
}

.dropdown-icon {
    width: 16px;
    height: 16px;
    margin-left: 10px;
    margin-right: 5px;
}

.dropdown {
    position: absolute;
    background-color: #f8f8f8;
    border-bottom: 1px solid #ccc;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    padding-bottom: 5px;
    right: 0;
    top: 45px;
    z-index: 10;
}

.dropdown-item {
    align-items: center;
    display: flex;
    padding: 5px;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 5px;
    font-size: 14px;
    text-align: left;
    cursor: pointer;
}

.dropdown-item-icon {
    width: 14px;
    height: 14px;
    margin-right: 2px;
}

.nav-button {
    background: none;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    margin-left: 5px;
    margin-right: 5px;
}

.nav-button:hover {
    background-color: #e0e0e0;
}
</style>
