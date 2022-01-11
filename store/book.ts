import { ActionContext, Commit, Dispatch } from 'vuex'
import { $axios } from '~/utils/api'
import {
  BookFieldPayloadEmit,
  EntireBook,
  BookState,
  BookAuthor,
  BookAuthorRole,
  EditionInfo,
  BookPublisher
} from '~/types/Book'
import nuxtConfig from '~/nuxt.config'

const summaryImagesUrlify = (summary: string): string => {
  if (!summary.includes('<img')) {
    return summary
  }
  
  const urlified = summary
    .replace(/\/uploads\//g, `${nuxtConfig.env?.baseUrl}/uploads/`)

  return urlified
}

export const state = (): BookState => ({
  book: {
    status: { start: null, finish: null }
  } as EntireBook
})

export const mutations = {
  commitBook: (state: BookState, data: EntireBook) => {
    if (data.summary) {
      data.summary = summaryImagesUrlify(data.summary)
    }

    if (!data.status) {
      data.status = state.book.status
    }

    state.book = data
  },

  storeNewBookContent: (state: BookState, data: BookFieldPayloadEmit) => {
    (state.book as any)[data.key] = data.value
  },

  updateCategories: (state: BookState, payload: BookFieldPayloadEmit) => {
    switch(payload.key) {
      case 'authors':
        state.book.authors.push({
          author: payload.value,
          role: ''
        })
        break
      case 'publishers':
        state.book.publishers.push({
          city: '',
          code: '',
          publisher: payload.value
        })
        break
      case 'series':
        state.book.series = payload.value
        break
      default:
        (state.book as any)[payload.key].push(payload.value)
    }
  },

  updateAuthorRole: (state: BookState, payload: BookAuthorRole) => {
    const targetAuthor = state.book.authors.find((el: BookAuthor) => el.author._id === payload.id)

    if (targetAuthor) {
      targetAuthor.role = payload.role
    }
  },

  updateEditionInfo: (state: BookState, payload: EditionInfo) => {
    const targetPublisher = state.book.publishers.find((el: BookPublisher) => el.publisher._id === payload.id)

    if (targetPublisher) {
      if (payload.code) {
        targetPublisher.code = payload.code
      } else {
        targetPublisher.city = payload.city
      }
    }
  },

  updateBookFormat: (state: BookState, value: string) => {
    state.book.format = value
  },

  updateCoverType: (state: BookState, value: string) => {
    state.book.coverType = value
  },

  updateBookPages: (state: BookState, value: number) => {
    state.book.pages = value
  },

  updateBookYear: (state: BookState, value: number) => {
    state.book.publicationYear = value
  },

  changePublishStatus: (state: BookState, value: boolean) => {
    state.book.isDraft = value
  },

  updateFileLink: (state: BookState, value: string) => {
    state.book.file = value
  },

  deleteCategoryItem: (state: BookState, payload: BookFieldPayloadEmit) => {
    const targetCategory = (state.book as any)[payload.key]
    let targetItemIndex

    switch(payload.key) {
      case 'authors':
        targetItemIndex = targetCategory.findIndex((el: any) => el.author._id === payload.value)
        break
      case 'publishers':
        targetItemIndex = targetCategory.findIndex((el: any) => el.publisher._id === payload.value)
        break
      case 'series':
        (state.book as any)[payload.key] = null
        return false
      default:
        targetItemIndex = targetCategory.findIndex((el: any) => el._id === payload.value)
    }

    if (targetItemIndex > -1) {
      targetCategory.splice(targetItemIndex, 1)
    }
  },

  clearfy: (state: BookState) => {
    state.book = { status: { start: null, finish: null } } as EntireBook
  }
}

export const actions = {
  async fetchBook({ commit }: ActionContext<Commit, Dispatch>, id: string) {
    try {
      const response = await $axios.get(`/api/books/${id}`)
      commit('commitBook', response.data)
    } catch (error) {
      console.error(error)
    }
  }
}

export const getters = {
  bookState: (state: BookState) => state.book
}
