const routes = [
    { path: '/ilustrator', component: httpVueLoader('ilustratorindex.vue'), props: true },
    { path: '/ilustrator/create', component: httpVueLoader('ilustratorcreate.vue'), props: { create: true } },
    { path: '/ilustrator/:id', component: httpVueLoader('ilustratordetails.vue'), props: { show: true } },
    { path: '/ilustrator/edit/:id', component: httpVueLoader('polldetails.vue'), props: { show: true } },
    { path: '/ilustrator/delete/:id', component: httpVueLoader('polldetails.vue'), props: { show: true } }
]

const router = new VueRouter({
    routes: routes
})

const app = new Vue({
    router,
    el: "#app",
    data: {
        titulo: "Proyecto #1: Esteban Espinoza & Marco Murillo"
    }
}).$mount('#app')