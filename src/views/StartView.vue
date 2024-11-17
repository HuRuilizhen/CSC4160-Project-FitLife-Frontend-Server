<template>
    <div class="start-view">
        <component :is="currentComponent" @switchToLogin="showLogin" @switchToRegister="showRegister"></component>
    </div>
</template>

<script>
import LoginComponent from '@/components/LoginComponent.vue';
import RegisterComponent from '@/components/RegisterComponent.vue';

export default {
    components: {
        LoginComponent,
        RegisterComponent
    },
    data() {
        return {
            currentComponent: 'LoginComponent'
        };
    },
    methods: {
        showLogin() {
            this.currentComponent = 'LoginComponent';
        },
        showRegister() {
            this.currentComponent = 'RegisterComponent';
        }
    }
};
</script>

<style scoped>
.start-view {
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
</style>