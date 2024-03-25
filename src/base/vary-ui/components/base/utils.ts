export function oneOf(value, validList) {
  return validList.indexOf(value) !== -1
}

export function getSize(val, pix = 'px') {
  const value = typeof val !== 'number' ? val : val + pix
  return value
}

export function dateFormat(date, fmt) {
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (const k in o) {
    if (o.hasOwnProperty(k)) {
      const regExp = new RegExp('(' + k + ')')
      if (regExp.test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
        )
      }
    }
  }
  return fmt
}

export function equals(obj1, obj2, field?) {
  if (field) {
    return resolveFieldData(obj1, field) === resolveFieldData(obj2, field)
  } else {
    return equalsByValue(obj1, obj2)
  }
}

export function equalsByValue(obj1, obj2) {
  if (obj1 == null && obj2 == null) {
    return true
  }
  if (obj1 == null || obj2 == null) {
    return false
  }

  if (obj1 == obj2) {
    delete obj1._$visited
    return true
  }

  if (typeof obj1 == 'object' && typeof obj2 == 'object') {
    obj1._$visited = true
    for (const p in obj1) {
      if (p === '_$visited') {
        continue
      }
      if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) {
        return false
      }

      switch (typeof obj1[p]) {
        case 'object':
          if ((obj1[p] && obj1[p]._$visited) || !equals(obj1[p], obj2[p])) {
            return false
          }
          break

        case 'function':
          if (
            typeof obj2[p] == 'undefined' ||
            (p != 'compare' && obj1[p].toString() != obj2[p].toString())
          ) {
            return false
          }
          break

        default:
          if (obj1[p] != obj2[p]) {
            return false
          }
          break
      }
    }

    for (const p in obj2) {
      if (typeof obj1[p] == 'undefined') {
        return false
      }
    }

    delete obj1._$visited
    return true
  }

  return false
}

export function resolveFieldData(data, field) {
  if (data && field) {
    if (field.indexOf('.') == -1) {
      return data[field]
    } else {
      const fields = field.split('.')
      let value = data
      for (let i = 0, len = fields.length; i < len; ++i) {
        if (value == null) {
          return null
        }
        value = value[fields[i]]
      }
      return value
    }
  } else {
    return null
  }
}

export function filter(value, fields, filterValue) {
  const filteredItems = []

  if (value) {
    for (const item of value) {
      for (const field of fields) {
        if (
          String(resolveFieldData(item, field)).toLowerCase().indexOf(filterValue.toLowerCase()) >
          -1
        ) {
          filteredItems.push(item)
          break
        }
      }
    }
  }

  return filteredItems
}

export function toggleFullScreen(elem = document.documentElement) {
  if (!document.fullscreenElement && !document.webkitFullscreenElement) {
    const docElm = elem
    if (docElm.requestFullscreen) {
      docElm.requestFullscreen()
    } else if (docElm.mozRequestFullScreen) {
      docElm.mozRequestFullScreen()
    } else if (docElm.webkitRequestFullScreen) {
      docElm.webkitRequestFullScreen()
    } else if (docElm.msRequestFullscreen) {
      docElm.msRequestFullscreen()
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen()
    }
  }
}

export function getRequestAnimationFrame() {
  const _win = window
  let setAnimationFrame =
    _win.requestAnimationFrame ||
    _win.webkitRequestAnimationFrame ||
    _win['mozRequestAnimationFrame'] ||
    false
  let clearAnimationFrame =
    _win.cancelAnimationFrame ||
    _win.webkitCancelAnimationFrame ||
    _win['mozCancelAnimationFrame'] ||
    false

  if (!setAnimationFrame) {
    let anilasttime = 0
    setAnimationFrame = (callback, element) => {
      const currTime = new Date().getTime()
      const timeToCall = Math.max(0, 16 - (currTime - anilasttime))
      const id = _win.setTimeout(() => {
        callback(currTime + timeToCall)
      }, timeToCall)
      anilasttime = currTime + timeToCall
      return id
    }
    clearAnimationFrame = (id) => {
      _win.clearTimeout(id)
    }
  } else {
    if (!_win.cancelAnimationFrame) {
      clearAnimationFrame = (id) => {}
    }
  }
  return {
    setAnimationFrame: setAnimationFrame,
    clearAnimationFrame: clearAnimationFrame
  }
}

export function getBrowser() {
  const userAgent = navigator.userAgent
  const isOpera = userAgent.indexOf('Opera') > -1
  if (isOpera) {
    return 'Opera'
  }
  if (userAgent.indexOf('Firefox') > -1) {
    return 'FF'
  }
  if (userAgent.indexOf('Chrome') > -1) {
    return 'Chrome'
  }
  if (userAgent.indexOf('Safari') > -1) {
    return 'Safari'
  }
  if (userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 && !isOpera) {
    return 'IE'
  }
}

export default {
  oneOf,
  getSize,
  dateFormat,
  equals,
  equalsByValue,
  filter,
  toggleFullScreen,
  getRequestAnimationFrame,
  getBrowser
}
