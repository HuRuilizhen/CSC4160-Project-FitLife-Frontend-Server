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
    width: 100%;
    height: 98vh;
    background-color: #eeeeee;
    gap: 0;
}
</style>