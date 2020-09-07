import {StateExtends} from '../types/store'
import initState from './state'

const Store = (function () {
  let uid = 0
  let states = [initState()] as any[]

  function get(key: keyof StateExtends) {
    return states[uid][key]
  }

  function set(key: keyof StateExtends, data: unknown) {
    states[uid][key] = data
  }

  function removeNull(): void {
    states = states.filter(state => Object.keys(state).length > 0) //state滤除空对象
  }

  function changeUID(e: Event) {
    const el = e.target || e
    states = states.filter((s, idx) => Object.keys(s).length > 0)
    uid = states.findIndex(s => s.reference === el)
  }

  function closeAllButHasId() {
    states.forEach((s, idx) => {
      if (idx !== uid && s.popover) {
        s.visible = false
      }
    })
  }

  function openPopover(e: Event): void {
    changeUID(e)
    closeAllButHasId()
    if (states[uid].visible) return
    states[uid].visible = true
  }

  return {get, set, changeUID, openPopover}
})()

export const {get, set, changeUID, openPopover} = Store
