<template lang="pug">

  form(
    class="form-auth"
    @submit.prevent="formSubmit"
  )
    BInput(
      :type="field.type"
      v-for="(field, index) in fields"
      :key="field.label"
      :placeholder="field.label"
      v-model="formFields[index].value"
    )

    BField
      NuxtLink(
        :to="{ path: link.path }"
        class="link is_right"
      ) {{ link.text }}

      BButton(
        type="is-primary"
        native-type="submit"
        :label="submit"
      )

</template>

<script lang="ts">

import Vue from 'vue'
import { AuthFormFields, AuthFormPayload } from '~/types/Auth'

export default Vue.extend({
  props: {
    fields: {
      type: Array,
      required: true
    },

    link: {
      type: Object,
      required: true
    },

    submit: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      formFields: JSON.parse(JSON.stringify(this.fields))
    }
  },

  methods: {
    formSubmit() {
      const payload = this.formFields.reduce((acc: AuthFormFields, next: AuthFormPayload) => {
        acc[next.type] = next.value
        
        return acc
      }, {})

      this.$emit('formSubmit', payload)
    }
  }  
})

</script>

<style lang="scss" scoped>

.form-auth {
  padding: 25px 15px;
  width: 100vw;
  max-width: 350px;

  .control {
    margin-bottom: 15px;
  }

  .is_right {
    margin-right: auto;
    align-self: center;

    &:hover {
      color: #fff;
    }
  }
}

</style>
