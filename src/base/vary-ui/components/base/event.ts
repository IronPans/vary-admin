export function createEvent(eventName: string, target?: any) {
  if (typeof eventName !== 'string') {
    throw new Error('Event name must be a string')
  }

  const eventFrags = eventName.match(/([a-z]+\.([a-z]+))/i),
    detail = {
      target: target
    }

  if (eventFrags !== null) {
    eventName = eventFrags[1]
    detail['namespace'] = eventFrags[2]
  }

  return new window['CustomEvent'](eventName, {
    detail: detail
  })
}

export function triggerEvent(elem, event) {
  elem.dispatchEvent(event)
}

export function on(elem, type, callback, capture = false) {
  if (elem.addEventListener) {
    elem.addEventListener(type, callback, capture)
  } else if (elem.attachEvent) {
    elem.attachEvent(type, callback)
  }
}

export function off(elem, type, callback) {
  if (elem.removeEventListener) {
    elem.removeEventListener(type, callback)
  } else if (elem.detachEvent) {
    elem.detachEvent(type, callback)
  }
}

export function listen(elem, type, callback) {
  on(elem, type, callback)

  return () => {
    off(elem, type, callback)
  }
}

export function getTouchEvent() {
  const isMobile = 'ontouchstart' in document
  let event
  if (isMobile) {
    event = {
      touchstart: 'touchstart',
      touchmove: 'touchmove',
      touchend: 'touchend',
      mobile: true
    }
  } else {
    event = {
      touchstart: 'mousedown',
      touchmove: 'mousemove',
      touchend: 'mouseup',
      mobile: false
    }
  }

  return event
}

export default { createEvent, triggerEvent, on, off, listen, getTouchEvent }
