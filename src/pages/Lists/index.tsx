import { observer } from 'mobx-react-lite';
import { Avatar } from 'primereact/avatar';
import { Badge } from 'primereact/badge';
import { Card } from 'primereact/card';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Preloader } from '../../components/Preloader/Preloader';
import { useApi } from '../../hooks/useApi';
import { useLocale } from '../../hooks/useLocale';
import { TCategoryBasic } from '../../types/Categories';

export const Lists = observer(() => {
  const { get } = useApi()
  const { text } = useLocale()
  const [listFetched, setListFetchedState] = useState(false)
  const [list, setList] = useState<TCategoryBasic[]>([])

  const fetchLists = () => {
    get<TCategoryBasic[]>('/api/lists')
      .then((response) => {
        setList(response.data)
        setListFetchedState(true)
      })
      .catch((error) => console.dir(error))
  }

  useEffect(() => {
    fetchLists()
  }, [])

  return (
    <>
      <header className="section__heading">
        <h2 className="section__title">{text('routes.lists')}</h2>
      </header>

      <ul className="cards">
        {
          !listFetched ?
          <Preloader /> :
            !list.length ?
              <li className="cards__empty">{text('common.emptySection')}</li> :
              list.map((item) => (
                <Link
                  key={item._id}
                  to={`/lists/${item._id}`}
                >
                  <Card>
                    <div className="card__author">
                      <Avatar
                        className="p-overlay-badge"
                        icon="pi pi-book"
                        size="large"
                      >
                        <Badge value={item.books} />
                      </Avatar>
                      <div>
                        <div className="card__author-lastname">
                          <span>{item.title}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))
        }
      </ul>
    </>
  )
})