import React, { useState, useEffect } from "react"
import Schedule from "./schedule/schedule"
import { Sync } from "../../services/sync-manager"
import { Button, Spin } from "antd"
import {
  GetWorkouts,
  StoreLocally,
  GetLocally,
} from "../../services/workout-service"
import Skeleton from "../shared/skeleton"

export function Home(props) {
  const [loading, setLoading] = useState(true)
  const [workouts, setWorkouts] = useState([])
  const [activeWorkout, setActiveWorkout] = useState(false)

  function updateData(data) {
    if (data) {
      setWorkouts(data.workouts)
      setActiveWorkout(data.active_workout)
    }
  }

  useEffect(() => {
    Sync()
    const localData = GetLocally()
    if (localData) {
      updateData(localData)
    }
    const fetchData = async () => {
      const data = await GetWorkouts()
      updateData(data)
      StoreLocally(data)
      setLoading(false)
    }
    fetchData()
    setLoading(false)
  }, [])

  if (loading) {
    return <Skeleton />
  }

  if (Object.entries(workouts).length > 0) {
    const schedule = Array.isArray(workouts) ? "flex" : "fixed"
    return (
      <div>
        <Schedule
          schedule={schedule}
          activeWorkout={activeWorkout}
          workouts={workouts}
        />
      </div>
    )
  }

  return (
    <div className="Container" style={{ marginTop: "30px" }}>
      <p>Seems like you do not have any workouts yet...</p>
      <p>Get started now!</p>
      <p>
        <Button
          type="primary"
          size="large"
          onClick={() => (window.location = "/settings")}
        >
          Go to schedule
        </Button>
      </p>
    </div>
  )
}

export default Home
