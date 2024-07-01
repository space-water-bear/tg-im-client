import { defineStore } from 'pinia'

import type UserInfo from '@/model/UserInfo'

import { login, type LoginParams } from "@/apis/login"

interface AuthStore {
  // 鉴权令牌
  userInfo: UserInfo | null
  token: string
  expired: number
}
// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const useAuthStore = defineStore('authState', {
  // state: 返回对象的函数
  state: (): AuthStore => ({
    userInfo: null,
	  token: '',
    expired: 0
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
    }
  }
})