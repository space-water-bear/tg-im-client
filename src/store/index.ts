import { defineStore } from 'pinia'

import type UserInfo from '@/model/UserInfo'

import { login, type LoginParams } from "@/apis/login"

// import { inflateMessage } from "@/utils/msg"

interface AuthStore {
  // 鉴权令牌
  userInfo: UserInfo | null
  token: string
  expired: number,
  sse: EventSource | null
}
// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const useAuthStore = defineStore('authState', {
  // state: 返回对象的函数
  state: (): AuthStore => ({
    userInfo: null,
	  token: '',
    expired: 0,
    sse: null as EventSource | null
  }),
  getters: {},
  actions: {
    async login(sourceData: LoginParams) {
      try {
        const { code, msg, data } = await login(sourceData)
        if (code === 0) {
          this.userInfo = data.userInfo

          this.token = data.token
          this.expired = data.expired
          this.initSSE()
          return true
        } else {
          console.log("登陆失败: " + msg)
          return Promise.reject(msg)
        }
      } catch (e) {
        console.log(e)
        return Promise.reject(e)
      }
      
    },
    logout() {
      this.userInfo = null
      this.token = ''
      this.expired = 0
      this.destroySSE()
    },
    initSSE() {
      if(!this.sse && this.token) {
        this.sse = new EventSource(`${import.meta.env.VITE_BASEURL}/sse?token=${this.token}`)

        this.sse.addEventListener('message', (event) => {
          console.log('sse message', event.data)
        })

        this.sse.addEventListener('error', (event) => {
          console.log('sse error', event)
        })
      }

    },
    destroySSE() {
      if(this.sse !== null) {
        console.log(this.sse)
        this.sse.close()
        this.sse = null
      }
    }
  }
})