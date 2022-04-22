import React, { useEffect, useState } from "react"
import Home from "../src/components/home/home"
import { Spin } from "antd"
import { CheckToken, DeleteToken } from "../src/services/login-service"

export default function Index() {
  const [loading, setLoading] = useState(true)
  const [valid, setValid] = useState(undefined)

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    setLoading(false)
  }, [valid])

  const fetchData = async () => {
    const data = await CheckToken()
    setValid(data.valid)
  }

  console.log({valid, loading})

  if (loading) {
    return (
      <Spin size="large" style={spinnerStyling} />
    )
  }

  if (!loading && valid) {
    return (
      <Home />
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
