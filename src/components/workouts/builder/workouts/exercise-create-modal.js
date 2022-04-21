import React from "react"
import { AutoComplete, Modal, Form, Input } from 'antd'

class ExerciseCreateModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      workout_id: this.props.workoutId,
      name: "",
      sets: "",
      reps: "",
      timer: "",
    }
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value })
  }

  handleNameChange = (value) => {
    this.setState({
      name: value,
    })
  }

  handleOk = async e => {
    const exercise = this.state
    await fetch('http://localhost:3000/api/v2/exercises', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(exercise)
    })
    .then((response) => response.json())
    .then((data) => {
      this.props.hideExerciseCreate(data)
    })
  }

  handleCancel = e => {
    this.props.hideExerciseCreate()
  }

  render() {
    return <Modal
      title={`Create exercise`}
      visible={true}
      onOk={this.handleOk}
      onCancel={this.handleCancel}
    >
      <Form layout="vertical">
        <Form.Item label="Name">
          <AutoComplete
            onChange={this.handleNameChange}
            name="name"
            dataSource={this.props.allExercises}
            placeholder="Name of exercise"
            filterOption={(inputValue, option) =>
              option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
            }
          />
        </Form.Item>
        <Form.Item label="Sets">
          <Input onChange={this.handleChange} name="sets" placeholder="Number of sets" />
        </Form.Item>
        <Form.Item label="Reps">
          <Input onChange={this.handleChange} name="reps" placeholder="Number of reps (can be range)"/>
        </Form.Item>
        <Form.Item label="Timer">
          <Input onChange={this.handleChange} name="timer" placeholder="Rest in minutes"/>
        </Form.Item>
      </Form>
    </Modal>
  }
}

export default ExerciseCreateModal
