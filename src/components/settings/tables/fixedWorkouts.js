import React, { useState } from "react"
import { Button, Table, Popover, Tag } from 'antd'
import { AddToSchedule } from "../../../services/schedule-service"
import CustomPopover from "./custom-popover"
import { CopyOutlined } from "@ant-design/icons"

export function FixedWorkoutTable(props) {
  let workouts = props.workouts.filter(item => !Object.values(props.selectedWorkouts).flat().map((w) => w.id).includes(item.id))

  if (!props.viewPublicWorkouts)
    workouts = workouts.filter(item => item.owner == props.user)

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name', width: "60%" },
    {
      title: 'Tags',
      key: 'tags',
      width: "35%",
      dataIndex: 'tags',
      render: tags => (
        <span>
          {tags.map(tag => {
            return (
              <Tag color="geekblue" key={tag}>
                {tag.toUpperCase()}
              </Tag>
            )
          })}
        </span>
      ),
    },
    {
      title: 'Action',
      width: "5%",
      dataIndex: '',
      key: 'x',
      render: (record) => <div style={{ "display": "flex" }}>
          <CustomPopover id={record.id} addToSchedule={addToSchedule} />
          <Button type="default" icon={<CopyOutlined />} onClick={(e) => { { e.stopPropagation(), window.open(`/workouts/${record.id}`, "_blank") } }} />
        </div>,
    },
  ]

  function addToSchedule(id, day = "Monday") {
    let ids = props.selectedWorkouts[day] ? props.selectedWorkouts[day].map((workout) => workout.id) : []
    ids.push(id)

    let body = {}
    body[day.toLowerCase()] = ids
    body["type"] = "fixed"
    // // Hack to make a copy
    let newSelectedWorkouts = JSON.parse(JSON.stringify(props.selectedWorkouts))
    newSelectedWorkouts[day] = props.workouts.filter((workout) => ids.includes(workout.id))
    props.setSelectedWorkouts(newSelectedWorkouts)
    AddToSchedule(body)
  }

  const workoutData = workouts.map((workout, index) => {
    return {
      id: workout.id,
      key: index,
      name: workout.name,
      tags: workout.tags,
      exercises: workout.exercises,
    }
  })

  function exercises(exercises) {
    const columns = [
      { title: 'Name', dataIndex: 'name', key: 'name' },
      { title: 'Reps', dataIndex: 'reps', key: 'reps' },
      { title: 'Sets', dataIndex: 'sets', key: 'sets' },
    ]

    return <Table
      columns={columns}
      dataSource={exercises}
      pagination={{ defaultPageSize: 20, hideOnSinglePage: true }}
    />
  }

  return (
    <Table
      columns={columns}
      expandedRowRender={record => exercises(record.exercises)}
      pagination={{ defaultPageSize: 15, hideOnSinglePage: true }}
      dataSource={workoutData}
    />
  )
}

export default FixedWorkoutTable
