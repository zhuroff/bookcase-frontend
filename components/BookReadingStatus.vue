<template lang="pug">
  
  .card
    .card__datepickers(:class="[{ '--disabled' : isDisabled }]")
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
        :disabled="isDisabled || !status.start"
        :min-date="new Date(status.start)"
        :max-date="finishMaxDate"
        :date-formatter="(date) => dateFormatter(date)"
        @input="readingDateHandler"
      )

    .card__status
      BTag(
        :type="statusTag"
        size="is-medium"
      )
        span.card__status-text {{ readingProcess }}
        span.card__status-time(v-if="status.start") {{ readingTime }}

      Component(
        v-if="status.start && status.finish"
        :is="StarRating"
        :show-rating="false"
        :star-size="25"
        :padding="2"
        v-model="ratingValue"
        inactive-color="#646464"
        active-color="#f7d064"
        @rating-selected="setRatingValue(ratingValue)"
      )

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

    rating: {
      type: Number,
      required: false,
      default: 0
    },

    isDisabled: {
      type: Boolean,
      required: true
    }
  },

  mounted() {
    this.updateReadingProcess(this.status)
    this.updateStatus(this.status)
  },

  computed: {
    statusTag() {
      if (this.status.start && this.status.finish) {
        return 'is-success'
      } else if (this.status.start && !this.status.finish) {
        return 'is-warning'
      } else {
        return 'is-default'
      }
    },

    readingTime() {
      const start = new Date(this.status.start)
      const finish = this.status.finish
        ? new Date(this.status.finish)
        : new Date();

      return (this as any).dateDifference(finish.getTime() - start.getTime())
    }
  },

  watch: {
    status(newStatus: BookStatus) {
      this.updateReadingProcess(newStatus)
      this.updateStatus(newStatus)
    }
  },

  data() {
    return {
      startReading: null,

      finishReading: null,

      startMaxDate: new Date(),

      finishMaxDate: new Date(),

      readingProcess: readingStatuses.ru['to read'],

      ratingValue: this.rating,

      StarRating: () => import('vue-star-rating/src/star-rating.vue').then(x => x.default)
    }
  },

  methods: {
    readingDateHandler() {
      if (!this.startReading && this.finishReading) {
        this.finishReading = null
      }

      if (!this.finishReading) {
        this.setRatingValue(0)
      }

      const payload = {
        start: this.startReading,
        finish: this.finishReading
      }

      this.$emit('setBookStatus', payload)
    },

    updateStatus(status: BookStatus) {
      this.startReading = status.start ? new Date(status.start) : null
      this.finishReading = status.finish ? new Date(status.finish) : null
    },

    updateReadingProcess(status: BookStatus) {
      if (status.start && status.finish) {
        this.readingProcess = readingStatuses.ru['read']
      } else if (status.start && !status.finish) {
        this.readingProcess = readingStatuses.ru['reading']
      } else {
        this.readingProcess = readingStatuses.ru['to read']
      }
    },

    dateFormatter(date: Date) {
      return new Intl.DateTimeFormat('ru-RU', { timeZone: 'UTC' }).format(date)
    },

    setRatingValue(rating: number) {
      this.ratingValue = rating
      this.$emit('setBookRating', rating)
    },

    dateDifference (ms: number) {
      const years = Math.floor(ms / (1000 * 60 * 60 * 24 * 30 * 12))
      const months = Math.floor(ms / (1000 * 60 * 60 * 24 * 30) % 12)
      const days = Math.floor(ms / (1000 * 60 * 60 * 24) % 30)

      return this.dateDeclension(years, months, days)
    },

    dateDeclension(years: number, months: number, days: number) {
      const yearsStr = this.declension(years, ['год', 'года', 'лет'])
      const monthsStr = this.declension(months, ['месяц', 'месяца', 'месяцев'])
      const daysStr = this.declension(days, ['день', 'дня', 'дней'])

      return `${yearsStr} ${monthsStr} ${daysStr}`.trim()
    },

    declension(param: number, results: string[]) {
      if (param <= 0) return ''

      const cases = [2, 0, 1, 1, 1, 2]
      const index = (param % 100 > 4 && param % 100 < 20) ? 2 : cases[(param % 10 < 5) ? param % 10 : 5]
      const result = results[index]
      
      return `${param} ${result}`
    }
  }
})

</script>

<style lang="scss" scoped>

@import '~/scss/variables';

.card {
  background-color: transparent;
  box-shadow: none;
  margin: 1rem 0;

  &__datepickers {
    display: flex;
    margin-bottom: 1rem;
    border-bottom: 1px solid transparent;

    &:not(.--disabled) {
      border-bottom-color: $lightDark;
    }
  }

  &__status {
    display: flex;
    flex-direction: column;

    .tag {
      height: auto;
      padding: 0.5rem 1rem;
      white-space: normal;
      text-align: center;
    }

    &-text {
      display: block;
      font-size: 1.25rem;
    }

    &-time {
      font-size: 0.875rem;
    }
  }

  .vue-star-rating {
    justify-content: center;
    margin-top: 1rem;
  }
}

</style>
