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
    await fetch(process.env.CARNE_API_URL + '/api/v2/exercises/' + exercise.id, {
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
    await fetch(process.env.CARNE_API_URL + '/api/v2/exercises/' + this.props.exercise.id, {
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
      onOk={this.handleOk}
      onCancel={this.handleCancel}
      visible={true}
    >
      <Form layout="vertical">
        <Form.Item label="Name">
          <Input defaultValue={exercise.name} onChange={this.handleChange} name="name" />
        </Form.Item>
        <Form.Item label="Sets">
          <Input defaultValue={exercise.sets} onChange={this.handleChange} name="sets" />
        </Form.Item>
        <Form.Item label="Reps">
          <Input defaultValue={exercise.reps} onChange={this.handleChange} name="reps" />
        </Form.Item>
        <Form.Item label="Timer">
          <Input defaultValue={exercise.timer} onChange={this.handleChange} name="timer" />
        </Form.Item>
      </Form>
      {/* <Button type="danger" onClick={() => showConfirmDelete(this)}>Delete</Button> */}
    </Modal>
  }
}

export default ExerciseEditModal
