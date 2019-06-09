const elTransition = '0.4s height linear, 0.4s padding-top linear, 0.4s padding-bottom linear'
const Transition = {
  'before-enter' (el) {
    console.log('before-enter')
    el.style.transition = elTransition
    if (!el.dataset) el.dataset = {}

    el.dataset.oldPaddingTop = el.style.paddingTop
    el.dataset.oldPaddingBottom = el.style.paddingBottom

    el.style.height = 0
    el.style.paddingTop = 0
    el.style.paddingBottom = 0
  },

  'enter' (el) {
    el.dataset.oldOverflow = el.style.overflow
    // setTimeout(() => {
    //   console.log('enter')
    //   console.log(el.dataset)
    //   console.log(el.scrollHeight)
      
    // }, 0)
    if (el.scrollHeight !== 0) {
      el.style.height = el.scrollHeight + 'px'
      el.style.paddingTop = el.dataset.oldPaddingTop
      el.style.paddingBottom = el.dataset.oldPaddingBottom
    } else {
      el.style.height = ''
      el.style.paddingTop = el.dataset.oldPaddingTop
      el.style.paddingBottom = el.dataset.oldPaddingBottom
    }
    el.style.overflow = 'hidden'
  },

  'after-enter' (el) {
    console.log('after-enter')
    el.style.transition = ''
    el.style.height = ''
    el.style.overflow = el.dataset.oldOverflow
  },

  'before-leave' (el) {
    console.log('before-leave')
    if (!el.dataset) el.dataset = {}
    el.dataset.oldPaddingTop = el.style.paddingTop
    el.dataset.oldPaddingBottom = el.style.paddingBottom
    el.dataset.oldOverflow = el.style.overflow

    el.style.height = el.scrollHeight + 'px'
    el.style.overflow = 'hidden'
  },

  'leave' (el) {
    console.log('leave')
    if (el.scrollHeight !== 0) {
      el.style.transition = elTransition
      el.style.height = 0
      el.style.paddingTop = 0
      el.style.paddingBottom = 0
    }
  },

  'after-leave' (el) {
    console.log('after-leave')
    el.style.transition = ''
    el.style.height = ''
    el.style.overflow = el.dataset.oldOverflow
    el.style.paddingTop = el.dataset.oldPaddingTop
    el.style.paddingBottom = el.dataset.oldPaddingBottom
  }
}

export default {
  name: 'CollapseTransition',
  functional: true,
  render (h, { children }) {
    const data = {
      on: Transition
    }
    return h('transition', data, children)
  }
}
