import vButton from './button';

const components = {
    vButton
};

const install = (Vue, options = {}) => {
    if (install.installed) return;

    Object.keys(components).forEach(key => {
        Vue.component(key, components[key]);
    });
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

const API = {
    version: process.env.VERSION,
    install,
    ...components
};

export default API;
