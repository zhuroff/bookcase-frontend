<template lang="pug">
  
  .card
    .card__datepickers
      BDatepicker(
        placeholder="Reading start"
        icon="calendar-today"
        position="is-top-right"
        editable
        v-model="startReading"
        :disabled="isDisabled"
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
        :min-date="new Date(status.start)"
        :max-date="finishMaxDate"
        :date-formatter="(date) => dateFormatter(date)"
        @input="readingDateHandler"
      )

    .card__status
      BTag(
        type="is-success"
        size="is-medium"
      ) {{ readingProcess }}

</template>

<script lang="ts">

import Vue from 'vue'
import { BookStatus } from '~/types/Book'
import { readingStatuses } from '~/configs/localize'

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

  mounted() {
    this.updateStatus(this.status)
  },

  watch: {
    status(newStatus: BookStatus) {
      this.updateStatus(newStatus)
    }
  },

  data() {
    return {
      startReading: this.status.start ? new Date(this.status.start) : null,

      finishReading: this.status.finish ? new Date(this.status.finish) : null,

      startMaxDate: new Date(),

      finishMaxDate: new Date(),

      readingProcess: readingStatuses.ru['to read']
    }
  },

  methods: {
    readingDateHandler() {
      const payload = {
        start: this.startReading,
        finish: this.finishReading
      }

      this.$emit('setBookStatus', payload)
    },

    updateStatus(status: BookStatus) {
      console.log(status)
      switch(status) {
        case (status.start && status.finish):
          this.readingProcess = readingStatuses.ru['read']
          break
        case (status.start && !status.finish):
          console.log('Here')
          this.readingProcess = readingStatuses.ru['reading']
          break
        case (!status.start && !status.finish):
          this.readingProcess = readingStatuses.ru['to read']
          break
        default:
          console.log('DEFAULT')
          this.$emit('setBookStatus', { start: null, finish: null })
      }
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
    margin-bottom: 1rem;
  }

  &__status {
    display: flex;
    flex-direction: column;
  }
}

</style>
