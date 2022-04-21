import React from "react"
import { Table, Button } from 'antd'
import ExerciseCreateModal from "./exercise-create-modal"
import ExerciseEditModal from "./exercise-edit-modal"

class Exercises extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      exercises: this.props.exercises,
      workoutId: this.props.workoutId,
      selectedExercise: undefined,
      editExerciseVisible: false,
      createExerciseVisible: false,
    }
  }

  showExerciseEdit = (e, record) => {
    this.setState({
      selectedExercise: record,
      editExerciseVisible: true,
    })
  }

  showExerciseCreate = () => {
    this.setState({
      createExerciseVisible: true,
    })
  }

  hideExerciseEdit = (exercise, remove = false) => {
    let updatedExercises = this.state.exercises
    if (exercise) {
      if (remove) {
        updatedExercises = this.state.exercises.filter(item => item.id !== exercise)
      } else {
        updatedExercises = this.state.exercises.map((el) => {
          if (el.id === exercise.id) {
            el = exercise
          }
          return el
        })
      }
    }

    this.setState({
      editExerciseVisible: false,
      selectedExercise: undefined,
      exercises: updatedExercises,
    })
  }

  hideExerciseCreate = (exercise) => {
    if (exercise) {
      this.setState({
        createExerciseVisible: false,
        selectedExercise: undefined,
        exercises: [...this.state.exercises, exercise]
      })
    } else {
      this.setState({
        createExerciseVisible: false,
      })
    }
  }

  render() {
    const columns = [
      { title: 'Name', dataIndex: 'name', key: 'exercise-name', render: (text, record) => <a onClick={(e) => this.showExerciseEdit(e, record)}>{record.name}</a> },
      { title: 'Sets', dataIndex: 'sets', key: 'sets' },
      { title: 'Reps', dataIndex: 'reps', key: 'reps' },
    ]

    return <div>
      <Button type="primary" onClick={() => this.showExerciseCreate()} style={{ margin: "20px" }}>Add Exercise</Button>
      {this.state.createExerciseVisible && <ExerciseCreateModal hideExerciseCreate={this.hideExerciseCreate} workoutId={this.props.workoutId} allExercises={this.props.allExercises} />}
      {this.state.selectedExercise && <ExerciseEditModal visible={this.state.editExerciseVisible} hideExerciseEdit={this.hideExerciseEdit} exercise={this.state.selectedExercise} />}
      <Table
        columns={columns}
        dataSource={this.state.exercises}
        pagination={{ defaultPageSize: 15, hideOnSinglePage: true }}
      />
      </div>
  }
}

export default Exercises
