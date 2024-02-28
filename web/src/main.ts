import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { getSession } from './utils/session.utils'

const app = createApp(App)

router.beforeEach((to, from, next) => {
    const authorize = to.meta.authorize as string[];

    if(authorize) {
        const session = getSession();
        if(!session || !authorize.includes(session.userData.userType)) {
            return next({
                path: '/auth/login', 
                query: { 
                    returnUrl: to.path 
                }
            })
        }
    }
    next();
})

app.use(router)
app.mount('#app');
