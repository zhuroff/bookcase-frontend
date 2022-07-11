import { FormEvent, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Input } from '../Input/Input';
import { Dialog } from 'primereact/dialog';
import { Card } from 'primereact/card'
import { useLocale } from '../../hooks/useLocale';
import { TCollectionEntities, TSearchResponse } from '../../types/Common';
import { useSearch } from '../../hooks/useSearch';
import { ModalHeader } from '../ModalHeader/ModalHeader';
import './Header.scss';

export const Header = observer(() => {
  const { text } = useLocale()
  const [searchQuery, setSearchQuery, searchResults, setSearchResults] = useSearch<TSearchResponse[]>({})
  const location = useLocation()

  const closeSearchModal = () => {
    setSearchResults(null)
    setSearchQuery('')
  }

  useEffect(() => {
    closeSearchModal()
  }, [location])

  return (
    <>
      <header className="header">
        <div className="header__search">
          <Input
            name="headerSearch"
            type="text"
            value={searchQuery}
            onInput={(event: FormEvent<HTMLInputElement>) => setSearchQuery(event.currentTarget.value)}
          />
        </div>
      </header>

      <Dialog
        header={<ModalHeader
          heading="search.modal.header"
          searchName="modalSearch"
          searchQuery={searchQuery}
          setSearchQuery={(page) => setSearchQuery(page)}
        />}
        visible={Boolean(searchResults?.length)}
        draggable={false}
        style={{ width: '50vw' }}
        onHide={closeSearchModal}
      >
        {searchResults &&
          searchResults.map((section) => {
            const key = Object.keys(section)[0] as TCollectionEntities

            return (
              <Card
                key={key}
                style={{ backgroundColor: 'var(--surface-100)' }}
              >
                <h3 className='p-card-heading'>{text(`search.modal.${key}`)}</h3>
                <ul className='p-card-list'>
                  {
                    section[key].map((item) => (
                      <li
                        key={item._id}
                        className='p-card-item --marked'
                      >
                        <Link
                          to={`/${key}/${item._id}`}
                          className='p-card-link'
                        >
                          <span className="p-card-name">{item.title}. </span>
                          <em className='p-card-subname'>
                            {
                              // @ts-ignore
                              item.subtitle ? `${item.subtitle}. ` : ''
                            }
                          </em>

                          <span className='p-card-authors'>
                            {
                              // @ts-ignore
                              item.authors?.map(({ author }, index, arr) => (
                                `${author.title}${index < arr.length - 1 ? '; ' : '.'}`
                              ))
                            }
                          </span>
                        </Link>
                      </li>
                    ))
                  }
                </ul>
              </Card>
            )
          })
        }
      </Dialog>
    </>
  )
})
