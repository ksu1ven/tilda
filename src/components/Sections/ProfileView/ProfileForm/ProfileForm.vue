<template>
    <form action="" class="profile-form" @submit.prevent="submitForm">
        <svg role="img" aria-hidden="true" width="60" height="60" class="profile-form__logo">
            <use xlink:href="#logo-icon"></use>
        </svg>
        <label for="email" class="visually-hidden">Email</label>
        <input
            v-model="email"
            type="text"
            id="email"
            name="email"
            class="profile-form__input"
            placeholder="Эл. почта"
        />
        <div class="profile-form__error">{{ emailError }}</div>
        <label for="password" class="visually-hidden">Пароль</label>
        <input
            v-model="password"
            type="password"
            id="password"
            name="password"
            class="profile-form__input"
            placeholder="Пароль"
        />
        <div class="profile-form__error">{{ passwordError }}</div>
        <button type="submit" class="button-link profile-form__submit">Войти</button>
        <div class="profile-form__buttons">
            <a href="javascript:void(0)" class="button-link profile-form__btn"
                >Зарегистрироваться</a
            >
            <button type="button" class="button-link profile-form__btn">Забыли пароль</button>
        </div>
    </form>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useAuthStore } from '../../../../stores'
export default {
    data() {
        return {
            email: '',
            password: ''
        }
    },
    computed: {
        ...mapState(useAuthStore, ['emailError', 'passwordError'])
    },
    methods: {
        ...mapActions(useAuthStore, ['validateForm', 'generateToken']),

        submitForm() {
            this.validateForm(this.email, this.password)
            if (!this.emailError && !this.passwordError) {
                this.generateToken()
                this.$router.push({ path: '/' })
            }
        }
    }
}
</script>
