import { defineStore } from 'pinia'

export const useBlocksStore = defineStore('blocks', {
    state: () => ({
        blocks: [
            {
                title: 'Tекстовые блоки',
                variants: [
                    {
                        type: 'block-text',
                        title: 'Блок с текстом',
                        textAlign: 'left',
                        alignTitle: 'Выравнивание текста по левому краю'
                    },
                    {
                        type: 'block-text',
                        title: 'Блок с текстом',
                        textAlign: 'center',
                        alignTitle: 'Выравнивание текста посередине'
                    },
                    {
                        type: 'block-header',
                        title: 'Заголовок',
                        textAlign: 'center',
                        alignTitle: 'Заголовок, подзагаловок и текст. Выравнивание посередине'
                    },
                    {
                        type: 'block-header',
                        title: 'Заголовок',
                        textAlign: 'left',
                        alignTitle: 'Заголовок, подзагаловок и текст. Выравнивание по левому краю'
                    }
                ]
            },
            {
                title: 'Обложки',
                variants: [
                    {
                        type: 'block-img-text',
                        title: 'Блок с текстом и фоновой картинкой',
                        textAlign: 'center',
                        alignTitle: 'Обложка, заголовок и описание. Выравнивание по центру'
                    }
                ]
            }
        ]
    })
})
