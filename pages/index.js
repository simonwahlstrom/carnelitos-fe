import React, { useEffect, useState } from "react"
import Home from "../src/components/home/home"
import { Spin } from "antd"

export default function Index() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <Spin size="large" style={spinnerStyling} />
    )
  }
  return (
    <Home />
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
