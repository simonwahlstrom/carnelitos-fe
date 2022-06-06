import React from "react"
import { List } from "antd"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import Workouts from "./workouts/workouts"
import Exercises from "./exercises/exercises"
import { LoginAsUser } from "../../services/admin-service"

export default function Admins(props) {
  async function loginUser(id) {
    const data = await LoginAsUser(id)
    window.location = "/"
  }

  return (
    <Tabs defaultIndex={0}>
      <TabList>
        <Tab key="1">Users</Tab>
        <Tab key="2">Workouts</Tab>
        <Tab key="3">Exercises</Tab>
      </TabList>

      <TabPanel key="1">
        <div className="container">
          <List
            size="small"
            header={<div>Users</div>}
            bordered
            dataSource={props.users}
            renderItem={item => <List.Item><a onClick={async () => loginUser(item.id)}>{item.email}</a></List.Item>}
          />
        </div>
      </TabPanel>

      <TabPanel key="2">
        <div className="container">
          <Workouts workouts={props.workouts} all_exercises={props.all_exercises} />
        </div>
      </TabPanel>

      <TabPanel key="3">
        <div className="container">
          <Exercises exercises={props.exercises} />
        </div>
      </TabPanel>
    </Tabs>
  )
}
