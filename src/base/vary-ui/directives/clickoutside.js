export default {
    bind(el, binding) {
        function documentClickHandle(event) {
            let target = event.target;
            if (el.contains(target)) {
                return false;
            }
            if (binding.expression) {
                binding.value(event);
            }
        }
        el._clickoutsie = documentClickHandle;
        document.addEventListener('click', documentClickHandle);
    },
    unbind(el, binding) {
        document.removeEventListener('click', el._clickoutside);
        delete el._clickoutside;
    }
}