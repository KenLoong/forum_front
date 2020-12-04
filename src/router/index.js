import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Index',
        component: () => import( '../views/Index.vue'),
    },
    {
        path: '/register',
        name: 'register',
        component: () => import( '../views/Register.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import( '../views/Login.vue'),
    },
    {
        path: '/post/add',
        name: 'PostAdd',
        component: () => import( '../views/PostAdd.vue')
    },
    {
        path: '/profile/:uid',
        name: 'Profile',
        component: () => import('../views/Profile.vue')
    },
    {
        path: '/post/:pid',
        name: 'PostDetail',
        component: () => import('../views/PostDetail.vue')
    },
    {
        path: '/letter',
        name: 'Letter',
        component: () => import('../views/Letter.vue')
    },
    {
        path:'/letter/:cid',
        name:'LetterDetail',
        component: () => import('../views/LetterDetail.vue')
    },
    {
        path:'/send/:toName',
        name:'SendLetter',
        component: () => import('../views/SendLetter.vue')
    },
    {
        path:'/followers/:userId',
        name:'Followers',
        component: () => import('../views/Followers.vue')
    },
    {
        path:'/followees/:userId',
        name:'Followees',
        component: () => import('../views/Followees.vue')
    },
    {
        path:'/notice',
        name:'Notice',
        component: () => import('../views/Notice.vue')
    },
    {
        path:'/notice/:topic',
        name:'NoticeDetail',
        component: () => import('../views/NoticeDetail.vue')
    },
    {
        path:'/search/:keyword',
        name:'Search',
        component: () => import('../views/Search.vue')
    },
    {
        path:'/data',
        name:'Data',
        component: () => import('../views/Data.vue')
    },
    {
        path:'/hot',
        name:'Hot',
        component: () => import('../views/Hot.vue')
    },
    {
        path:'/setting',
        name:'Setting',
        component: () => import('../views/Setting.vue')
    },
    {
        path:'/collect/:uid',
        name:'Collection',
        component: () => import('../views/Collection.vue')
    },
    {
        path:'/userPost/:uid',
        name:'UserPosts',
        component: () => import('../views/UserPosts.vue')
    },
    {
        path:'/ken',
        name:'Ken',
        component: () => import('../views/Ken.vue')
    },
    {
        path:'/myAdmin',
        name:'Admin',
        component: () => import('../views/Admin.vue')
    },
    {
        path:'/forget',
        name:'Forget',
        component: () => import('../views/Forget.vue')
    },
    {
        path:'/message',
        name:'Message',
        component: () => import('../views/Message.vue')
    }

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
