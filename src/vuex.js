// src/vuex.js
import Vuex from 'vuex';
import axios from 'axios';

const store = new Vuex.Store({
    state: {
        token: null,
        user: null,
        avatar_url: null
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token;
            localStorage.setItem('jwtToken', token);
        },
        SET_USER(state, user) {
            state.user = user;
            localStorage.setItem('user', JSON.stringify(user));
        },
        SET_AVATAR_URL(state, avatar_url) {
            state.avatar_url = avatar_url;
            localStorage.setItem('avatar_url', avatar_url);
        },
        LOGOUT(state) {
            state.token = null;
            state.user = null;
            state.avatar_url = null;
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('user');
            localStorage.removeItem('avatar_url');
        }
    },
    getters: {
        isLoggedIn: state => !!state.token
    }
});

async function checkToken() {
    try {
        const checkResponse = await axios.get('http://127.0.0.1:5004' + '/api/token/check', { headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` } });
        return checkResponse.data.is_valid;
    } catch (error) {
        return false;
    }
}


if (localStorage.getItem('jwtToken') && localStorage.getItem('user')) {
    await checkToken().then((is_valid) => {
        if (is_valid) {
            store.commit('SET_TOKEN', localStorage.getItem('jwtToken'));
            store.commit('SET_USER', JSON.parse(localStorage.getItem('user')));
            store.commit('SET_AVATAR_URL', localStorage.getItem('avatar_url'));
        }
        else {
            store.commit('LOGOUT');
        }
    })
}
export default store;