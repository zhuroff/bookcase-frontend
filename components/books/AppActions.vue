<template lang="pug">
  
  .actions
    BButton(
      type="is-primary is-light"
      size="is-small"
      @click="createNewEntry"
    ) Add new

    BButton(
      type="is-primary is-light"
      size="is-small"
      tag="router-link"
      to="/books/drafts"
    ) Published

    BButton(
      type="is-primary is-light"
      size="is-small"
      tag="router-link"
      to="/books/drafts"
    ) Drafts

    BButton(
      type="is-primary is-light"
      size="is-small"
      tag="router-link"
      to="/books/drafts"
    ) Unlisted

    // Сортиорвка имя, дата

</template>

<script lang="ts">

import Vue from 'vue'

export default Vue.extend({
  name: 'AppActions',

  methods: {
    createNewEntry() {
      this.$emit('createNewEntry')
    }
  }
})

</script>