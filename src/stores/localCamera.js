import { defineStore, acceptHMRUpdate } from 'pinia'
async function apilocal() {
  if (!navigator?.mediaDevices?.enumerateDevices)
    return Promise.reject('not supported')
  // if(navigator.mediaDevices.getUserMedia)return Promise.reject('not supported')
  let devices = await navigator.mediaDevices.enumerateDevices()
  console.log(devices)
  let local = devices
    .filter((d) => d.kind === 'videoinput')
    .map((d) => {
      return {
        label: d.label,
        id: d.deviceId,
      }
    })
  return Promise.resolve(local)
}

export const useCameraStore = defineStore({
  id: 'localCamera',
  state: () => ({
    local: [],
    isAdmin: false,
  }),

  getters: {
    getLocal() {
      return this.local
    },
  },

  actions: {
    resetState() {
      this.$patch({
        local: [],
        isAdmin: false,
      })
    },

    async getState() {
      if (this.isAdmin) {
        return this.getLocal
      } else {
        const d = await apilocal()
        this.isAdmin = true
        this.$patch({
          local: d,
          isAdmin: true,
        })
        return d
      }
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCameraStore, import.meta.hot))
}
