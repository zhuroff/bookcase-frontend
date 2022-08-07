import { observer } from 'mobx-react-lite';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';
import { useEffect, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import { useLocale } from '../../hooks/useLocale';
import { usePageConfig } from '../../hooks/usePageConfig';
import { useSearch } from '../../hooks/useSearch';
import { TCategoriesResponse, TCategoryBasic } from '../../types/Categories';
import { TPaginatorResponse } from '../../types/Common';
import { CategoryForm } from '../CategoryView/CategoryForm';
import { ModalCategoryList } from '../ModalCategoryList/ModalCategoryList';
import { ModalHeader } from '../ModalHeader/ModalHeader';

type TSeriesFieldProps = {
  isEditable: boolean
  content?: TCategoryBasic
  selectSeries: (value: TCategoryBasic) => void
  deleteOrRestoreSeries: () => void
}

export const SeriesField = observer(({
  isEditable,
  content,
  selectSeries,
  deleteOrRestoreSeries
}: TSeriesFieldProps) => {
  const { text } = useLocale()
  const { post } = useApi()
  const [pageConfig, setPageConfig] = usePageConfig({ pageKey: 'series', isModal: true })
  const [searchQuery, setSearchQuery, searchResults, setSearchResults] = useSearch<TCategoryBasic[]>({ collection: 'series' })
  const [pagePagination, setPagePagination] = useState<TPaginatorResponse | null>(null)
  const [series, setSeries] = useState<TCategoryBasic[]>([])
  const [creatingMode, setCreatingMode] = useState(false)
  const [seriesForm, fillSeriesForm] = useReducer(
    (category: TCategoryBasic, payload: Partial<TCategoryBasic>) => ({ ...category, ...payload }),
    { isDraft: false } as TCategoryBasic
  )

  const fetchSeries = () => {
    post<TCategoriesResponse>('/api/series', pageConfig)
      .then((response) => {
        setSeries(response.data.docs)
        setPagePagination(response.data.pagination)
      })
      .catch((error) => console.dir(error))
  }

  const createNewSeries = () => {
    console.log(seriesForm)
  }

  useEffect(() => {
    if (searchResults?.length) {
      setSeries(searchResults)
    }
  }, [searchResults])

  useEffect(() => {
    if (series.length > 0 && !searchQuery.length) {
      fetchSeries()
    }
  }, [pageConfig])

  useEffect(() => {
    if (series.length === 0) {
      setSearchQuery('')
      setSearchResults(null)

      if (pageConfig) {
        setPageConfig({ ...pageConfig, page: 0 })
      }
    }
  }, [series])

  useEffect(() => {
    if (!searchQuery.length && series.length) {
      fetchSeries()
    }
  }, [searchQuery])

  return (
    <>
      {!isEditable ?
        content ?
          <Link
            to={`/series/${content._id}`}
            className="card__link"
          >
            <Card>
              <span className="card__link-primary">{text('common.series')}</span>
              <em className="card__link-secondary">{content.title}</em>
            </Card>
          </Link> :
          <Card>
            <span className="card__link-primary">{text('common.series')}</span>
            <em className="card__link-secondary">{text('book.withoutSeries')}</em>
          </Card> :
        <>
          <Card className={content?.isDeleted ? '--deleted' : ''}>
            <span className="card__link-primary">{text('common.series')}</span>
            {content?.isDeleted &&
              <Button
                icon="pi pi-undo"
                className="p-button-rounded p-button-warning --undo"
                onClick={deleteOrRestoreSeries}
              />
            }

            {content &&
              <Button
                icon="pi pi-times"
                className="p-button-rounded p-button-secondary --delete"
                onClick={deleteOrRestoreSeries}
              />
            }

            <Button
              label={content?.title || text('book.selectSeries')}
              onClick={() => fetchSeries()}
              className="p-button-outlined"
            />
          </Card>
        </>
      }

      <Dialog
        header={!creatingMode && <ModalHeader
          searchName="modalSearch"
          searchQuery={searchQuery}
          isCreatable={true}
          pagePagination={pagePagination}
          setSearchQuery={(value) => setSearchQuery(value)}
          createEntity={() => setCreatingMode(true)}
          switchPagination={(page) => {
            if (pageConfig) {
              setPageConfig({ ...pageConfig, page })
            }
          }}
        />}
        visible={series.length > 0}
        draggable={false}
        style={{ width: '50vw' }}
        onHide={() => setSeries([])}
      >
        {!creatingMode ?
          <ModalCategoryList<TCategoryBasic>
            entities={series}
            heading={text('common.series')}
            slug="series"
            selectEntity={(series) => selectSeries(series)}
            clearEntities={() => setSeries([])}
          /> :
          <div className="p-dialog-form">
            <CategoryForm
              isEditable={true}
              title={seriesForm.title}
              withSaveButton={true}
              updateCategoryTitle={(title) => fillSeriesForm({ title })}
              saveCategory={createNewSeries}
              cancelCreating={() => setCreatingMode(false)}
            />
          </div>
        }
      </Dialog>
    </>
  )
})