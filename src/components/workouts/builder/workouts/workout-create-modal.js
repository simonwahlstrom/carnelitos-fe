import React from "react"
import { Modal, Form, Input, Switch } from 'antd'
import { GetToken } from "../../../../services/login-service"

class WorkoutCreateModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: "",
      tags: [],
      public: false,
    }
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value })
  }

  handleTagChange = ({ target }) => {
    this.setState({ tags: target.value.split(",") })
  }

  onChange = (checked) => {
    this.setState({ public: checked })
  }

  handleOk = async e => {
    const workout = this.state
    await fetch(process.env.CARNE_API_URL + '/api/v2/workouts', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GetToken()}`
      },
      body: JSON.stringify(workout)
    })
    .then((response) => response.json())
    .then((data) => {
      this.props.hideWorkoutCreate(data)
    })
  }

  handleCancel = e => {
    this.props.hideWorkoutCreate()
  }

  render() {
    return <Modal
      title={`Create workout`}
      visible={true}
      onOk={this.handleOk}
      onCancel={this.handleCancel}
    >
      <Form layout="vertical">
        <Form.Item label="Name">
          <Input onChange={this.handleChange} name="name" placeholder="Name of Workout" />
        </Form.Item>
        <Form.Item label="Tags">
          <Input defaultValue={this.state.tags} onChange={this.handleTagChange} name="tags" placeholder="Tags seperated by comma" />
        </Form.Item>
        <Form.Item>
          Public: <Switch name="public" defaultChecked={this.state.public} onChange={this.onChange} />
        </Form.Item>
      </Form>
    </Modal>
  }
}

export default WorkoutCreateModal
