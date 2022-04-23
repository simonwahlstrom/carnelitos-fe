import "../styles/home.scss"
import "../styles/login.scss"
import "../styles/sessions.scss"
import "../styles/settings.scss"
import "../styles/tabs.scss"
import "antd/dist/antd.css"

import NextNProgress from "nextjs-progressbar"

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNProgress />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
