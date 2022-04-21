import React from "react"
import { Table, Button, Tag } from 'antd'
import Exercises from "./exercises"
import WorkoutEditModal from "./workout-edit-modal"
import WorkoutCreateModal from "./workout-create-modal"

class Workouts extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      editWorkoutVisible: false,
      createWorkoutVisible: false,
      selectedWorkout: undefined,
      workouts: this.props.workouts,
    }
  }

  showWorkoutEdit = (e, record) => {
    this.setState({
      editWorkoutVisible: true,
      selectedWorkout: record,
    })
  }

  showWorkoutCreate = () => {
    this.setState({
      createWorkoutVisible: true,
    })
  }

  hideWorkoutEdit = (workout, remove = false) => {
    let updatedWorkouts = this.state.workouts
    if (workout) {
      if (remove) {
        updatedWorkouts = updatedWorkouts.filter(item => item.id !== workout)
      } else {
        updatedWorkouts = updatedWorkouts.map((el) => {
          if (el.id === workout.id) {
            el = workout
          }
          return el
        })
      }
    }

    this.setState({
      editWorkoutVisible: false,
      selectedWorkout: undefined,
      workouts: updatedWorkouts,
    })
  }

  hideWorkoutCreate = (workout) => {
    if (workout) {
      this.setState({
        createWorkoutVisible: false,
        selectedWorkout: undefined,
        workouts: [workout,...this.state.workouts]
      })
    } else {
      this.setState({
        createWorkoutVisible: false,
      })
    }
  }

  render() {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: "75%",
        render: (text, record) => <a onClick={(e) => {e.stopPropagation(), this.showWorkoutEdit(e, record)}}>{record.name}</a> },
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
        width: "5%",
        dataIndex: '',
        key: 'x',
        render: (record) => <div style={{ "display": "flex" }}>
          <Button type="default" icon="copy" onClick={(e) => { { e.stopPropagation(), window.open(`/workouts/${record.id}`, "_blank") } }} />
        </div>,
      },
    ]

    return <div className="container">
      <Button type="primary" onClick={() => this.showWorkoutCreate()} style={{margin: "20px"}}>Add workout</Button>
      {this.state.createWorkoutVisible && <WorkoutCreateModal hideWorkoutCreate={this.hideWorkoutCreate} />}
      {this.state.selectedWorkout && <WorkoutEditModal visible={this.state.editWorkoutVisible} hideWorkoutEdit={this.hideWorkoutEdit} workout={this.state.selectedWorkout}/>}
      <Table
        columns={columns}
        expandedRowRender={record => <Exercises exercises={record.exercises} workoutId={record.id} allExercises={this.props.all_exercises}/>}
        dataSource={this.state.workouts}
        expandRowByClick={true}
        pagination={{ defaultPageSize: 15 }}
        expandIconAsCell={false}
        expandIconColumnIndex={-1}
      />
    </div>
  }
}

export default Workouts
