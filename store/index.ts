import { ActionContext, Commit, Dispatch } from 'vuex'
import { TSort } from '~/types/Global'

interface GlobalState {
  error: any,
  headerHeading: string,
  isPostDraft: boolean,
  pageType: string
  sort: TSort,
  listFilter: boolean
}
  
export const state = (): GlobalState => ({
  error: null,
  headerHeading: '',
  isPostDraft: false,
  pageType: '',
  sort: { title: 1 },
  listFilter: false
})

export const actions = {
  nuxtServerInit ({ commit, dispatch }: ActionContext<Commit, Dispatch>) {
    dispatch('auth/autologin')
  }
}

export const mutations = {
  setPublishState: (state: GlobalState, value: boolean) => {
    state.isPostDraft = value
  },

  setPageType: (state: GlobalState, value: string) => {
    state.pageType = value
  },

  setSort: (state: GlobalState, payload: any) => {
    state.sort = {} as TSort
    (state.sort as any)[payload.key] = payload.dir
  },

  setListsFilter: (state: GlobalState, value: boolean) => {
    state.listFilter = value
  },

  setError: (state: GlobalState, error: any) => {
    state.error = error
  },

  clearError: (state: GlobalState) => {
    state.error = null
  }
}

export const getters = {
  isDraftState: (state: GlobalState): boolean => state.isPostDraft,
  pageType: (state: GlobalState): string => state.pageType,
  currentSort: (state: GlobalState): TSort => state.sort,
  listFilterState: (state: GlobalState): boolean => state.listFilter,
  error: (state: GlobalState): any => state.error
}