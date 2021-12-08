<template lang="pug">
  
  .actions
    BButton(
      type="is-primary is-light"
      size="is-small"
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