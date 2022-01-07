<template lang="pug">

div.list
  form
    BInput(
      v-model="list.title"
    )

    fieldset(
      v-for="item in list.lists"
      :key="item._id"
    )
      legend(style="font-size: 2rem; margin: 2rem 0; color: #ffff;") {{ item.title }}
      ul
        li(
          v-for="content in item.contents"
          :key="content._id"
        )
          span {{ content.book ? content.book.title : '' }}
          i {{ content.book ? content.book.subtitle : '' }}
          BInput(
            v-model="content.comment"
          )
      BButton(
        @click="addNewItem(item._id)"
      )
  
</template>

<script lang="ts">

import Vue from 'vue'

export default Vue.extend({
  name: 'SingleListPage',

  async fetch() {
    await this.fetchList()
  },

  data() {
    return {
      list: {}
    }
  },

  methods: {
    async fetchList() {
      try {
        const response = await this.$axios.get(`/api/lists/${this.$route.params.id}`)
        this.list = response.data
      } catch (error) {
        console.error(error)
      }
    },

    addNewItem(id: string) {
      const targetList = this.list.lists.find((el: any) => {
        if (el._id === id) return el
      })

      if (targetList) {
        console.log(targetList)
      }
    }
  }
})

</script>
