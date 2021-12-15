const authorRoles = {
  ru: {
    '': 'Не выбрано',
    'author': 'Автор',
    'editor': 'Редактор',
    'compiler': 'Составитель',
    'interpreter': 'Переводчик'
  }
}

const bookFormats = {
  ru: {
    'paperbook': 'Бумажная книга',
    'ebook': 'Электронная книга',
    'audiobook': 'Аудиокнига',
    'unavailable': 'Нет в коллекции'
  }
}

const coverTypes = {
  ru: {
    'hardcover': 'Твердый переплет',
    'paperback': 'Мягкий переплет',
    'ebook': 'Изначально электронная',
    'unknown': 'Неизвестно'
  }
}

const readingStatuses = {
  ru: {
    'to read': 'Прочитать',
    'reading': 'Читаю сейчас',
    'read': 'Прочитано'
  }
}

export {
  authorRoles,
  bookFormats,
  coverTypes,
  readingStatuses
}
