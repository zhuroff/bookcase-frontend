import { observer } from 'mobx-react-lite';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import { useLocale } from '../../hooks/useLocale';
import { usePageConfig } from '../../hooks/usePageConfig';
import { useSearch } from '../../hooks/useSearch';
import { TCategoriesResponse, TCategoryBasic } from '../../types/Categories';
import { TPaginatorResponse } from '../../types/Common';
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

  const fetchSeries = () => {
    post<TCategoriesResponse>('/api/series', pageConfig)
      .then((response) => {
        setSeries(response.data.docs)
        setPagePagination(response.data.pagination)
      })
      .catch((error) => console.dir(error))
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
              onClick={() => {
                fetchSeries()
              }}
              className="p-button-outlined"
              style={{ marginTop: '0.5rem' }}
            />
          </Card>
        </>
      }

      <Dialog
        header={<ModalHeader
          searchName="modalSearch"
          searchQuery={searchQuery}
          isCreatable={true}
          pagePagination={pagePagination}
          setSearchQuery={(value) => setSearchQuery(value)}
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
        <Card style={{ backgroundColor: 'var(--surface-100)' }}>
          <h3 className='p-card-heading'>{text('common.series')}</h3>
          <ul className='p-card-list'>
            {
              series.map((item) => (
                <li
                  key={item._id}
                  className='p-card-item'
                >
                  <Button
                    className={'p-button-sm p-button-secondary p-button-outlined'}
                    onClick={() => {
                      selectSeries(item)
                      setSeries([])
                    }}
                  >{text('common.select')}</Button>

                  <Link
                    to={`/series/${item._id}`}
                    className='p-card-link'
                    style={{ marginLeft: '1rem' }}
                  >{item.title}</Link>
                </li>
              ))
            }
          </ul>
        </Card>
      </Dialog>
    </>
  )
})