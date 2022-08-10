export const messages = {
  error: 'Ошибка',
  success: 'Готово!',
  common: {
    books: 'Книги',
    book: 'Книга',
    authors: 'Авторы',
    genres: 'Жанры',
    lists: 'Списки',
    series: 'Серия',
    publishers: 'Издательства',
    emptySection: 'Нет данных',
    comment: 'Комментарий',
    create: 'Создать',
    delete: 'Удалить',
    replace: 'Заменить',
    add: 'Добавить',
    reset: 'Сбросить',
    actions: 'Действия',
    edit: 'Редактировать',
    save: 'Сохранить',
    select: 'Выбрать',
    draftsOnly: 'Неопубликованные',
    cancel: 'Отмена',
    deleted: 'Удалено',
    back: 'Назад',
    toDraft: 'В черновики',
    toPublish: 'Опубликовать',
    dateCreated: 'Дата создания',
    title: 'Название',
    unlistTitle: 'Вне списков',
    paperWithoutFile: 'Бумажные книги без файлов',
    withoutFile: 'Без файлов',
    confirmIntention: 'Подтвердите свое намерение',
    yes: 'Да',
    no: 'Нет',
    fileUpload: {
      image: 'Перетащите сюда изображение или кликните для выбора файла'
    },
    links: {
      heading: 'Ссылки',
      title: 'Название ссылки',
      url: 'URL ссылки'
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
    genres: 'Жанры',
    publishers: 'Издательства',
    series: 'Серии',
    lists: 'Списки'
  },
  dashboard: {
    readingBooks: 'Читаю сейчас',
    readBooks: 'Прочитано'
  },
  page: {
    unchanged: 'Нет измененных данных для сохранения',
    restoreFromDraft: {
      heading: 'Черновик',
      message: 'Восстановить последний черновик?'
    }
  },
  book: {
    pagesFull: 'Страниц',
    pagesReduced: 'стр.',
    placeholders: {
      title: 'Название',
      subtitle: 'Подзаголовок',
      startReading: 'Дата начала чтения',
      finishReading: 'Дата окончания чтения',
      fileLink: 'Ссылка на файл книги',
      publisherCity: 'Город',
      publisherCode: 'ISBN или другой код'
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
      },
      publicationYear: 'Год издания',
      pages: 'Количество страниц',
      coverType: 'Тип обложки',
      coverTypes: {
        ebook: 'Электронная книга',
        hardcover: 'Твердый переплет',
        paperback: 'Мягкий переплет',
        audio: 'Аудио'
      },
      formatType: 'Формат в коллекции',
      formatTypes: {
        ebook: 'Электронная книга',
        paperbook: 'Бумажная книга',
        audiobook: 'Аудиокнига'
      }
    },
    annotation: 'Аннотация',
    contentsTable: 'Содержание',
    summary: 'Конспект',
    updateError: 'Ошибка при обновлении данных'
  },
  authors: {
    roles: {
      author: 'Автор',
      editor: 'Редактор',
      compiler: 'Составитель',
      interpreter: 'Переводчик'
    },
    rolesPlaceholder: 'Не выбрано',
    alreadyExist: 'Автор уже был добавлен',
    firstNamePlaceholder: 'Фамилия',
    lastNamePlaceholder: 'Имя',
    patronymicNamePlaceholder: 'Отчество',
    successSaving: 'Данные автора успешно сохранены'
  },
  publishers: {
    alreadyExist: 'Издатель уже был добавлен',
    successSaving: 'Данные издательства успешно сохранены'
  },
  genres: {
    alreadyExist: 'Жанр уже был добавлен',
    successSaving: 'Данные жанра успешно сохранены'
  },
  series: {
    successSaving: 'Данные серии успешно сохранены'
  },
  lists: {
    sublistPlaceholder: 'Выберите подсписок',
    alreadyExist: 'Этот список уже был добавлен'
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
