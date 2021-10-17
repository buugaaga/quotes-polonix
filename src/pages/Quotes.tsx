import { FC, useEffect, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import Modal from 'react-modal'
import { ErrorMessage } from '../components/ErrorMessage'
import { Table } from '../components/Table'
import { useStore } from '../store'
import { TickerType } from '../types'

export const Quotes: FC = observer(() => {
  const timer = useRef<number>()
  const store = useStore()

  useEffect(() => {
    if (timer.current === undefined) {
      store?.tickers.fetchQuotesData()
    }
    timer.current = setInterval(() => {
      if (document.visibilityState === 'visible') {
        store?.tickers.fetchQuotesData()
      }
    }, 5000)
    return () => {
      clearInterval(timer.current)
      timer.current = undefined
    }
  }, [])

  if (!store) {
    return <div>...loading</div>
  }

  return (
    <div className="p-5 flex flex-col justify-center items-center">
      <Modal isOpen={store.tickers.modalInfo !== null}>
        <button
          className="fixed top-1 text-red-500"
          onClick={() => store.tickers.closeModal()}
        >
          Закрыть
        </button>
        <div className="flex flex-col">
          {store.tickers.modalInfo &&
            Object.entries(store.tickers.modalInfo).map(([key, value]) => {
              return (
                <div key={key}>
                  <p>{`${key} : ${value}`}</p>
                </div>
              )
            })}
        </div>
      </Modal>
      {store.tickers.state === 'error' && (
        <ErrorMessage message={store.tickers.errorMessage} />
      )}
      <h3 className="text-2xl">Котировки</h3>
      {store.tickers.state === 'pending' ? (
        <div>...pending</div>
      ) : (
        <Table
          quotes={store.tickers.quotes}
          onClickRow={(data: TickerType) => store.tickers.showModal(data)}
        />
      )}
    </div>
  )
})
