import React from "react"
import { Modal, Form, Input, Button } from 'antd'

class ExerciseEditModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      id: this.props.exercise.id,
      name: this.props.exercise.name,
      sets: this.props.exercise.sets,
      reps: this.props.exercise.reps,
      timer: this.props.exercise.timer,
    }
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value })
  }

  handleOk = async e => {
    const exercise = this.state
    await fetch('/exercises/' + exercise.id, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(exercise)
    })
    this.props.hideExerciseEdit(exercise)
  }

  handleCancel = e => {
    this.props.hideExerciseEdit()
  }

  deleteExercise = async () => {
    await fetch('/exercises/' + this.props.exercise.id, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    this.props.hideExerciseEdit(this.props.exercise.id, true)
  }


  render() {
    const { confirm } = Modal
    async function showConfirmDelete(self) {
      confirm({
        title: 'Do you want to delete this exercise?',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
          self.deleteExercise()
        },
        onCancel() {
        },
      })
    }
    const { exercise } = this.props
    return <Modal
      title={`Edit ${exercise.name}`}
      visible={this.props.visible}
      onOk={this.handleOk}
      onCancel={this.handleCancel}
    >
      <Form layout="vertical">
        <Form.Item label="Name">
          <Input defaultValue={exercise.name} onChange={this.handleChange} name="name" placeholder="Name of exercise" />
        </Form.Item>
        <Form.Item label="Sets">
          <Input defaultValue={exercise.sets} onChange={this.handleChange} name="sets" placeholder="Number of sets" />
        </Form.Item>
        <Form.Item label="Reps">
          <Input defaultValue={exercise.reps} onChange={this.handleChange} name="reps" placeholder="Number of reps (can be range)" />
        </Form.Item>
        <Form.Item label="Timer">
          <Input defaultValue={exercise.timer} onChange={this.handleChange} name="timer" placeholder="Rest in minutes" />
        </Form.Item>
      </Form>
      <Button type="danger" onClick={() => showConfirmDelete(this)}>Delete</Button>
    </Modal>
  }
}

export default ExerciseEditModal
