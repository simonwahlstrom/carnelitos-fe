import React, { useState } from "react"

export function Hello(props) {
  const [count, setCount] = useState(0);
  return (
    <h1>Hello, Simon</h1>
  )
}

export default Hello
