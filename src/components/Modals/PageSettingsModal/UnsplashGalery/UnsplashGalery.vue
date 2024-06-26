<template>
    <form class="unsplash-galery" @submit.prevent="submitForm">
        <div class="unsplash-galery__form">
            <input v-model="iconInputValue" type="text" class="unsplash-galery__input" />
            <div class="file-upload">
                <button
                    type="button"
                    class="button-link button-link--colored"
                    @click="triggerFileInput"
                >
                    Загрузить
                </button>
                <input
                    type="file"
                    ref="fileInput"
                    style="display: none"
                    accept="image/*"
                    @change="handleFileChange"
                />
            </div>
        </div>
        <div class="flex-2-col">
            <ul class="unsplash-galery__results">
                <TransitionGroup>
                    <li v-for="image in imagesList" :key="image.id" class="unsplash-galery__li">
                        <button
                            type="button"
                            @click="selectImg(image.urls.small, image.alt_description)"
                        >
                            <img
                                class="background-img"
                                :src="image.urls.small"
                                :alt="image.alt_description"
                            />
                        </button></li
                ></TransitionGroup>
            </ul>
            <div v-if="selectedImg.src" class="unsplash-galery__selected">
                <div class="unsplash-galery__selected-img">
                    <img :src="selectedImg.src" :alt="selectedImg.alt" class="background-img" />
                </div>
                <div class="unsplash-galery__selected-buttons">
                    <button type="submit" class="button-link button-link--colored">Выбрать</button>
                    <button
                        type="reset"
                        class="button-link button-link--colored"
                        @click="resetSelectedImage"
                    >
                        Отмена
                    </button>
                </div>
            </div>
        </div>
    </form>
</template>

<script>
export default {
    emits: ['submit-form'],

    data() {
        return {
            iconInputValue: 'cat',
            imagesList: [],
            selectedImg: {
                src: '',
                alt: ''
            },
            intervalId: null,
            fileName: '',
            fileData: ''
        }
    },
    methods: {
        async searchImages() {
            const accessKey = 'xBr8RxbNeDcb-VyLOCa8tdvTvNIzShCOOTQvmAJShkM'
            const url = `https://api.unsplash.com/search/photos?query=${this.iconInputValue}&client_id=${accessKey}&per_page=10`

            try {
                const response = await fetch(url)
                const data = await response.json()
                this.imagesList = data.results
            } catch (err) {
                console.log(err)
            }
        },
        selectImg(src, alt) {
            this.selectedImg.src = src
            this.selectedImg.alt = alt
        },
        resetSelectedImage() {
            this.selectedImg.src = ''
            this.selectedImg.alt = ''
        },
        triggerFileInput() {
            this.$refs.fileInput.click()
        },
        handleFileChange(event) {
            const file = event.target.files[0]
            if (file) {
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader()
                    reader.onload = (e) => {
                        this.selectedImg.src = e.target.result
                        this.selectedImg.alt = file.name
                    }
                    reader.readAsDataURL(file)
                } else {
                    this.fileName = ''
                    this.fileData = ''
                }
            }
        },
        submitForm() {
            this.$emit('submit-form', this.selectedImg)
            this.resetSelectedImage()
        }
    },
    watch: {
        iconInputValue() {
            if (this.intervalId) clearTimeout(this.intervalId)
            this.intervalId = setTimeout(() => {
                this.searchImages(this.iconInputValue)
            }, 1000)
        }
    },
    mounted() {
        this.searchImages(this.iconInputValue)
    }
}
</script>
