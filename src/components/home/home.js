import React, { useState, useEffect } from 'react'
import Schedule from './schedule/schedule'
import { Sync } from '../../services/sync-manager'
import { Button, Spin} from "antd"
import { GetWorkouts, StoreLocally, GetLocally } from '../../services/workout-service'

export function Home(props) {
  Sync()

  const [loading, setLoading] = useState(true)
  const [workouts, setWorkouts] = useState([])
  const [activeWorkout, setActiveWorkout] = useState(false)

  const fetchData = async () => {
    const data = await GetWorkouts()
    if (data) {
      updateData(data)
      StoreLocally(data)
    }
    setLoading(false)
  }

  function updateData(data) {
    if (data) {
      setWorkouts(data.workouts)
      setActiveWorkout(data.active_workout)
    }
    setLoading(false)
  }

  useEffect(() => {
    const localData = GetLocally()
    if (localData) {
      updateData(localData)
    }
    fetchData()
  }, [])

  if (loading) {
    return <Spin size="large" style={spinnerStyling} />
  }
  if (Object.entries(workouts).length > 0) {
    const schedule = Array.isArray(workouts) ? "flex" : "fixed"
    return <div>
      <Schedule
        schedule={schedule}
        activeWorkout={activeWorkout}
        workouts={workouts} />
    </div>
  }

  return <div className="Container" style={{marginTop: "30px"}}>
    <p>Seems like you don't have any workouts yet...</p>
    <p>Get started now!</p>
    <p><Button type="primary" size="large" onClick={() => window.location = "/settings"}>Go to schedule</Button></p>
  </div>

}

const spinnerStyling = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  minHeight: "100vh",
}

export default Home
