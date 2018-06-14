import {addClass, removeClass} from '../base/dom';

const transitionName = 'va-collapse-transition';

const transitionEvent = {
    // 进入前
    beforeEnter(el) {
        el.style.height = 0;
        el.dataset.overflow = el.style.overflow;
        addClass(el, transitionName);
    },
    // 进入中
    enter(el) {
        let height = 0;
        el.style.height = '1px';
        el.style.overflow = 'auto';
        height = el.scrollHeight;
        el.style.overflow = 'hidden';
        el.style.height = height + 'px';
    },
    // 进入后
    afterEnter(el) {
        el.style.height = '';
        el.style.overflow = el.dataset.overflow;
        removeClass(el, transitionName);
    },
    // 离开前
    beforeLeave(el) {
        addClass(el, transitionName);
        el.style.height = el.scrollHeight + 'px';
        el.style.overflow = 'hidden';
    },
    // 离开中
    leave(el) {
        const width = el.offsetWidth;
        el.style.height = 0;
    },
    // 离开后
    afterLeave(el) {
        el.style.overflow = el.dataset.overflow;
        el.style.height = '';
        removeClass(el, transitionName);
    }
};

export default {
    name: 'CollapseTransition',
    functional: true,
    render(createElement, {children}) {
        return createElement('transition', {
            on: transitionEvent
        }, children);
    }
}