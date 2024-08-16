import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(persist) //持久化

export default pinia

// import { useUserStore } from './modules/user'
// export { useUserStore }
export * from './modules/user'
