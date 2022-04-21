import React, { useState } from "react"
import { Button, Icon } from "antd"

export function FooterButton(props) {
  const [loading, setLoading] = useState(false)

  function handeClick() {
    setLoading(true)
    window.location.href = props.url
  }

  return (
    <Button
      loading={loading}
      className={'btn btn-secondary' + (props.highlighted ? " highlighted" : "")}
      disabled={!props.active}
      onClick={() => handeClick()}>
      <Icon type={props.name} />
    </Button>
  )
}

export default FooterButton
