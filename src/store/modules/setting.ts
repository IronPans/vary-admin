import { defineStore } from 'pinia'

// const setting = {
//   state: {
//     fixHeader: false,
//     fixSidebar: false,
//     theme: 'blue'
//   },
//   mutations: {
//     setFixHeader(state, fixed) {
//       state.fixHeader = fixed
//     },
//     setFixSidebar(state, fixed) {
//       state.fixSidebar = fixed
//     },
//     setTheme(state, theme) {
//       state.theme = theme
//     }
//   }
// }

const useSettingStore = defineStore('setting', {
  state: () => {
    return {
      fixHeader: false,
      fixSidebar: false,
      theme: 'blue'
    }
  },
  actions: {
    setFixHeader(fixed: boolean) {
      this.fixHeader = fixed
    },
    setFixSidebar(fixed: boolean) {
      this.fixSidebar = fixed
    },
    setTheme(theme: string) {
      this.theme = theme
    }
  }
})

export default useSettingStore
