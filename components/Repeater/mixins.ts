import Vue from 'vue'
import AppSprite from '~/components/AppSprite.vue'
import AppRepeaterDelete from './AppRepeaterDelete.vue'

const RepeaterBasic = Vue.extend({
  components: {
    AppSprite,
    AppRepeaterDelete
  },

  props: {
    card: {
      type: Object,
      required: true
    },

    isDisabled: {
      type: Boolean,
      required: true
    },

    isDeletable: {
      type: Boolean,
      required: true
    },

    componentKey: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      handlerExcludes: ['dropdown', 'control', 'repeater__card-delete']
    }
  },

  methods: {
    clickCardHandler(event: any) {
      const pathClasses = new Set(event.composedPath()
        .flatMap((el: Element) => el.className?.split(' ')))

      const isExclude = [...pathClasses]
        .filter((el: any) => this.handlerExcludes.includes(el))
        .length > 0

      if (this.isDisabled || isExclude) {
        return false
      }

      const payload = {
        key: (this as any).componentKey,
        value: (this as any).id
      }

      this.$emit('repeaterCardClick', payload)
    },

    deleteCard() {
      const payload = {
        key: (this as any).componentKey,
        value: (this as any).id
      }

      this.$emit('deleteCard', payload)
    }
  }
})

export default RepeaterBasic
