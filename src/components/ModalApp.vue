<template>
    <Transition :name="transitionName">
        <section :class="modalClass ? modalClass : 'modal'" v-show="isModalShow" ref="modalRef">
            <button
                v-if="withCross"
                type="button"
                class="button-link button-link--icon modal__close"
                @click="hideModal(modalType)"
            >
                <svg role="img" aria-hidden="true" width="30" height="30">
                    <use xlink:href="#menu-icon-cross"></use>
                </svg>
            </button>
            <div class="modal-body" :class="contentClass"><slot></slot></div>
        </section>
    </Transition>
    <Transition>
        <div class="overlay" v-show="isModalShow" @click="hideModal(modalType)"></div
    ></Transition>
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
        },
        contentClass: {
            type: String
        },

        withCross: {
            type: Boolean
        },
        transitionName: {
            type: String
        }
    },
    methods: {
        ...mapActions(useModalsStore, ['hideModal'])
    }
}
</script>
