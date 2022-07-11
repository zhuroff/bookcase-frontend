import { observer } from 'mobx-react-lite';
import { useCallback } from 'react';
import { TBookStatus } from '../../types/Books';
import { Calendar } from 'primereact/calendar';
import { useLocale } from '../../hooks/useLocale';
import './BookStatus.scss';

type TBookStatusProps = {
  isEditable: boolean
  status: TBookStatus
  setReadingStartDate: (value: Date | Date[] | undefined) => void
  setReadingFinishDate: (value: Date | Date[] | undefined) => void
}

export const BookStatus = observer(({
  isEditable,
  status,
  setReadingStartDate,
  setReadingFinishDate
}: TBookStatusProps) => {
  const { text, currentLocale } = useLocale()

  const timeDeclension = (param: number, words: string | string[]) => {
    if (param <= 0 || !Array.isArray(words)) return ''

    const cases = [2, 0, 1, 1, 1, 2]
    const index = (param % 100 > 4 && param % 100 < 20) ? 2 : cases[(param % 10 < 5) ? param % 10 : 5]
    const result = words[index]

    return `${param} ${result}`
  }

  const countReadingTime = useCallback(() => {
    if (!status.start) return ''

    const start = new Date(status.start)
    const finish = status.finish
      ? new Date(status.finish)
      : new Date();
    const timeDiff = finish.getTime() - start.getTime()
    const years = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30 * 12))
    const months = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30) % 12)
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24) % 30)
    const yearsStr = timeDeclension(years, text('book.status.years'))
    const monthsStr = timeDeclension(months, text('book.status.months'))
    const daysStr = timeDeclension(days, text('book.status.days'))

    return `${yearsStr} ${monthsStr} ${daysStr}`.trim()
  }, [status])

  return (
    <div className="book__status">
      {(isEditable || (!isEditable && status.start)) &&
        <label className="book__status-label">
          <span>{text('book.placeholders.startReading')}</span>
          <Calendar
            disabled={!isEditable}
            showIcon={false}
            dateFormat="dd.mm.yy"
            maxDate={new Date()}
            value={status.start ? new Date(status.start) : undefined}
            onChange={(e) => setReadingStartDate(e.value)}
          />
        </label>
      }

      {status.start &&
        <>
          {(isEditable || (!isEditable && status.finish)) &&
            <label className="book__status-label">
              <span>{text('book.placeholders.finishReading')}</span>
              <Calendar
                disabled={!isEditable}
                showIcon={false}
                dateFormat="dd.mm.yy"
                minDate={new Date(status.start)}
                maxDate={new Date()}
                value={status.finish ? new Date(status.finish) : undefined}
                onChange={(e) => setReadingFinishDate(e.value)}
              />
            </label>
          }

          <div className="book__status-result">
            <span>{text('book.status.result')}</span>
            <strong>{countReadingTime()}</strong>
          </div>
        </>
      }
    </div>
  )
})