<template>
    <ModalApp
        :modalType
        :isModalShow="domainModal.isDomainModalShow"
        :withCross="true"
        contentClass="domain-modal"
    >
        <h2 class="domain-modal__h2">Новый домен</h2>
        <form class="modal__content" @submit.prevent="submitForm">
            <div class="domain-modal__error">{{ validationError }}</div>
            <label for="domain" class="visually-hidden">Домен</label>
            <input
                v-model="domain"
                class="domain-modal__input"
                type="text"
                name="domain"
                id="domain"
            />

            <button type="submit" class="button-link button-link--colored domain-modal__submit">
                Сохранить изменения
            </button>
        </form>
    </ModalApp>
</template>
<script>
import ModalApp from '../../ModalApp.vue'
import { useModalsStore } from '../../../stores'
import { mapState, mapActions } from 'pinia'

export default {
    components: { ModalApp },
    data() {
        return {
            projectId: +this.$route.params.id,
            modalType: 'domainModal',
            domain: '',
            validationError: ''
        }
    },
    computed: {
        ...mapState(useModalsStore, ['domainModal'])
    },

    methods: {
        ...mapActions(useModalsStore, ['hideModal']),
        validate() {
            const domainPattern = /^(?!:\/\/)([a-zA-Z0-9-_]{1,63}\.)+[a-zA-Z]{2,6}$/
            if (domainPattern.test(this.domain)) {
                this.validationError = ''
            } else {
                this.validationError = 'Неверный формат домена'
            }
        },

        submitForm() {
            this.validate()
            if (!this.validationError) {
                this.domain = ''
                this.hideModal('domainModal')
            }
        }
    }
}
</script>
