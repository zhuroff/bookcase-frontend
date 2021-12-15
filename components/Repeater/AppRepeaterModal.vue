<template lang="pug">

  .repeater__modal
    .repeater__modal-header
      BInput(
        type="text"
        v-model="searchQuery"
        placeholder="Search"
        size="is-small"
      )

    simplebar(data-simplebar-auto-hide="false")
      .repeater__modal-body
        BTable(
          :data="data"
          :hoverable="true"
        )

          BTableColumn(
            field="title"
            label="Title"
            v-slot="props"
          ) {{ props.row.title }}

          BTableColumn(
            label="Action"
            numeric
          )
            BButton(
              type="is-default"
              size="is-small"

            ) Select

</template>

<script lang="ts">

import Vue from 'vue'
import simplebar from 'simplebar-vue'

export default Vue.extend({
  name: 'AppRepeaterModal',

  components: {
    simplebar
  },

  props: {
    propKey: {
      type: String,
      required: true
    },

    data: {
      type: Array,
      required: true
    },

    pagination: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      searchQuery: ''
    }
  }
})

</script>

<style lang="scss" scoped>

@import '~/scss/variables';

.repeater {

  &__modal {
    background-color: $middleDark;
    border-radius: 0.25rem;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height: 100%;

    &-header {
      box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
      background-color: $middleDark;
      padding: 1rem;
      position: sticky;
      z-index: 1000;
      top: 0;

      .control {
        width: 50%;
        min-width: 150px;
      }
    }

    [data-simplebar] {
      height: calc(100% - 62px);
    }

    &-body {
      padding: 1rem;
    }
  }
}

</style>
