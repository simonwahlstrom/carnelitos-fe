import React from "react"
import { Button, Table, Tag } from 'antd'
import { RemoveFromFixedSchedule, MoveToDay } from "../../../services/schedule-service"
import DaySelector from "./day-selector"
import { DeleteOutlined } from "@ant-design/icons"

export function SelectedFixedWorkoutTable(props) {
  const workouts = Object.values(props.workouts).flat()

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Day', dataIndex: '', key: 'day', render: (record) => <DaySelector day={record.day} id={record.id} moveToDay={moveToDay}/> },
    {
      title: 'Tags',
      key: 'tags',
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
      width: "20%",
      dataIndex: '',
      key: 'x',
      render: (record) => <React.Fragment>
        <Button type="danger" icon={<DeleteOutlined />} onClick={(e) => { {e.stopPropagation(), removeFromSchedule(record.day, record.id) }}}/>
      </React.Fragment>,
    },
  ]

  function moveToDay(id, from, to) {
    let newWorkouts = JSON.parse(JSON.stringify(props.workouts))
    newWorkouts[toTitleCase(from)] = newWorkouts[toTitleCase(from)].filter((workout) => workout.id !== id)
    let ids = props.workouts[toTitleCase(to)] ? props.workouts[toTitleCase(to)].map((workout) => workout.id) : []
    ids.push(id)
    newWorkouts[toTitleCase(to)] = workouts.filter((workout) => ids.includes(workout.id))
    props.setSelectedWorkouts(newWorkouts)
    MoveToDay({id, from, to, type: "fixed"})
  }

  function toTitleCase (s){
    return s.substr(0, 1).toUpperCase() + s.substr(1).toLowerCase()
  }

  function removeFromSchedule(day, id) {

    let ids = props.workouts[day].map((workout) => workout.id)
    ids = ids.filter((old_id) => old_id !== id)

    let body = {}
    body[day.toLowerCase()] = ids
    body["type"] = "fixed"
    // // Hack to make a copy
    let newWorkouts = JSON.parse(JSON.stringify(props.workouts))
    newWorkouts[day] = newWorkouts[day].filter((workout) => workout.id !== id)
    props.setSelectedWorkouts(newWorkouts)
    RemoveFromFixedSchedule(body)
  }

  const workoutData = Object.keys(props.workouts).map((day) => {
    return props.workouts[day].map((workout, index) => {
      return {
        id: workout.id,
        key: `${day}-${index}`,
        name: workout.name,
        day: day,
        tags: workout.tags,
        exercises: workout.exercises,
      }
    })
  }).flat()

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
      expandRowByClick={true}
      pagination={{ defaultPageSize: 15, hideOnSinglePage: true}}
      dataSource={workoutData}
      expandIconAsCell={false}
      expandIconColumnIndex={-1}
    />
  )
}

export default SelectedFixedWorkoutTable
