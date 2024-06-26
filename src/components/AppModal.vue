<template>
    <section class="modal" :class="modalClass" v-show="isModalShow">
        <button class="button-link button-link--icon modal__close" @click="hideModal(modalType)">
            <svg role="img" aria-hidden="true" width="30" height="30">
                <use xlink:href="#menu-icon-cross"></use>
            </svg>
        </button>
        <div class="modal-body"><slot></slot></div>
    </section>
    <div class="overlay" v-show="isModalShow" @click="hideModal(modalType)"></div>
</template>

<script>
import { useModalsStore } from '../stores'
import { mapActions } from 'pinia'

export default {
    props: {
        isModalShow: {
            type: Boolean,
            required: true
        },
        modalType: {
            type: String,
            required: true
        },
        modalClass: {
            type: String
        }
    },
    methods: {
        ...mapActions(useModalsStore, ['hideModal'])
    }
}
</script>
