<template lang="pug">
  
  svg(
    v-if="name === 'paragraph'"
    viewBox="0 0 24 24"
    class="icon-tool"
  )
    path(
      fill="currentColor"
      d="M13,4A4,4 0 0,1 17,8A4,4 0 0,1 13,12H11V18H9V4H13M13,10A2,2 0 0,0 15,8A2,2 0 0,0 13,6H11V10H13Z"
    )

  svg(
    v-else-if="name === 'bold'"
    viewBox="0 0 24 24"
    class="icon-tool"
  )
    path(
      fill="currentColor"
      d="M13.5,15.5H10V12.5H13.5A1.5,1.5 0 0,1 15,14A1.5,1.5 0 0,1 13.5,15.5M10,6.5H13A1.5,1.5 0 0,1 14.5,8A1.5,1.5 0 0,1 13,9.5H10M15.6,10.79C16.57,10.11 17.25,9 17.25,8C17.25,5.74 15.5,4 13.25,4H7V18H14.04C16.14,18 17.75,16.3 17.75,14.21C17.75,12.69 16.89,11.39 15.6,10.79Z"
    )

  svg(
    v-else-if="name === 'italic'"
    viewBox="0 0 24 24"
    class="icon-tool"
  )
    path(
      fill="currentColor"
      d="M10,4V7H12.21L8.79,15H6V18H14V15H11.79L15.21,7H18V4H10Z"
    )
  
  svg(
    v-else-if="name === 'bullet'"
    viewBox="0 0 24 24"
    class="icon-tool"
  )
    path(
      fill="currentColor"
      d="M7,5H21V7H7V5M7,13V11H21V13H7M4,4.5A1.5,1.5 0 0,1 5.5,6A1.5,1.5 0 0,1 4,7.5A1.5,1.5 0 0,1 2.5,6A1.5,1.5 0 0,1 4,4.5M4,10.5A1.5,1.5 0 0,1 5.5,12A1.5,1.5 0 0,1 4,13.5A1.5,1.5 0 0,1 2.5,12A1.5,1.5 0 0,1 4,10.5M7,19V17H21V19H7M4,16.5A1.5,1.5 0 0,1 5.5,18A1.5,1.5 0 0,1 4,19.5A1.5,1.5 0 0,1 2.5,18A1.5,1.5 0 0,1 4,16.5Z"
    )

  svg(
    v-else-if="name === 'ordered'"
    viewBox="0 0 24 24"
    class="icon-tool"
  )
    path(
      fill="currentColor"
      d="M7,13V11H21V13H7M7,19V17H21V19H7M7,7V5H21V7H7M3,8V5H2V4H4V8H3M2,17V16H5V20H2V19H4V18.5H3V17.5H4V17H2M4.25,10A0.75,0.75 0 0,1 5,10.75C5,10.95 4.92,11.14 4.79,11.27L3.12,13H5V14H2V13.08L4,11H2V10H4.25Z"
    )

</template>

<script lang="ts">

import Vue from 'vue'

export default Vue.extend({
  props: {
    name: {
      type: String,
      required: true
    }
  }  
})

</script>
