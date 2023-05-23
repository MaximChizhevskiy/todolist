import React from "react"
import { Provider } from "react-redux"
import { store } from "app/store"
import { BrowserRouter } from "react-router-dom"

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
  return (
    <BrowserRouter>
      <Provider store={store}>{storyFn()}</Provider>
    </BrowserRouter>
  )
}
