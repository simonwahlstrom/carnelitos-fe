import React, { useState } from 'react'
import { Button, Modal, Calendar, Badge } from "antd"
import History from "./history"
import styled from 'styled-components'

export function Overview(props) {

  const [visible, setVisible] = useState(false)
  const [selectedWorkouts, setSelectedWorkouts] = useState([])

  function getListData(value) {
    const { overview } = props
    const day = value.format('YYYY-MM-DD')
    const events = overview.filter(element => element[0] == day)

    if (events) {
      return events.map((event) => {
        return { type: 'success', content: event[1] }
      })
    } else {
      return []
    }
  }

  function dateCellRender(value) {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item, index) => (
          <li key={`${item.content}-${index}`}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  }

  function selectDate(value) {
    const date = value.format('YYYY-MM-DD')
    const workouts = props.history.filter((e) => e.finished == date)
    if (workouts && workouts.length > 0) {
      setSelectedWorkouts(workouts)
      setVisible(true)
    }
  }

  function getMonthData(value) {
    const { overview } = props
    const month = value.format('YYYY-MM')
    const events = overview.filter(element => element[0].substring(0, 7) == month)
    if (events) {
      return events.length
    }
  }

  function monthCellRender(value) {
    const num = getMonthData(value)
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Workouts</span>
      </div>
    ) : null
  }

  return (
    <OverViewStyling>
      <Calendar dateCellRender={dateCellRender} onSelect={selectDate} monthCellRender={monthCellRender} />
      <div>
        <Modal
          title="Workout sessions"
          visible={visible}
          onOk={() => setVisible(false)}
          onCancel={() => setVisible(false)}
          footer={
            <Button key="OK" onClick={() => setVisible(false)}>
              Close
            </Button>}
        >
          <History history={selectedWorkouts} />
        </Modal>
      </div>
    </OverViewStyling>
  )
}

const OverViewStyling = styled.div`
  .events {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .events .ant-badge-status {
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
    text-overflow: ellipsis;
    font-size: 12px;
  }
  .notes-month {
    text-align: center;
    font-size: 28px;
  }
  .notes-month section {
    font-size: 28px;
  }
`;
