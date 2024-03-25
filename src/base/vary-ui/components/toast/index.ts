import Message from '../message'

let toastInstance

const getToastInstance = (props) => {
  if (toastInstance) {
    return toastInstance
  }
  return Message.create({ ...props })
}

export class Toast {
  constructor(props) {
    const position = props.position ? props.position : 'top'
    props['className'] = `va-toast va-toast-${position}`
    props['transitionName'] = props['transitionName'] || 'moveInDown'
    this.props = props
    toastInstance = getToastInstance({
      className: 'va-toast-group',
      onClose: props['onClose'] || (() => {})
    })
    this.create()
  }

  create() {
    const props = Object.assign({}, this.props)
    const prefixCls = 'va-toast'
    const { type, avatar, message, onClose } = props
    const avatarCom = avatar ? `<div class="${prefixCls}-avatar">${avatar}</div>` : ''
    props['message'] = `
        <div class="${prefixCls}-item ${prefixCls}-${type}">
                ${avatarCom}
                <div class="${prefixCls}-content">${message}</div>
            </div>
        `
    props['onClose'] = () => {
      if (onClose) {
        onClose()
      }
    }
    toastInstance.create({ ...props })
  }
}

export default {
  show(props) {
    return new Toast({ ...props })
  },
  info(props) {
    props['type'] = 'info'
    props['avatar'] = '<i class="va-icon c-primary">error_outline</i>'
    return new Toast({ ...props })
  },
  success(props) {
    props['type'] = 'success'
    props['avatar'] = '<i class="va-icon c-success">check_circle_outline</i>'
    return new Toast({ ...props })
  },
  warning(props) {
    props['type'] = 'warning'
    props['avatar'] = '<i class="va-icon c-warning">error_outline</i>'
    return new Toast({ ...props })
  },
  error(props) {
    props['type'] = 'error'
    props['avatar'] = '<i class="va-icon c-danger">highlight_off</i>'
    return new Toast({ ...props })
  },
  close() {
    if (toastInstance) {
      toastInstance.clearAll()
      toastInstance = null
    }
  }
}
