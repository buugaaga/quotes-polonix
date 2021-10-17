import { FC } from 'react'
import { TickerType } from '../types'

type Props = {
  quotes?: Map<string, TickerType>
}

export const Table: FC<Props> = ({ quotes }) => {
  if (!quotes) {
    return <div>Нет данных</div>
  }
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Название</th>
            <th>Последняя цена</th>
            <th>Максимум</th>
            <th>Изменения (%)</th>
          </tr>
        </thead>
        <tbody>
          {Array.from(quotes.entries()).map(([key, data], index) => (
            <tr key={data.id}>
              <td>{key}</td>
              <td>{data.last}</td>
              <td>{data.high24hr}</td>
              <td>{data.percentChange}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
