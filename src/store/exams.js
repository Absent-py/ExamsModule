import { defineStore } from 'pinia'

export const useExamsStore = defineStore( 'exams',{
    state: () => ({
        return: {
            exams: [],
        }
    })
})
