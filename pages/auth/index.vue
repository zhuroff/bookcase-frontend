<template>
  <div>
    <h1 class="auth-title">Authorization</h1>
    <FormAuth
      :fields="formFields"
      :link="link"
      :submit="submitButton"
      @formSubmit="formSubmit"
    />
  </div>
</template>

<script lang="ts">

import Vue from 'vue'
import { AuthFormFields } from '~/types/Auth'
import FormAuth from '~/components/FormAuth.vue'

export default Vue.extend({
  layout: 'auth',

  components: {
    FormAuth
  },

  data() {
    return {
      formFields: [
        {
          type: 'email',
          value: '',
          label: 'Email'
        },

        {
          type: 'password',
          value: '',
          label: 'Password'
        }
      ],

      link: {
        path: '/auth/register',
        text: 'Register'
      },

      submitButton: 'Login'
    }
  },

  methods: {
    formSubmit(payload: AuthFormFields[]) {
      console.log(payload)
    }
  }
})

</script>
