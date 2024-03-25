import { defineStore } from 'pinia'

// const user = {
//   state: {
//     isLogin: false,
//     account: ''
//   },
//   mutations: {
//     login(state, user) {
//       if (user) {
//         localStorage.setItem('user', JSON.stringify(user))
//         state.account = user.account
//         state.isLogin = true
//       }
//     },
//     logout(state) {
//       localStorage.removeItem('user')
//       state.isLogin = false
//     }
//   }
// }

const useUserStore = defineStore('user', {
  state: () => {
    return {
      isLogin: false,
      account: ''
    }
  },
  actions: {
    login(user: any) {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user))
        this.account = user.account
        this.isLogin = true
      }
    },
    logout() {
      localStorage.removeItem('user')
      this.isLogin = false
    }
  }
})

export default useUserStore
