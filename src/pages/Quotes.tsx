import { FC, useEffect, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import {
  ModalProvider,
  Modal,
  useModal,
  ModalTransition,
} from 'react-simple-hook-modal'
import { ErrorMessage } from '../components/ErrorMessage'
import { Table } from '../components/Table'
import { useStore } from '../store'

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
  console.log(store.tickers.modalInfo)
  return (
    <div className="p-5 flex flex-col justify-center items-center">
      <Modal
        id="any-unique-identifier"
        isOpen={true}
        transition={ModalTransition.BOTTOM_UP}
      >
        <button onClick={() => {}}>Close</button>
      </Modal>
      {store.tickers.state === 'error' && (
        <ErrorMessage message={store.tickers.errorMessage} />
      )}
      <h3 className="text-2xl">Котировки</h3>
      {store.tickers.state === 'pending' ? (
        <div>...pending</div>
      ) : (
        <Table quotes={store.tickers.quotes} />
      )}
    </div>
  )
})
