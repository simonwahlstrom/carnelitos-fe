import React from "react"
import { Modal, Form, Input, Button, Switch } from 'antd'

class WorkoutEditModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      id: this.props.workout.id,
      name: this.props.workout.name,
      tags: this.props.workout.tags,
      public: this.props.workout.public,
    }
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value })
  }

  onChange = (checked) => {
    this.setState({ public: checked })
  }

  handleTagChange = ({ target }) => {
    this.setState({ tags: target.value.split(",") })
  }

  handleOk = async e => {
    const workout = this.state
    await fetch('/api/v2/workouts/' + workout.id, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(workout)
    })
    this.props.hideWorkoutEdit(workout)
  }

  handleCancel = e => {
    this.props.hideWorkoutEdit()
  }

  deleteWorkout = async () => {
    await fetch('/api/v2/workouts/' + this.props.workout.id, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    this.props.hideWorkoutEdit(this.props.workout.id, true)
  }


  render() {
    const { confirm } = Modal
    async function showConfirmDelete(self) {
      confirm({
        title: 'Do you want to delete this workout?',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
          self.deleteWorkout()
        },
        onCancel() {
        },
      })
    }
    const { workout } = this.props
    return <Modal
      title={`Edit ${workout.name}` }
      visible={this.props.visible}
      onOk={this.handleOk}
      onCancel={this.handleCancel}
    >
      <Form layout="vertical">
        <Form.Item label="Name">
          <Input defaultValue={workout.name} onChange={this.handleChange} name="name" placeholder="Name of Workout"/>
        </Form.Item>
        <Form.Item label="Tags">
          <Input defaultValue={workout.tags} onChange={this.handleTagChange} name="tags" placeholder="Tags seperated by comma"/>
        </Form.Item>
        <Form.Item>
          Public: <Switch name="public" defaultChecked={workout.public} onChange={this.onChange} />
        </Form.Item>
      </Form>
      <Button type="danger" onClick={() => showConfirmDelete(this)}>Delete</Button>
    </Modal>
  }
}

export default WorkoutEditModal
