import '../styles/globals.scss'
import type {AppProps} from 'next/app'
import {store} from "../components/store";
import {Provider} from "react-redux";
import {SSRProvider} from "react-bootstrap";

function MyApp({Component, pageProps}: AppProps) {
  return (<Provider store={store}>
    <SSRProvider>
      <Component {...pageProps} />
    </SSRProvider>
  </Provider>)
}

export default MyApp
