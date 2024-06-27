<template>
    <div class="preview-block-slider">
        <swiper
            :modules="modules"
            :breakpoints="{
                '320': {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                '577': {
                    slidesPerView: 2,
                    spaceBetween: 40
                },
                '992': {
                    slidesPerView: 3,
                    spaceBetween: 50
                }
            }"
            :space-between="50"
            :navigation="{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            }"
            :pagination="{
                el: '.swiper-pagination',
                clickable: true
            }"
            effect="coverflow"
            :coverflowEffect="{
                rotate: 40,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: false
            }"
        >
            <swiper-slide v-for="(image, index) in imageArr" :key="index">
                <div class="preview-block-slider__img-container">
                    <img :src="image" alt="Slide" class="background-img" />
                </div>
            </swiper-slide>
            <div class="swiper-controls">
                <div class="swiper-button-prev"></div>
                <div class="swiper-pagination"></div>
                <div class="swiper-button-next"></div>
            </div>
        </swiper>
    </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, A11y, EffectCoverflow } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'

export default {
    components: {
        Swiper,
        SwiperSlide
    },
    setup() {
        return {
            modules: [Navigation, Pagination, EffectCoverflow, A11y]
        }
    },
    props: {
        index: {
            type: Number,
            required: true
        },
        contenteditable: {
            type: Boolean,
            required: true
        },
        imageArr: {
            type: Array,
            required: true
        }
    }
}
</script>
