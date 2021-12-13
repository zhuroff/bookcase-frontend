<template lang="pug">
  
  button(
    type="button"
    class="repeater__card-delete"
    @click="$emit('deleteCard')"
  )
    AppSprite(name="close")

</template>

<script lang="ts">

import Vue from 'vue'
import AppSprite from '~/components/AppSprite.vue'

export default Vue.extend({
  components: {
    AppSprite
  }
})

</script>

<style lang="scss" scoped>

@import '~/scss/variables';

.repeater__card-delete {
  position: absolute;
  top: 0;
  right: 0;
  width: 25px;
  height: 25px;
  cursor: pointer;
  border: 0;
  padding: 0;
  background-color: transparent;

  .icon-close {
    width: 12px;
    height: 12px;
    fill: $darkModeBody;
    stroke: $darkModeBody;
    pointer-events: none;
  }
}

</style>
