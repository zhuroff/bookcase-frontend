import { observer } from 'mobx-react-lite';
import { Button } from 'primereact/button';
import { FormEvent } from 'react';
import { useLocale } from '../../hooks/useLocale';
import { TPaginatorResponse } from '../../types/Common';
import { Input } from '../Input/Input';
import { Pagination } from '../Pagination/Pagination';

type TModalHeaderProps = {
  heading?: string
  searchName?: string
  searchQuery?: string
  isCreatable?: true
  pagePagination?: TPaginatorResponse | null
  setSearchQuery?: (query: string) => void
  switchPagination?: (page: number) => void
}

export const ModalHeader = observer(({
  heading,
  searchName,
  searchQuery,
  isCreatable,
  pagePagination,
  setSearchQuery,
  switchPagination
}: TModalHeaderProps) => {
  const { text } = useLocale()

  return (
    <div className="p-dialog-title">
      {heading &&
        <span style={{ marginRight: '0.5rem' }}>{text(heading)}</span>
      }

      {searchName &&
        <div className="p-dialog-search">
          <Input
            name={searchName}
            type="text"
            value={searchQuery || ''}
            onInput={(event: FormEvent<HTMLInputElement>) => setSearchQuery && setSearchQuery(event.currentTarget.value)}
          />
        </div>
      }

      {isCreatable &&
        <Button
          label={text('common.create')}
          className="p-button-sm p-button-outlined"
          style={{ marginLeft: '1rem' }}
        />
      }

      {pagePagination &&
        <Pagination
          pagination={pagePagination}
          style={{ marginLeft: 'auto', border: 0 }}
          switchPagination={(page) => switchPagination && switchPagination(page)}
        />
      }
    </div>
  )
})