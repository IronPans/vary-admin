export default {
  mounted(el, binding) {
    function documentClickHandle(event) {
      let target = event.target
      if (el.contains(target)) {
        return false
      }
      if (binding.value) {
        binding.value(event)
      }
    }
    el._clickoutsie = documentClickHandle
    document.addEventListener('click', documentClickHandle)
  },
  beforeUnmount(el, binding) {
    document.removeEventListener('click', el._clickoutside)
    delete el._clickoutside
  }
}
