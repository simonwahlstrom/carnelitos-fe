import React from 'react'
import { Button } from "antd"
import { CheckOutlined, ClockCircleOutlined } from "@ant-design/icons"

export default function ToggleButton(props) {
  return (
    <Button
      disabled={props.disabled}
      type={props.completed ? "primary" : "default"}
      onClick={() => props.saveSet(props.index)}
      style={{width: "100%", height: "36px"}}
      loading={props.loading}
      icon={props.completed ? <CheckOutlined /> : <ClockCircleOutlined />}
    >Check</Button>
  )
}
