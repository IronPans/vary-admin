export default class FullScreen {
  params: any = {}
  originParams: any = {}
  container: HTMLElement | null
  wrapper: Element | null
  pagination: HTMLDivElement
  activeIndex: number = 0
  totalSlides: number = 0
  scrollY: number = 0
  isScroll: boolean = false
  constructor(container, options: any) {
    // const defaultOptions = {
    //   container,
    //   width: window.innerWidth,
    //   height: window.innerHeight,
    //   pagination: false,
    //   paginationClickable: false
    // }
    this.container = container

    const originParams: any = {}
    this.params = options || {}
    for (const param in options) {
      if (typeof options[param] === 'object') {
        originParams[param] = {}
        for (var defPa in options[param]) {
          originParams[param][defPa] = options[param][defPa]
        }
      } else {
        originParams[param] = options[param]
      }
    }
    for (const opt in options) {
      if (typeof options[opt] === 'object') {
        for (var defOpt in options[opt]) {
          if (typeof options[opt][defOpt] === 'undefined') {
            this.params[opt][defOpt] = options[opt][defOpt]
          }
        }
      } else if (typeof options[opt] === 'undefined') {
        this.params[opt] = options[opt]
      }
    }
    this.originParams = originParams
    this.container = null
    this.wrapper = null

    this.initPage()
  }

  initPage() {
    // this.container = document.querySelector('.fullscreen-container')
    this.wrapper = this.container?.firstElementChild || null
    this.refreshView(this.container)
    //给页面绑定滑轮滚动事件
    //				    if (document.addEventListener) {
    //				        document.addEventListener('DOMMouseScroll', this.scrollFunc(), false);
    //				    }
    //滚动滑轮触发scrollFunc方法
    window.addEventListener('mousewhell', this.scrollFunc.bind(this))
    document.addEventListener('mousewhell', this.scrollFunc.bind(this))
    //   window.onmousewheel = document.onmousewheel = this.scrollFunc
    this.pageTransitionEnd()
    if (this.params.init) {
      this.params.init(this)
    }
    this.resize()
  }

  initPagePagination(slide) {
    this.pagination = document.createElement('div')
    this.pagination.className = 'fullscreen-pagination'
    for (var i = 0; i < slide.length; i++) {
      slide[i].style.height = this.params.height + 'px'
      const tab = document.createElement('span')
      if (i == 0) {
        tab.className = 'fullscreen-pagination-bullet fullscreen-pagination-bullet-active'
      } else {
        tab.className = 'fullscreen-pagination-bullet'
      }
      tab.setAttribute('data-index', i + '')
      this.pagination.appendChild(tab)
    }
    this.container?.appendChild(this.pagination)
    if (this.params.paginationClickable) {
      const p = document
        .querySelector('.fullscreen-pagination')
        .getElementsByClassName('fullscreen-pagination-bullet')
      for (var i = 0; i < p.length; i++) {
        p[i].addEventListener('click', (event: any) => {
          const index = event.getAttribute('data-index')
          this.scrollTo(index)
        })
      }
    }
  }

  refreshView(elem) {
    var wHeight = this.params.height
    this.wrapper = elem.firstElementChild
    var slides = this.container?.getElementsByClassName('fullscreen-slide')
    if (this.params.pagination) {
      this.initPagePagination(slides)
    }
    this.totalSlides = slides?.length || 0
    this.wrapper.style.height = wHeight * this.totalSlides + 'px'
  }

  scrollFunc(e: any) {
    var direct = 0
    e = e || window.event
    if (!this.isScroll) {
      if (e.wheelDelta) {
        //判断浏览器IE，谷歌滑轮事件
        if (e.wheelDelta > 0) {
          //当滑轮向上滚动时
          this.scrollPrev()
        } else if (e.wheelDelta < 0) {
          //当滑轮向下滚动时
          this.scrollNext()
        }
      } else if (e.detail) {
        //Firefox滑轮事件
        if (e.detail > 0) {
          //当滑轮向上滚动时
          this.scrollPrev()
        } else if (e.detail < 0) {
          //当滑轮向下滚动时
          this.scrollNext()
        }
      }
    }
  }
  scrollPrev() {
    if (this.activeIndex > 0) {
      this.isScroll = true
      this.scrollY += this.params.height
      this.wrapper.style.transform = 'translate3d(0,' + this.scrollY + 'px,0)'
      this.activeIndex--
    }
  }

  scrollNext() {
    if (this.activeIndex < this.totalSlides - 1) {
      this.isScroll = true
      this.scrollY -= this.params.height
      this.wrapper.style.transform = 'translate3d(0,' + this.scrollY + 'px,0)'
      this.activeIndex++
    }
  }

  scrollTo(index) {
    if (index < this.totalSlides) {
      this.isScroll = true
      this.scrollY += this.params.height * (this.activeIndex - index)
      this.wrapper.style.transform = 'translate3d(0,' + this.scrollY + 'px,0)'
      this.activeIndex = index
    }
  }

  pageTransitionEnd() {
    const _this = this
    var slides = this.wrapper.querySelectorAll('.fullscreen-slide')
    var pagination = document.querySelectorAll('.fullscreen-pagination-bullet')
    this.wrapper.addEventListener('transitionend', () => {
      this.isScroll = false
      for (var i = 0; i < slides.length; i++) {
        slides[i].className = 'fullscreen-slide'
        pagination[i].className = 'fullscreen-pagination-bullet'
      }
      slides[this.activeIndex].className += ' active'
      pagination[this.activeIndex].className += ' fullscreen-pagination-bullet-active'
    })

    function start() {
      _this.isScroll = true
      if (_this.params.pageChangeStart) {
        _this.params.pageChangeStart(_this)
      }
    }
    function end() {
      _this.isScroll = false
      if (_this.params.pageChangeEnd) {
        _this.params.pageChangeEnd(_this)
      }
    }
    this.transitionStart(this.wrapper, start)
    this.transitionEnd(this.wrapper, end)
  }

  transitionStart(elem: HTMLElement, handler: any) {
    elem.addEventListener('transitionstart', handler, false)
    elem.addEventListener('webkitTransitionStart', handler, false)
    elem.addEventListener('mozTransitionStart', handler, false)
    elem.addEventListener('oTransitionStart', handler, false)
  }

  transitionEnd(elem: HTMLElement, handler: any) {
    elem.addEventListener('transitionend', handler, false)
    elem.addEventListener('webkitTransitionEnd', handler, false)
    elem.addEventListener('mozTransitionEnd', handler, false)
    elem.addEventListener('oTransitionEnd', handler, false)
  }

  resize() {
    window.addEventListener('resize', () => {
      this.initPage()
    })
  }
}
