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

  svg(
    v-else-if="name === 'blockquote'"
    viewBox="0 0 24 24"
    class="icon-tool"
  )
    path(
      fill="currentColor"
      d="M14,17H17L19,13V7H13V13H16M6,17H9L11,13V7H5V13H8L6,17Z"
    )

  svg(
    v-else-if="name === 'image'"
    viewBox="0 0 24 24"
    class="icon-tool"
  )
    path(
      fill="currentColor"
      d="M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z"
    )

  svg(
    v-else-if="name === 'title-2'"
    viewBox="0 0 24 24"
    class="icon-tool"
  )
    path(
      fill="currentColor"
      d="M3,4H5V10H9V4H11V18H9V12H5V18H3V4M21,18H15A2,2 0 0,1 13,16C13,15.47 13.2,15 13.54,14.64L18.41,9.41C18.78,9.05 19,8.55 19,8A2,2 0 0,0 17,6A2,2 0 0,0 15,8H13A4,4 0 0,1 17,4A4,4 0 0,1 21,8C21,9.1 20.55,10.1 19.83,10.83L15,16H21V18Z"
    )

  svg(
    v-else-if="name === 'title-3'"
    viewBox="0 0 24 24"
    class="icon-tool"
  )
    path(
      fill="currentColor"
      d="M3,4H5V10H9V4H11V18H9V12H5V18H3V4M15,4H19A2,2 0 0,1 21,6V16A2,2 0 0,1 19,18H15A2,2 0 0,1 13,16V15H15V16H19V12H15V10H19V6H15V7H13V6A2,2 0 0,1 15,4Z"
    )

  svg(
    v-else-if="name === 'title-4'"
    viewBox="0 0 24 24"
    class="icon-tool"
  )
    path(
      fill="currentColor"
      d="M3,4H5V10H9V4H11V18H9V12H5V18H3V4M18,18V13H13V11L18,4H20V11H21V13H20V18H18M18,11V7.42L15.45,11H18Z"
    )

  svg(
    v-else-if="name === 'underline'"
    viewBox="0 0 24 24"
    class="icon-tool"
  )
    path(
      fill="currentColor"
      d="M5,21H19V19H5V21M12,17A6,6 0 0,0 18,11V3H15.5V11A3.5,3.5 0 0,1 12,14.5A3.5,3.5 0 0,1 8.5,11V3H6V11A6,6 0 0,0 12,17Z"
    )

  svg(
    v-else-if="name === 'strike'"
    viewBox="0 0 24 24"
    class="icon-tool"
  )
    path(
      fill="currentColor"
      d="M23,12V14H18.61C19.61,16.14 19.56,22 12.38,22C4.05,22.05 4.37,15.5 4.37,15.5L8.34,15.55C8.37,18.92 11.5,18.92 12.12,18.88C12.76,18.83 15.15,18.84 15.34,16.5C15.42,15.41 14.32,14.58 13.12,14H1V12H23M19.41,7.89L15.43,7.86C15.43,7.86 15.6,5.09 12.15,5.08C8.7,5.06 9,7.28 9,7.56C9.04,7.84 9.34,9.22 12,9.88H5.71C5.71,9.88 2.22,3.15 10.74,2C19.45,0.8 19.43,7.91 19.41,7.89Z" 
    )

  svg(
    v-else-if="name === 'link'"
    viewBox="0 0 24 24"
    class="icon-tool"
  )
    path(
      fill="currentColor"
      d="M3.9,12C3.9,10.29 5.29,8.9 7,8.9H11V7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H11V15.1H7C5.29,15.1 3.9,13.71 3.9,12M8,13H16V11H8V13M17,7H13V8.9H17C18.71,8.9 20.1,10.29 20.1,12C20.1,13.71 18.71,15.1 17,15.1H13V17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7Z"
    )

  svg(
    v-else-if="name === 'code'"
    viewBox="0 0 24 24"
    class="icon-tool"
  )
    path(
      fill="currentColor"
      d="M12.89,3L14.85,3.4L11.11,21L9.15,20.6L12.89,3M19.59,12L16,8.41V5.58L22.42,12L16,18.41V15.58L19.59,12M1.58,12L8,5.58V8.41L4.41,12L8,15.58V18.41L1.58,12Z"
    )

  svg(
    v-else-if="name === 'code-block'"
    viewBox="0 0 24 24"
    class="icon-tool"
  )
    path(
      fill="currentColor"
      d="M5,3H7V5H5V10A2,2 0 0,1 3,12A2,2 0 0,1 5,14V19H7V21H5C3.93,20.73 3,20.1 3,19V15A2,2 0 0,0 1,13H0V11H1A2,2 0 0,0 3,9V5A2,2 0 0,1 5,3M19,3A2,2 0 0,1 21,5V9A2,2 0 0,0 23,11H24V13H23A2,2 0 0,0 21,15V19A2,2 0 0,1 19,21H17V19H19V14A2,2 0 0,1 21,12A2,2 0 0,1 19,10V5H17V3H19M12,15A1,1 0 0,1 13,16A1,1 0 0,1 12,17A1,1 0 0,1 11,16A1,1 0 0,1 12,15M8,15A1,1 0 0,1 9,16A1,1 0 0,1 8,17A1,1 0 0,1 7,16A1,1 0 0,1 8,15M16,15A1,1 0 0,1 17,16A1,1 0 0,1 16,17A1,1 0 0,1 15,16A1,1 0 0,1 16,15Z"
    )

  svg(
    v-else-if="name === 'undo'"
    viewBox="0 0 24 24"
    class="icon-tool"
  )
    path(
      fill="currentColor"
      d="M20 13.5C20 17.09 17.09 20 13.5 20H6V18H13.5C16 18 18 16 18 13.5S16 9 13.5 9H7.83L10.91 12.09L9.5 13.5L4 8L9.5 2.5L10.92 3.91L7.83 7H13.5C17.09 7 20 9.91 20 13.5Z"
    )

  svg(
    v-else-if="name === 'redo'"
    viewBox="0 0 24 24"
    class="icon-tool"
  )
    path(
      fill="currentColor"
      d="M10.5 18H18V20H10.5C6.91 20 4 17.09 4 13.5S6.91 7 10.5 7H16.17L13.08 3.91L14.5 2.5L20 8L14.5 13.5L13.09 12.09L16.17 9H10.5C8 9 6 11 6 13.5S8 18 10.5 18Z"
    )

  svg(
    v-else-if="name === 'hr'"
    viewBox="0 0 24 24"
    class="icon-tool"
  )
    path(
      fill="currentColor"
      d="M19,13H5V11H19V13Z"
    )

  svg(
    v-else-if="name === 'print'"
    viewBox="0 0 24 24"
    class="icon-tool"
  )
    path(
      fill="currentColor"
      d="M18,3H6V7H18M19,12A1,1 0 0,1 18,11A1,1 0 0,1 19,10A1,1 0 0,1 20,11A1,1 0 0,1 19,12M16,19H8V14H16M19,8H5A3,3 0 0,0 2,11V17H6V21H18V17H22V11A3,3 0 0,0 19,8Z"
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
