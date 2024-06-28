import { Navigation, Pagination, A11y, EffectCoverflow } from 'swiper/modules'

export const swiperOptions = {
    modules: [Navigation, Pagination, EffectCoverflow, A11y],
    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 20
        },
        577: {
            slidesPerView: 2,
            spaceBetween: 40
        },
        992: {
            slidesPerView: 3,
            spaceBetween: 50
        }
    },
    spaceBetween: '50',
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
    effect: 'coverflow',
    coverflowEffect: {
        rotate: 40,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false
    }
}
