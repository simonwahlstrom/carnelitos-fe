import React from "react"
import { useRouter } from 'next/router'
import { Button } from "antd"

export function FooterButton(props) {
  const router = useRouter()

  const Icon = props.icon

  return (
    <Button
      className={'btn btn-secondary' + (props.highlighted ? " highlighted" : "")}
      disabled={!props.active}
      onClick={() => router.push(props.url)}>
      <Icon />
    </Button>
  )
}

export default FooterButton
