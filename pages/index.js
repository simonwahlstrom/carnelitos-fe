import React, { useEffect, useState } from "react"
import Home from "../src/components/home/home"

export default function Index() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div>Loading</div>
    )
  }
  return (
    <Home />
  )
}
