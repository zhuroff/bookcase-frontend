export const messages = {
  error: 'Ошибка',
  success: 'Готово!',
  common: {
    authors: 'Авторы',
    genres: 'Жанры',
    lists: 'Списки',
    series: 'Серия',
    publishers: 'Издательства',
    emptySection: 'Нет данных',
    create: 'Создать',
    delete: 'Удалить',
    reset: 'Сбросить',
    edit: 'Редактировать',
    save: 'Сохранить',
    select: 'Выбрать',
    draftsOnly: 'Неопубликованные',
    cancel: 'Отмена',
    back: 'Назад',
    toDraft: 'В черновики',
    toPublish: 'Опубликовать',
    dateCreated: 'Дата создания',
    title: 'Название',
    unlistTitle: 'Вне списков',
    paperWithoutFile: 'Бумажные книги без файлов',
    withoutFile: 'Без файлов',
    confirmIntention: 'Подтвердите свое намерение',
    fileUpload: {
      image: 'Перетащите сюда изображение или кликните для выбора файла'
    }
  },
  search: {
    placeholder: 'Поиск',
    notFound: 'Ничего не найдено',
    modal: {
      header: 'Результаты поиска по запросу',
      books: 'Книги',
      genres: 'Жанры',
      series: 'Серии',
      authors: 'Авторы',
      lists: 'Списки',
      publishers: 'Издательства'
    }
  },
  routes: {
    dashboard: 'Главная',
    books: 'Книги',
    authors: 'Авторы',
    genres: 'Жанры'
  },
  dashboard: {
    readingBooks: 'Читаю сейчас',
    readBooks: 'Прочитано'
  },
  book: {
    pagesFull: 'Страниц',
    pagesReduced: 'стр.',
    placeholders: {
      title: 'Название',
      subtitle: 'Подзаголовок',
      startReading: 'Дата начала чтения',
      finishReading: 'Дата окончания чтения',
      fileLink: 'Ссылка на файл книги'
    },
    status: {
      result: 'Продолжительность чтения',
      years: ['год', 'года', 'лет'],
      months: ['месяц', 'месяца', 'месяцев'],
      days: ['день', 'дня', 'дней']
    },
    fileButton: 'Файл книги',
    successSaving: 'Книга успешно сохранена',
    successDeleted: 'Книга успешно удалена',
    selectSeries: 'Выбрать серию',
    withoutSeries: 'Без серии',
    params: {
      heading: 'Параметры издания',
      unnecessary: {
        title: 'Учитываемость',
        values: ['Не учтена', 'Учтена'],
        tooltip: 'Книга не учтена в коллекции',
        filterTitle: 'Только учтенные'
      }
    }
  },
  authors: {
    roles: {
      author: 'Автор',
      editor: 'Редактор',
      compiler: 'Составитель',
      interpreter: 'Переводчик'
    },
    rolesPlaceholder: 'Не выбрано',
    alreadyExist: 'Автор уже был добавлен'
  },
  publishers: {
    alreadyExist: 'Издатель уже был добавлен'
  },
  genres: {
    alreadyExist: 'Жанр уже был добавлен'
  },
  auth: {
    login: 'Войти',
    register: 'Зарегистрироваться',
    email: 'Email',
    password: 'Пароль'
  },
  user: {
    unexist: 'Пользователь не найден',
    exist: 'Пользователь с ткаим email уже существует',
    unauthorized: 'Вам необходимо авторизоваться'
  },
  paginator: {
    page: 'Страница',
    of: 'из'
  },
  languages: {
    ru: 'Русский',
    en: 'Английский'
  }
}
