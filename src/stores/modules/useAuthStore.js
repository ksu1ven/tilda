import { defineStore } from 'pinia'
import CryptoJS from 'crypto-js'
import { setCookie } from '@/helpers/getSetCookie'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        emailError: '',
        passwordError: '',
        userEmail: 'oksanayakhimovich@gmail.com',
        userPassword:
            'U2FsdGVkX1/6NtgzWEowLcjfKWPpAKdMc4DjJkaRzFLxo/Wkzke1xPIgMbEFOrKorBEj1VEn6z4TjGDLgTmjcw==',
        secretKey: 'myaumyau'
    }),

    actions: {
        validateForm(email, password) {
            const regexpEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
            if (email === '') {
                this.emailError = 'Это обязательное поле'
            } else if (!email.match(regexpEmail)) {
                this.emailError = 'Введите e-mail в верном формате'
            } else if (email !== this.userEmail) {
                this.emailError = 'Email не найден в системе'
            } else {
                this.emailError = ''
            }

            if (password === '') {
                this.passwordError = 'Это обязательное поле'
            } else {
                let decriptedPassword = CryptoJS.AES.decrypt(this.userPassword, password).toString(
                    CryptoJS.enc.Utf8
                )
                if (!this.emailError && decriptedPassword !== password) {
                    this.passwordError = 'Вы ввели неверный пароль'
                } else {
                    this.passwordError = ''
                }
            }
        },
        generateToken() {
            const newToken = CryptoJS.AES.encrypt(
                Math.random().toString(),
                this.secretKey
            ).toString()
            const date = new Date()
            date.setTime(date.getTime() + 15 * 60 * 1000)
            const expires = date.toUTCString()
            setCookie('token', newToken, { secure: true, expires })
            setCookie('expires', expires, { secure: true })
        },

        removeToken() {
            setCookie('token', '', {
                'max-age': -1
            })
            setCookie('expires', '', {
                'max-age': -1
            })
        }
    }
})
