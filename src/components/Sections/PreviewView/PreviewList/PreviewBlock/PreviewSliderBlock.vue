<template>
    <div class="preview-block-slider">
        <swiper v-bind="swiperOptions">
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
import { swiperOptions } from '@/data/swiperOptions'
import { Swiper, SwiperSlide } from 'swiper/vue'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'

export default {
    components: {
        Swiper,
        SwiperSlide
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
    },
    data() {
        return {
            swiperOptions
        }
    }
}
</script>
