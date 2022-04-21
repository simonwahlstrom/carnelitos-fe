import React, { useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { Radio, Switch } from "antd"
import SelectedFlexWorkoutTable from "./tables/selectedFlexWorkouts"
import FlexWorkoutTable from "./tables/flexWorkouts"
import SelectedFixedWorkoutTable from "./tables/selectedFixedWorkouts"
import FixedWorkoutTable from "./tables/fixedWorkouts"
import { SetScheduleType } from "../../services/schedule-service"
import Workouts from "../workouts/builder/workouts/workouts"

export default function Settings(props) {
  const [selectedWorkouts, setSelectedWorkouts] = useState(props.selectedWorkouts)
  const [viewPublicWorkouts, setViewPublicWorkouts] = useState(false)
  const [scheduleType] = useState(props.scheduleType)
  const [workouts] = useState(props.workouts)
  const SelectedWorkoutTable = scheduleType == "flex" ? SelectedFlexWorkoutTable : SelectedFixedWorkoutTable
  const WorkoutTable = scheduleType == "flex" ? FlexWorkoutTable : FixedWorkoutTable

  async function changeScheduleType(e) {
    const value = e.target.value
    await SetScheduleType({ change: true, type: value })
    location.reload()
  }

  return (
    <div className="settings">
      <Tabs>
        <TabList>
          <Tab key="1">Schedule</Tab>
          <Tab key="2">Workouts</Tab>
          <Tab key="3">Builder</Tab>
        </TabList>

        <TabPanel key="1">
          <div className="container">
            <Radio.Group
              onChange={changeScheduleType}
              defaultValue={props.scheduleType}
              buttonStyle="solid"
              size="large"
              style={{width: "100%", textAlign: "center", marginBottom: "30px"}}>
              <Radio.Button value="flex" style={{width: "50%"}}>Flex</Radio.Button>
              <Radio.Button value="fixed" style={{ width: "50%" }}>Fixed</Radio.Button>
            </Radio.Group>
            <SelectedWorkoutTable
              setSelectedWorkouts={setSelectedWorkouts}
              workouts={selectedWorkouts}
              scheduleType={scheduleType}
            />
          </div>
        </TabPanel>

        <TabPanel key="2">
          <div className="container">
            <p>
              See public workouts: <Switch defaultChecked={viewPublicWorkouts} onChange={(e) => setViewPublicWorkouts(e)} />
            </p>
            <WorkoutTable
              selectedWorkouts={selectedWorkouts}
              setSelectedWorkouts={setSelectedWorkouts}
              workouts={workouts}
              viewPublicWorkouts={viewPublicWorkouts}
              user={props.user}
            />
          </div>
        </TabPanel>
        <TabPanel key="3">
          <div className="container">
            <Workouts workouts={props.workouts.filter(item => item.owner == props.user)} all_exercises={props.exercises} />
          </div>
        </TabPanel>
      </Tabs>
    </div>
  )
}
