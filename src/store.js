import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useMainStore = defineStore({
    id: 'main',
    state: () => ({
        timers: useStorage('timers', [])
    }),
    getters: {
        getAllTimers() {
            return this.timers
        },
        timerEmpty() {
            return this.timers.length <= 0
        }
    },
    actions: {
        addTimer(timer) {
            this.timers.push(timer);
        },
        removeTimer(index) {
            // console.log(array.indexOf(timer))
            this.timers.splice(index, 1)
        }

    },
})