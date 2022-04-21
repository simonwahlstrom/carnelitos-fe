import React from "react"
import { Button, Table, Tag } from 'antd'
import { RemoveFromFlexibleSchedule, ChangeOrderOfFlexibleSchedule } from "../../../services/schedule-service"

export function SelectedFlexWorkoutTable(props) {
  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
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
      render: (record) => <div style={{display: "flex", justifyContent: "space-between"}}>
        <Button disabled={record.key == 0} icon="arrow-up" type="primary" onClick={(e) => { e.stopPropagation(), ChangeOrderOfWorkout(record.key, -1) }}/>
        <Button disabled={record.key == props.workouts.length - 1} icon="arrow-down" type="primary" onClick={(e) => { e.stopPropagation(), ChangeOrderOfWorkout(record.key, 1) }}/>
        <Button type="danger" icon="delete" onClick={(e) => { e.stopPropagation(), removeFromSchedule(record.id) }}/>
      </div>,
    },
  ]

  function ChangeOrderOfWorkout(index, direction) {
    // 1 = down
    // -1 = up
    const body = {
      type: "flex",
      direction: index + direction,
      index,
    }

    const arr = [...props.workouts]
    const temp = arr[index]
    arr[index] = arr[index + direction]
    arr[index + direction] = temp

    props.setSelectedWorkouts(arr)
    ChangeOrderOfFlexibleSchedule(body)
  }

  function removeFromSchedule(id) {
    const body = {
      id: id,
      type: "flex"
    }
    const newWorkouts = props.workouts.filter(item => item.id !== id)
    props.setSelectedWorkouts(newWorkouts)
    RemoveFromFlexibleSchedule(body)
  }

  const workoutData = props.workouts.map((workout, index) => {
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
      expandRowByClick={true}
      pagination={{ defaultPageSize: 15, hideOnSinglePage: true}}
      dataSource={workoutData}
      expandIconAsCell={false}
      expandIconColumnIndex={-1}
    />
  )
}

export default SelectedFlexWorkoutTable
