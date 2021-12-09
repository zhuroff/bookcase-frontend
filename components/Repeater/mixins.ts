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
      handlerExcludes: ['SELECT', 'INPUT', 'BUTTON']
    }
  },

  methods: {
    clickCardHandler(event: any) {
      if (
        (this as any).isDisabled
        || this.handlerExcludes.includes(event.target.tagName)
      ) return false

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
