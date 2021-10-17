import { createContext, FC, useContext } from 'react'
import { QuotesData } from './QuotesData'

export const rootStore = {
  tickers: new QuotesData(),
}

type RootStoreType = typeof rootStore

const StoreContext = createContext<RootStoreType | null>(null)

export const StoreProvider: FC<{ store: RootStoreType }> = ({
  children,
  store,
}) => {
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

export const useStore = () => useContext(StoreContext)
