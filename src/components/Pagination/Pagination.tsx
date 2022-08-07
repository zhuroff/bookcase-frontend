import { observer } from 'mobx-react-lite';
import CSS from 'csstype';
import { TPaginatorResponse } from '../../types/Common';
import { Dropdown } from 'primereact/dropdown';
import { useLocale } from '../../hooks/useLocale';
import './Pagination.scss';

type TPaginationProps = {
  pagination: TPaginatorResponse
  style?: CSS.Properties
  switchPagination: (page: number) => void
}

export const Pagination = observer(({ pagination, style, switchPagination }: TPaginationProps) => {
  const { text } = useLocale()
  const dropDownOptions = Array.from({ length: pagination.totalPages }, (_, b) => (
    { label: b + 1, value: b + 1 }
  ));

  return (
    <div
      className="p-paginator p-component"
      style={{ ...style }}
    >
      <span>{text('paginator.page')}</span>
      <Dropdown
        value={pagination.page}
        options={dropDownOptions}
        onChange={(e) => switchPagination(e.value)}
      />
      <span style={{ marginLeft: '0.5rem' }}>{text('paginator.of')} {pagination.totalPages}</span>
    </div>
  )
})
