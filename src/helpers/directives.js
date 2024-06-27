export const clickOutsideDirective = {
    updated(el, binding) {
        el.clickOutsideEvent = function (event) {
            const { handler, exclude } = binding.value
            const clickedOnExcludedEl = exclude?.contains(event.target)
            if (!el.contains(event.target) && !clickedOnExcludedEl) {
                handler(event)
            }
        }
        document.body.addEventListener('click', el.clickOutsideEvent)
    },
    unmounted(el) {
        document.body.removeEventListener('click', el.clickOutsideEvent)
    }
}
