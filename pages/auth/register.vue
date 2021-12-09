<template>
  <div>
    <div class="auth-header">BookCase</div>
    <h1 class="auth-title">Register</h1>
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
        },

        {
          type: 'password',
          value: '',
          label: 'Confirm password'
        }
      ],

      link: {
        path: '/auth',
        text: 'Login'
      },

      submitButton: 'Register'
    }
  },

  methods: {
    async formSubmit(payload: AuthFormFields[]) {
        try {
          const response = await this.$store.dispatch('auth/create', payload)
          
          if (response.status === 201) {
            this.$router.push({ path: '/auth/login' })
          }
          // this.$message.success('User successfully created')
        } catch (error) {
          console.log(error)
        }
      }
  }
})

</script>
