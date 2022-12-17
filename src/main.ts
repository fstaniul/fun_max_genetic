import { createApp } from 'vue'
import './styles/styles.sass'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from './views/Home.vue';
import FunctionMaximum from './views/FunctionMaximum.vue';
import BackpackProblem from './views/BackpackProblem.vue';
import App from './App.vue';

const routes: RouteRecordRaw[] = [
    { path: '/', component: Home },
    { path: '/maximum', component: FunctionMaximum },
    { path: '/backpack-problem', component: BackpackProblem },
    { path: '/*', redirect: '/' },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

const app = createApp(App)

app.use(router);
app.mount('#app')
