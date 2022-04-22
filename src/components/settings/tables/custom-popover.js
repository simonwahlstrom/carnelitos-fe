import React, { useState } from "react"
import { Button, Popover } from 'antd'
import { PlusOutlined } from "@ant-design/icons"

export function CustomPopover(props) {
  const [visible, setVisible] = useState(false)

  function popOverContent(id) {
    return <div>
      <p>
        <Button onClick={(e) => addToSchedule(id, "Monday")}>Monday</Button>
      </p>
      <p>
        <Button onClick={(e) => addToSchedule(id, "Tuesday")}>Tuesday</Button>
      </p>
      <p>
        <Button onClick={(e) => addToSchedule(id, "Wednesday")}>Wednesday</Button>
      </p>
      <p>
        <Button onClick={(e) => addToSchedule(id, "Thursday")}>Thursday</Button>
      </p>
      <p>
        <Button onClick={(e) => addToSchedule(id, "Friday")}>Friday</Button>
      </p>
      <p>
        <Button onClick={(e) => addToSchedule(id, "Saturday")}>Saturday</Button>
      </p>
      <p>
        <Button onClick={(e) => addToSchedule(id, "Sunday")}>Sunday</Button>
      </p>
    </div>
  }

  function addToSchedule(id, day) {
    props.addToSchedule(id, day)
    setVisible(false)
  }

  return <Popover placement="left" content={popOverContent(props.id)} visible={visible}><Button icon={<PlusOutlined />} onClick={(e) => setVisible(!visible)} /></Popover>
}

export default CustomPopover
