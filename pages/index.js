import React, { useEffect, useState } from "react"
import Home from "../src/components/home/home"
import { Spin } from "antd"
import { CheckToken, DeleteToken } from "../src/services/login-service"
import Footer from "../src/components/layout/footer"

export default function Index() {
  const [loading, setLoading] = useState(true)
  const [valid, setValid] = useState(undefined)

  useEffect(() => {
    fetchData()
    setLoading(false)
  }, [])

  const fetchData = async () => {
    const data = await CheckToken()
    setValid(data.valid)
  }

  if (loading) {
    return (
      <Spin size="large" style={spinnerStyling} />
    )
  }

  if (!loading && valid) {
    return (
      <>
        <Home />
        <Footer logged_in={true} />
      </>
    )
  }

  if (!loading && valid == false) {
    DeleteToken()
    window.location = "/login"
  }
}

const spinnerStyling = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  minHeight: "100vh",
}
