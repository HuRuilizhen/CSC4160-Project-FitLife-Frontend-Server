<template>
    <div class="dashboard-view">
        <div class="dashboard-container">
            <div class="header-row">
                <div class="user-info-card">
                    <img :src="$store.state.avatar_url" alt="User Avatar" class="avatar">
                    <h2>Welcome, {{ $store.state.user.username }}!</h2>
                    <p>Here's a quick overview of your health and activities.</p>
                </div>

                <div class="health-overview">
                    <div class="card">
                        <h3>Calories Consumed Today</h3>
                        <p v-if="userCaloriesConsumed">{{ userCaloriesConsumed }} kcal</p>
                        <p v-else>No data available</p>
                    </div>
                    <div class="card">
                        <h3>Calories Burned Today</h3>
                        <p v-if="userCaloriesBurned">{{ userCaloriesBurned }} kcal</p>
                        <p v-else>No data available</p>
                    </div>
                </div>
            </div>

            <div class="main-content">
                <div class="recent-activity">
                    <h3>Recent Activity</h3>
                    <ul>
                        <li v-for="activity in recentActivities" :key="activity.date">
                            {{ activity.description }}
                        </li>
                    </ul>
                    <div v-if="!recentActivities.length">No recent activities available.</div>
                </div>

                <div class="community-feed">
                    <h3>Community Feed</h3>
                    <div class="post-cards">
                        <div v-for="post in posts" :key="post.date" class="post-card"
                            @click="navigateTo(`/post/${post.id}`)">
                            <div class="card-header">
                                <div class="text-content">
                                    <h4>{{ post.title }}</h4>
                                    <p class="author-time">{{ post.author }} | {{ post.date }}</p>
                                </div>
                            </div>
                            <div class="card-content">
                                <p>{{ post.summary }}</p>
                            </div>
                        </div>
                        <div v-if="!posts.length" class="no-posts">No posts available.</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Dashboard',
    data() {
        return {
            userCaloriesBurned: null,
            userCaloriesConsumed: null,
            recentActivities: [],
            posts: []
        };
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        navigateTo(route) {
            this.$router.push(route);
        },
        fetchData() {
            // Fetch user data from the backend

            // this.userCaloriesBurned = 2000;
            // this.userCaloriesConsumed = 1500;
            // this.recentActivities = [
            //     { id: 1, description: 'Logged 1 hour of cycling' },
            //     { id: 2, description: 'Ate a healthy salad for lunch' }
            // ];
            // this.posts = [
            //     {
            //         id: 1,
            //         title: 'Healthy Eating Habits',
            //         author: 'John Doe',
            //         time: '2 hours ago',
            //         summary: 'Learn about healthy eating habits and how to maintain a balanced diet.'
            //     },
            //     {
            //         id: 2,
            //         title: 'Fitness Tips for Beginners',
            //         author: 'Jane Smith',
            //         time: '1 day ago',
            //         summary: 'Discover fitness tips for beginners and how to start your fitness journey.'
            //     },
            //     {
            //         id: 3,
            //         title: 'Healthy Lifestyle',
            //         author: 'Bob Johnson',
            //         time: '3 days ago',
            //         summary: 'Learn about the importance of a healthy lifestyle and how to maintain it.'
            //     }
            // ];

            const token = localStorage.getItem('jwtToken');
            this.$http.get('/api/dashboard/fetch', { headers: { Authorization: `Bearer ${token}` } })
                .then(response => {
                    this.userCaloriesBurned = response.data.userCaloriesBurned;
                    this.userCaloriesConsumed = response.data.userCaloriesConsumed;
                    this.recentActivities = response.data.recentActivities;
                    this.posts = response.data.posts;
                })
                .catch(error => console.log(error));
        }
    }
};
</script>

<style scoped>
.dashboard-view {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 98vh;
    background-color: #eeeeee;
    gap: 0;
}

.dashboard-container {
    width: 90%;
    height: 85%;
    margin: 0 auto;
    margin-top: 60px;
    padding: 20px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.header-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    height: 30%;
    margin-bottom: 20px;
}

.user-info-card {
    text-align: center;
    flex: 1;
    margin-right: 20px;
}

.user-info-card .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-bottom: 10px;
}

.health-overview {
    display: flex;
    justify-content: space-between;
    flex: 1;
}

.health-overview .card {
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    flex: 1;
}

.main-content {
    flex: 1;
    overflow-y: auto;
    height: 60%;
    padding: 20px;
    border-top: 1px solid #ccc;
}

.recent-activity h3,
.community-feed h3 {
    font-size: 18px;
    margin-bottom: 10px;
    color: #45a049;
}

.recent-activity ul {
    list-style-type: none;
    padding: 0;
}

.recent-activity li {
    margin-bottom: 10px;
    margin-bottom: 10px;
    padding: 10px;
    background-color: #f8f8f8;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: transform 0.3s ease;
}

.recent-activity li:hover {
    transform: translateY(-5px);
    background-color: #f0f0f0;
}

.community-feed {
    margin-top: 20px;
}

.post-cards {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.post-card {
    border-radius: 8px;
    background-color: #f8f8f8;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 10px;
    display: flex;
    cursor: pointer;
    transition: transform 0.3s ease;
}

.post-card:hover {
    transform: translateY(-5px);
    background-color: #f0f0f0;
}

.card-header {
    display: flex;
    align-items: flex-start;
    gap: 10px;
}

.text-content {
    flex: 1;
}

.text-content h4 {
    margin-bottom: 5px;
    color: #333;
}

.text-content .author-time {
    font-size: 14px;
    color: #777;
}

.card-content {
    margin-top: 10px;
    margin-left: 100px;
    flex: 1;
}

.card-content p {
    font-size: 16px;
    line-height: 1.5;
    color: #555;
    text-align: right;
}
</style>