import React from 'react'
import { Statistic } from 'antd'

export function Timer(props) {
  const { Countdown } = Statistic

  const deadline = new Date(localStorage.getItem('timer'))

  return (
    <div className="row time">
      <Countdown format="mm:ss" title="Rest!" value={deadline} onFinish={() => props.stopTimer()} />
    </div>
  )
}

export default Timer
