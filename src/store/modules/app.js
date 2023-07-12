import { setItem, getItem } from '@/utils/storage'
import { LANG, TAGS_VIEW } from '@/constant'

export default {
  namespaced: true,
  state: () => ({
    sidebarOpened: true,
    // ||是或者的意思(前边不生效，则走后面)
    language: getItem(LANG) || 'zh',
    tagsViewList: getItem(TAGS_VIEW) || []

  }),
  mutations: {
    triggerSidebarOpened (state) {
      state.sidebarOpened = !state.sidebarOpened
    },
    setLanuage (state, lang) {
      state.language = lang
      setItem(LANG, lang)
    },
    addTagsViewList (state, tag) {
      // item是元素
      const isFind = state.tagsViewList.find(item => {
        return item.path === tag.path
      })
      // 处理重复
      /**
       * 删除 tag
       * @param {type: 'other'||'right'||'index', index: index} payload
       */
      if (!isFind) {
        state.tagsViewList.push(tag)
        setItem(TAGS_VIEW, state.tagsViewList)
      }
    },
    removeTagsView (state, payload) {
      if (payload.type === 'index') {
        // 删除任意数量的项，只需要传入两个参数即可。要删除的第一项的位置和要删除的项数
        state.tagsViewList.splice(payload.index, 1) // payload.index当前项
      } else if (payload.type === 'other') {
        state.tagsViewList.splice(payload.index + 1, state.tagsViewList.length - payload.index + 1)
        // 从0开始删除直到payload.index,但是不包含payload.index
        state.tagsViewList.splice(0, payload.index)
      } else if (payload.type === 'right') {
        state.tagsViewList.splice(payload.index + 1, state.tagsViewList.length - payload.index + 1)
      }
    }

  },
  actions: {}
}
