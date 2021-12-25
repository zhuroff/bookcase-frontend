<template lang="pug">

  .repeater__modal
    .repeater__modal-header
      .repeater__modal-search(v-if="!isCreateMode")
        BInput(
          type="text"
          v-model="searchQuery"
          size="is-small"
        )
        AppSprite(name="search")

      BButton(
        v-if="!isCreateMode"
        type="is-info"
        size="is-small"
        @click="createNewCategory"
      ) Create

      BButton(
        v-else
        type="is-info"
        size="is-small"
        @click="saveNewCategory"
      ) Save

    simplebar(data-simplebar-auto-hide="false")
      .repeater__modal-body(v-if="!isCreateMode")
        BTable(
          :data="data"
          :hoverable="true"
        )

          BTableColumn(
            field="title"
            label="Title"
            v-slot="props"
          )
            NuxtLink(
              :to="`/${propKey}/${props.row._id}`"
              class="repeater__modal-link"
              target="_blank"
            ) {{ props.row.title }}

          BTableColumn(
            label="Action"
            numeric
            v-slot="props"
          )
            BButton(
              type="is-default"
              size="is-small"
              @click="selectCategoryItem(props.row)"
            ) Select

        BPagination(
          v-if="(pagination.totalPages * perPage) > perPage"
          size="is-small"
          v-model="pagination.currentPage"
          :total="pagination.totalPages * perPage"
          :per-page="perPage"
          :range-before="2"
          :range-after="2"
          @change="switchPagination"
        )

      .repeater__modal-body(v-else)
        form.repeater__modal-form
          .repeater__modal-field(
            v-for="item in categoryForm"
            :key="item.key"
          )
            BInput(
              v-if="item.type !== 'file'"
              :type="item.type"
              :placeholder="item.label"
              v-model="item.value"
            )

            BUpload(
              v-else
              v-model="item.value"
            ) Фото

</template>

<script lang="ts">

import Vue from 'vue'
import { CategoryField, CategoryForm } from '../../types/Category'
import simplebar from 'simplebar-vue'
import AppSprite from '~/components/AppSprite.vue'

export default Vue.extend({
  name: 'AppRepeaterModal',

  components: {
    simplebar,
    AppSprite
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
      searchQuery: '',

      perPage: 20,

      isCreateMode: false,

      categoryForm: [] as unknown as CategoryField[],

      categoryFields: {
        authors: [
          {
            key: 'lastName',
            label: 'Last name',
            type: 'text',
            value: ''
          },

          {
            key: 'firstName',
            label: 'First name',
            type: 'text',
            value: ''
          },

          {
            key: 'patronymicName',
            label: 'Patronymic name',
            type: 'text',
            value: ''
          },

          // {
          //   key: 'picture',
          //   label: 'Picture',
          //   type: 'file',
          //   value: ''
          // }
        ],

        genres: [
          {
            key: 'title',
            label: 'Title',
            type: 'text',
            value: ''
          },

          // {
          //   key: 'picture',
          //   label: 'Picture',
          //   type: 'file',
          //   value: ''
          // }
        ],

        publishers: [
          {
            key: 'title',
            label: 'Title',
            type: 'text',
            value: ''
          },

          // {
          //   key: 'picture',
          //   label: 'Picture',
          //   type: 'file',
          //   value: ''
          // }
        ],

        series: [
          {
            key: 'title',
            label: 'Title',
            type: 'text',
            value: ''
          },

          // {
          //   key: 'picture',
          //   label: 'Picture',
          //   type: 'file',
          //   value: ''
          // }
        ]
      }
    }
  },

  methods: {
    selectCategoryItem(item: any) {
      const payload = {
        key: this.propKey,
        value: item
      }

      this.$emit('selectCategoryItem', payload)
    },

    createNewCategory() {
      this.isCreateMode = true
      this.categoryForm = (this.categoryFields as CategoryForm)[this.propKey]
    },

    saveNewCategory() {
      this.$emit('saveNewCategory', this.categoryForm)
    },

    switchPagination(value: number) {
      const payload = {
        key: this.propKey,
        value: value
      }

      this.$emit('switchPagination', payload)
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
      display: flex;
      justify-content: space-between;

      .button {
        font-family: $sans;
        letter-spacing: 0.5px;
      }
    }

    &-search {
      width: 35%;
      min-width: 200px;
      position: relative;

      .control {
        position: relative;
        z-index: 1;
      }

      .icon-search {
        position: absolute;
        top: 4px;
        right: 0;
        width: 20px;
        height: 20px;
        color: $lightGray;
      }
    }

    [data-simplebar] {
      height: calc(100% - 62px);
    }

    &-body {
      padding: 1rem;
    }

    &-link {
      color: $darkModeBody;
    }

    .pagination {
      padding: 1rem 0.75rem;
    }
  }
}

</style>
