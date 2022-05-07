import React from "react"
import { AutoComplete, Modal, Form, Input } from 'antd'
import { handleExercise } from "../../../services/exercises-service"

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
    const data = await handleExercise("", "POST", exercise)
    this.props.hideExerciseCreate(data)
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
            placeholder="name"
            filterOption={(inputValue, option) =>
              option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
            }
          />
        </Form.Item>
        <Form.Item label="Sets">
          <Input onChange={this.handleChange} name="sets" />
        </Form.Item>
        <Form.Item label="Reps">
          <Input onChange={this.handleChange} name="reps" />
        </Form.Item>
        <Form.Item label="Timer">
          <Input onChange={this.handleChange} name="timer" />
        </Form.Item>
      </Form>
    </Modal>
  }
}

export default ExerciseCreateModal
