import { observer } from 'mobx-react-lite';
import { useEffect, useReducer, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ItemActions } from '../../../components/ItemActions/ItemActions';
import { Preloader } from '../../../components/Preloader/Preloader';
import { SeriesView } from '../../../components/SeriesView/SeriesView';
import { useApi } from '../../../hooks/useApi';
import { useConfirm } from '../../../hooks/useConfirm';
import { useLocale } from '../../../hooks/useLocale';
import { useToast } from '../../../hooks/useToast';
import { TCategorySeriesPage } from '../../../types/Categories';

export const SeriesPage = observer(() => {
  const params = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const toast = useToast()
  const { text } = useLocale()
  const { get, patch, remove } = useApi()
  const [isSeriesFetched, setIsSeriesFetched] = useState(false)
  const [series, setSeries] = useReducer(
    (series: TCategorySeriesPage, payload: Partial<TCategorySeriesPage>) => ({ ...series, ...payload }),
    {} as TCategorySeriesPage
  )
  const [updates, setUpdates] = useState<Set<keyof TCategorySeriesPage>>(new Set())
  const { callConfirmation } = useConfirm()

  const fetchSeries = () => {
    get<TCategorySeriesPage>(`/api/series/${params.id}`)
      .then((response) => setSeries(response.data))
      .then(_ => setIsSeriesFetched(true))
      .catch((error) => console.dir(error))
  }

  const updateSeriesTitle = (value: string) => {
    setSeries({ ...series, title: value })
    setUpdates(new Set(updates.add('title')))
  }

  const saveSeries = () => {
    const payload = Array.from(updates).reduce<Partial<TCategorySeriesPage>>((acc, next) => {
      // @ts-ignore
      acc[next] = series[next]
      return acc
    }, {})

    patch<{ isSuccess: true }>(`/api/series/${params.id}`, payload)
      .then(_ => toast.current?.show({
        severity: 'success',
        summary: text('success'),
        detail: text('series.successSaving'),
        life: 5000
      }))
      .catch((error) => console.dir(error))
  }

  const deleteSeries = () => {

  }

  const draftingOrPublishing = () => {

  }

  useEffect(() => {
    if (!location.pathname.includes('/edit') || !series._id) {
      setIsSeriesFetched(false)
      fetchSeries()
    }
  }, [location])

  return (
    <>
      {!isSeriesFetched ?
        <Preloader /> :
        <>
          <SeriesView
            series={series}
            isEditable={location.pathname.includes('/edit')}
            updateSeriesTitle={updateSeriesTitle}
          />

          <footer className="book__footer">
            <ItemActions
              isDraft={series.isDraft}
              isEditMode={location.pathname.includes('/edit')}
              saveEntity={saveSeries}
              draftingOrPublishing={draftingOrPublishing}
              cancelEditingEntity={() => {
                navigate(`/series/${params.id}`, { replace: true })
              }}
              editEntity={() => {
                navigate(`/series/${params.id}/edit`, { replace: true })
              }}
              deleteEntity={(event) => callConfirmation(event, deleteSeries)}
            />
          </footer>
        </>
      }
    </>
  )
})