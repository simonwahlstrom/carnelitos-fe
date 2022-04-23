import React, { useState } from "react"
import { useRouter } from 'next/router'
import { Button } from "antd"

export function FooterButton(props) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  function handeClick() {
    setLoading(true)
    router.push(props.url)
  }

  const Icon = props.icon

  return (
    <Button
      loading={loading}
      className={'btn btn-secondary' + (props.highlighted ? " highlighted" : "")}
      disabled={!props.active}
      onClick={() => handeClick()}>
      <Icon />
    </Button>
  )
}

export default FooterButton
