import vaMessage from './message.vue'
import { createApp } from 'vue'

let taskQueue: any = []
let messageInstance = null
export default class Message {
  static create(props = {}) {
    // const messageInstance = new Vue({
    //   render(h) {
    //     return h(vaMessage, {
    //       props
    //     })
    //   }
    // })
    if (!messageInstance) {
      const app = createApp(vaMessage, {
        ...props,
        forRef(message) {
          messageInstance = message
          Message.create()
        }
      })

      const root = document.createElement('div')
      root.id = 'va-messages'
      document.body.appendChild(root)
      app.mount('#va-messages')
    }

    if (messageInstance) {
      taskQueue.forEach((task: any) => {
        const { type, params } = task
        switch (type) {
          case 'create':
            messageInstance.add?.(params)
            break
          case 'remove':
            messageInstance.remove?.(params.key)
            break
          default:
        }
      })
      taskQueue = []
    }

    return {
      create(props) {
        if (messageInstance) {
          return messageInstance.add?.(props)
        } else {
          taskQueue.push({
            type: 'create',
            params: props
          })
        }
        // return messageInstance.add(props)
      },
      remove(key) {
        // messageInstance.remove(key)
        if (messageInstance) {
          messageInstance.remove?.(key)
        } else {
          taskQueue.push({
            type: 'remove',
            key
          })
        }
      },
      clearAll() {}
      //   component: message
    }
  }
}
