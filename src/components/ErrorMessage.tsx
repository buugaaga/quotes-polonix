import { FC } from 'react'

type Props = {
  message: string
}

export const ErrorMessage: FC<Props> = ({ message }) => {
  return (
    <div className="flex flex-col bg-red-100 p-3">
      <h4 className="text-red-500">Произошла ошибка запроса</h4>
      <p className="text-red-500 text-xs">{message}</p>
    </div>
  )
}
