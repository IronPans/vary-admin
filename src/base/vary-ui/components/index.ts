import vaAlert from './alert'
import vaAutocomplete from './autocomplete'
import vaAvatar from './avatar'
import vaBadge from './badge'
import vaBackTop from './back-top'
import vaBreadcrumb from './breadcrumb'
import VaButton, { VaButtonGroup } from './button'
import vaChart from './chart'
import vaCard from './card'
import vaChip, { vaChipGroup } from './chip'
import vaCheckbox from './checkbox'
import vaColorPicker from './color-picker'
import vaDatePicker from './date-picker'
import vaDropdown from './dropdown'
import vaEditor from './editor'
import { VaForm, VaFormItem } from './form'
// import VaFullcalendar from './fullcalendar'
import vaIcon from './icon'
import vaInput from './input'
import vaInputNumber from './input-number'
import vaKnob from './knob'
import vaList, { vaListItem, vaListItemText, vaListItemAction } from './list'
import vaNotification from './notification'
import vaPanel from './panel'
import vaProgress from './progress'
import vaModal from './modal'
import vaPagination from './pagination'
import { vaRow, vaCol } from './grid'
import vaRadio from './radio'
import vaRate from './rate'
import vaRipple from './ripple'
import vaSelect from './select'
import vaSlider from './slider'
import vaSpin from './spin'
import vaSwiper from './swiper'
import vaSidebar from './sidebar'
import { vaSteps } from './steps'
import { vaTabs } from './tabs'
import vaScroll from './scroll'
import vaSwitch from './switch'
import vaTable from './table'
import { VaTimeline, VaTimelineItem, VaTimelineNode } from './timeline'
import vaToast from './toast'
import vaTree from './tree'
import vaTooltip from './tooltip'
import vaUpload from './upload'

// import vaTemplate from './base/template'
import vaCollapse from './collapse'
import vaCollapseTransition from './transitions/collapse-transition.vue'
import vaMessage from './message/message.vue'

const components = {
  vaAlert,
  vaAutocomplete,
  vaAvatar,
  vaBackTop,
  vaBadge,
  vaBreadcrumb,
  VaButton,
  VaButtonGroup,
  vaCard,
  vaChart,
  vaChip,
  vaChipGroup,
  vaCheckbox,
  vaCollapse,
  vaCollapseTransition,
  // vaCollapseItem,
  // VaColorPicker,
  vaDatePicker,
  vaDropdown,
  vaEditor,
  VaForm,
  VaFormItem,
  // VaFullcalendar,
  vaIcon,
  vaRow,
  vaCol,
  vaInput,
  vaInputNumber,
  vaKnob,
  vaList,
  vaListItem,
  vaListItemText,
  vaListItemAction,
  vaMessage,
  vaModal,
  vaPagination,
  vaPanel,
  vaProgress,
  vaRadio,
  vaRate,
  vaRipple,
  vaScroll,
  vaSelect,
  vaSidebar,
  vaSlider,
  vaSpin,
  vaSteps,
  vaSwiper,
  // vaSwiperSlide,
  vaSwitch,
  vaTabs,
  // vaTabPane,
  vaTable,
  VaTimeline,
  VaTimelineItem,
  VaTimelineNode,
  // vaToast,
  vaTooltip,
  vaColorPicker,
  vaTree,
  vaUpload

  // vaTemplate
}

const filters = {}

const install = (app, options = {}) => {
  if (install.installed) return
  install.installed = true

  // 添加全局组件
  Object.keys(components).forEach((key) => {
    app.component(key, components[key])
  })

  // 添加全局过滤器
  Object.keys(filters).forEach((key) => {
    // Vue.filter('capitalize', function (value) {
    //     if (!value) return ''
    //     value = value.toString()
    //     return value.charAt(0).toUpperCase() + value.slice(1)
    // })
  })

  // 添加实例方法
  app.config.globalProperties.$toast = vaToast
  window.$toast = vaToast
  window.$notification = vaNotification
  window.$modal = vaModal
  //   app.prototype.$Notification = vaNotification
  //   app.prototype.$Modal = VaModal
}

// auto install
// if (typeof window !== "undefined" && window.Vue) {
//   install(window.Vue);
//   if (install.installed) {
//     install.installed = false;
//   }
// }

const Vary = {
  //   version: process.env.VERSION,
  install
  // ...components
}

export default Vary
