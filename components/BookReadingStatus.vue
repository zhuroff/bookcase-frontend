<template lang="pug">
  
  .card
    .card__datepickers
      BDatepicker(
        placeholder="Reading start"
        icon="calendar-today"
        position="is-top-right"
        v-model="startReading"
        :disabled="isDisabled"
        :editable="false"
        :max-date="startMaxDate"
        :date-formatter="(date) => dateFormatter(date)"
        @input="readingDateHandler"
      )

      BDatepicker(
        placeholder="Reading end"
        icon="calendar-today"
        position="is-top-right"
        editable
        v-model="finishReading"
        :disabled="isDisabled"
        :editable="false"
        :min-date="new Date(status.start)"
        :max-date="finishMaxDate"
        :date-formatter="(date) => dateFormatter(date)"
        @input="readingDateHandler"
      )

</template>

<script lang="ts">

import Vue from 'vue'
import { BookStatus } from '~/types/Book'

export default Vue.extend({
  props: {
    status: {
      type: Object,
      required: true
    },

    isDisabled: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      statusData: { ...this.status } as BookStatus,

      startReading: this.status.start ? new Date(this.status.start) : '',

      finishReading: this.status.finish ? new Date(this.status.finish) : '',

      startMaxDate: new Date(),

      finishMaxDate: new Date()
    }
  },

  methods: {
    readingDateHandler() {
      const start = this.statusData.start
      const end = this.statusData.finish

      console.log(start, end)

      // if (start && end) {
      //   this.statusData.readingProcess = 'Прочитано'
      // } else if (start && !end) {
      //   this.statusData.readingProcess = 'Читаю сейчас'
      // } else {
      //   this.statusData.readingProcess = 'Прочитать'
      //   this.resetEndAndRate()
      // }

      // this.$root.$emit('set-book-status', this.statusData)
    },

    dateFormatter(date: Date) {
      return new Intl.DateTimeFormat('ru-RU', { timeZone: 'UTC' }).format(date)
    }
  }
})

</script>

<style lang="scss" scoped>

.card {
  background-color: transparent;
  box-shadow: none;
  margin: 1rem 0;

  &__datepickers {
    display: flex;
  }
}

</style>
