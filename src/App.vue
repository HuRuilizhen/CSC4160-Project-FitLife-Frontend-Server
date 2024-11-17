<!-- src/App.vue -->
<template>

    <NavBar />
    <div class="main">
        <router-view></router-view>
    </div>

</template>

<script>
import NavBar from './components/Navbar.vue';

export default {
    name: 'App',
    components: {
        NavBar
    }
}
</script>

<style>
.main {
    position: sticky;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* min-height: 60vh; */
}

* {
    font-family: "Times New Roman", SimSun, sans-serif;
}
</style>
