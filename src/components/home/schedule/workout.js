import React, { useState } from 'react'
import { Button, Table } from "antd"
import Icons from "../../session/icons"
import { StartWorkout } from '../../../services/workout-service'

export function Workout(props) {
  const [loading, setLoading] = useState(false)
  const { workout, activeWorkout } = props
  const columns = [
    {
      title: 'Exercise',
      dataIndex: 'name',
      key: 'name',
      render: text => <div style={{ "display": "flex" }}>
        <span style={{ "margin": "-3px 0 0 5px" }}>{<Icons name={text} />}</span>
        {text}
      </div>,
    },
    {
      title: 'Sets',
      dataIndex: 'sets',
      key: 'sets',
    },
    {
      title: 'Reps',
      dataIndex: 'reps',
      key: 'reps',
      width: '6rem'
    },
  ]

  async function startSession(id) {
    setLoading(true)
    await StartWorkout(id)
    window.location = "/session"
  }

  return <div className="container">
    <h4 className="name">{workout.name}</h4>
    <Table dataSource={workout.exercises} columns={columns} loading={loading} pagination={false}/>
    <Button
      onClick={() => startSession(workout.id)}
      disabled={activeWorkout}
      type="primary"
      loading={loading}
      style={{ width: "100%", fontSize: "18px", height: "40px", marginTop: "20px" }}>
      {activeWorkout ? "You already have active workout" : "Start"}
    </Button>
  </div>
}

export default Workout
