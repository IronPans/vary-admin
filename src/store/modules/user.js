const user = {
    state: {
        isLogin: false,
        account: ''
    },
    mutations: {
        login(state, user) {
            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
                state.account = user.account;
                state.isLogin = true;
            }
        },
        logout(state) {
            localStorage.removeItem('user');
            state.isLogin = false;
        }
    }
};

export default user;