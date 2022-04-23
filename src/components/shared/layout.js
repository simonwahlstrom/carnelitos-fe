import Head from "next/head"
import React, { useEffect, useState } from "react"
import Footer from "../layout/footer"
import { Spin } from "antd"
import { CheckToken, DeleteToken } from "../../services/login-service"
import Image from "next/image"

export default function Layout(props) {
  const [loading, setLoading] = useState(true)
  const [valid, setValid] = useState(undefined)
  const [activeWorkout, setActiveWorkout] = useState(false)

  useEffect(() => {
    fetchData()
    setLoading(false)
  }, [])

  const fetchData = async () => {
    const data = await CheckToken()
    if (data) {
      setValid(data.valid)
      setActiveWorkout(data.active_workout)
    }
  }

  function renderView() {
    if (loading) {
      return (
        <Spin size="large" style={spinnerStyling} />
      )
    }

    if (!loading && valid) {
      return (
        <>
          {children}
          <Footer activeWorkout={activeWorkout} />
        </>
      )
    }

    if (!loading && valid == false) {
      DeleteToken()
      window.location = "/login"
    }

    if (!loading && !valid) {
      // Means that we can't react the API
      return (
        <div>
          <div style={{ marginLeft: "auto", marginRight: "auto", width: "450px" }}>
            <Image src="/carneicon.png" width="450px" height="560px" />
          </div>
          <p>You are offline ;(</p>
        </div>
      )
    }
  }

  const { children } = props
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta content="text/html; charset=UTF-8" httpEquiv="Content-Type" />
        <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0" name="viewport" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon/favicon-16x16.png" />
        <link rel="shortcut icon" href="/images/favicon/favicon.ico" />
        <link rel="mask-icon" href="/images/favicon/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#9ac05a" />
        <meta name="theme-color" content="#ffffff" />
        <title>Carnelitos</title>
      </Head>
      <>
        {renderView()}
      </>
    </>
  )
}

const spinnerStyling = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  minHeight: "100vh",
}
