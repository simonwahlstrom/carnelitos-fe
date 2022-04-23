import React, { useState, useEffect } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { Radio, Spin, Switch } from "antd"
import SelectedFlexWorkoutTable from "./tables/selectedFlexWorkouts"
import FlexWorkoutTable from "./tables/flexWorkouts"
import SelectedFixedWorkoutTable from "./tables/selectedFixedWorkouts"
import FixedWorkoutTable from "./tables/fixedWorkouts"
import { SetScheduleType } from "../../services/schedule-service"
import Workouts from "../workouts/builder/workouts/workouts"
import { GetSettings } from '../../services/settings-service'

export default function Settings(props) {
  const [loading, setLoading] = useState(true)
  const [viewPublicWorkouts, setViewPublicWorkouts] = useState(false)
  const [selectedWorkouts, setSelectedWorkouts] = useState([])
  const [workouts, setWorkouts] = useState([])
  const [exercises, setExercises] = useState([])
  const [userId, setUserId] = useState(undefined)
  const [scheduleType, setScheduleType] = useState("flex")
  const SelectedWorkoutTable = scheduleType == "flex" ? SelectedFlexWorkoutTable : SelectedFixedWorkoutTable
  const WorkoutTable = scheduleType == "flex" ? FlexWorkoutTable : FixedWorkoutTable

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const data = await GetSettings()
    setWorkouts(data.workouts)
    setSelectedWorkouts(data.selected_workouts)
    setScheduleType(data.schedule_type)
    setExercises(data.exercises)
    setUserId(data.user)
    setLoading(false)
  }

  async function changeScheduleType(e) {
    const value = e.target.value
    await SetScheduleType({ change: true, type: value })
    fetchData()
  }

  if (loading) {
    return <Spin size="large" style={spinnerStyling} />
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
              defaultValue={scheduleType}
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
              user={userId}
            />
          </div>
        </TabPanel>
        <TabPanel key="3">
          <div className="container">
            <Workouts workouts={workouts.filter(item => item.owner == userId)} all_exercises={exercises} />
          </div>
        </TabPanel>
      </Tabs>
    </div>
  )
}

const spinnerStyling = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  minHeight: "100vh",
}
