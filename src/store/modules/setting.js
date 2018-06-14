const setting = {
    state: {
        fixHeader: false,
        fixSidebar: false,
        theme: 'blue'
    },
    mutations: {
        setFixHeader(state, fixed) {
            state.fixHeader = fixed;
        },
        setFixSidebar(state, fixed) {
            state.fixSidebar = fixed;
        },
        setTheme(state, theme) {
            state.theme = theme;
        }
    }
};

export default setting;