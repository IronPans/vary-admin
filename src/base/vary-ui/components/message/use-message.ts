import { inject } from 'vue'
import { messageInjectKey } from './config'

export default function useMessage() {
  const api = inject(messageInjectKey, null)
  console.log(api)

  return api
}
