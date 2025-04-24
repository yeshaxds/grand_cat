import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import CatGenerator from '../components/CatGenerator.vue'
import MusicPlayer from '../components/music-player.vue'
import CatDown from "../components/CatDown.vue";
import calculator from "../components/calculator.vue"
import CatGallery from "../components/Cat-Gallery.vue";
import CatBoot from "../components/Cat-Boot.vue";
import CatPark from "../components/Cat_park.vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/CatGenerator',
        name: 'CatGenerator',
        component: CatGenerator
    },
    {
        path: '/music-player',
        name: 'MusicPlayer',
        component: MusicPlayer
    },
    {
        path: '/CatDown',
        name: 'CatDown',
        component: CatDown
    },
    {
        path: '/calculator',
        name: 'calculator',
        component: calculator
    },
    {
        path: '/Cat-Gallery',
        name: 'CatGallery',
        component: CatGallery
    },
    {
        path: '/Cat-Boot',
        name: 'CatBoot',
        component: CatBoot
    },
    {
        path: '/Cat_park',
        name: 'CatPark',
        component: CatPark
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router