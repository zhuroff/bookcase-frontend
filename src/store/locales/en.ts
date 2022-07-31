export const messages = {
  error: 'Error',
  success: 'Success',
  common: {
    books: 'Books',
    book: 'Book',
    authors: 'Authors',
    genres: 'Genres',
    lists: 'Lists',
    series: 'Series',
    publishers: 'Publishers',
    emptySection: 'There is no data',
    comment: 'Comment',
    create: 'Create',
    delete: 'Delete',
    reset: 'Reset',
    edit: 'Edit',
    save: 'Save',
    select: 'Select',
    draftsOnly: 'Drafts',
    cancel: 'Cancel',
    deleted: 'Deleted',
    back: 'Back',
    toDraft: 'To draft',
    toPublish: 'To publish',
    dateCreated: 'Date created',
    title: 'Title',
    unlistTitle: 'Off the lists',
    paperWithoutFile: 'Paperbooks without files',
    withoutFile: 'Without file',
    confirmIntention: 'Confirm your intention',
    fileUpload: {
      image: 'Drop image here or click to upload'
    },
    links: {
      heading: 'Links',
      title: 'Link title',
      url: 'Link URL'
    }
  },
  search: {
    placeholder: 'Search',
    notFound: 'Nothing was not found',
    modal: {
      header: 'Search results for',
      books: 'Books',
      genres: 'Genres',
      series: 'Series',
      authors: 'Authors',
      lists: 'Lists',
      publishers: 'Publishers'
    }
  },
  routes: {
    dashboard: 'Dashboard',
    books: 'Books',
    authors: 'Authors',
    genres: 'Genres',
    publishers: 'Publishers',
    series: 'Series',
    lists: 'Lists'
  },
  dashboard: {
    readingBooks: 'Read now',
    readBooks: 'Read completely'
  },
  page: {
    unchanged: 'No modified data to save'
  },
  book: {
    pagesFull: 'Pages',
    pagesReduced: 'p.',
    placeholders: {
      title: 'Book title',
      subtitle: 'Book subtitle',
      startReading: 'Start date of reading',
      finishReading: 'End date of reading',
      fileLink: 'Book file link',
      publisherCity: 'Publisher city',
      publisherCode: 'ISBN or other code'
    },
    status: {
      result: 'Duration of reading',
      years: ['year', 'years', 'years'],
      months: ['month', 'months', 'months'],
      days: ['day', 'days', 'days']
    },
    fileButton: 'Book file',
    successSaving: 'Book was saved successfully',
    successDeleted: 'Book was deleted successfully',
    selectSeries: 'Select series',
    withoutSeries: 'Without series',
    params: {
      heading: 'Edition parameters',
      unnecessary: {
        title: 'Accountability',
        values: ['Not accounted', 'Accounted'],
        tooltip: 'The book is not included in the collection',
        filterTitle: 'Only accounted'
      },
      publicationYear: 'Publication year',
      pages: 'Number of pages',
      coverType: 'Cover type',
      coverTypes: {
        ebook: 'Ebook',
        hardcover: 'Hardcover',
        paperback: 'Paperback',
        audio: 'Audio'
      },
      formatType: 'Format in collection',
      formatTypes: {
        ebook: 'Ebook',
        paperbook: 'Paper book',
        audiobook: 'Audio book'
      }
    },
    annotation: 'Annotation',
    contentsTable: 'Table of contents',
    summary: 'Summary',
    updateError: 'Error updating data'
  },
  authors: {
    roles: {
      author: 'Author',
      editor: 'Editor',
      compiler: 'Compiler',
      interpreter: 'Interpreter'
    },
    rolesPlaceholder: 'Not selected',
    alreadyExist: 'The author has already been added',
    firstNamePlaceholder: 'First name',
    lastNamePlaceholder: 'Last Name',
    patronymicNamePlaceholder: 'Patronymic name',
    successSaving: 'The author\'s data has been successfully saved'
  },
  publishers: {
    alreadyExist: 'The publisher has already been added',
    successSaving: 'The publisher\'s data has been successfully saved'
  },
  genres: {
    alreadyExist: 'The genre has already been added',
    successSaving: 'The genre\'s data has been successfully saved'
  },
  series: {
    successSaving: 'The series data has been successfully saved'
  },
  lists: {
    sublistPlaceholder: 'Choose sublist',
    alreadyExist: 'This list already has been added'
  },
  auth: {
    login: 'Login',
    register: 'Register',
    email: 'Email',
    password: 'Password'
  },
  user: {
    unexist: 'User not found',
    exist: 'User already exist',
    unauthorized: 'You need to log in'
  },
  paginator: {
    page: 'Page',
    of: 'of'
  },
  languages: {
    ru: 'Russian',
    en: 'English'
  }
}
