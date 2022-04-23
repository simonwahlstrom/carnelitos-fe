import React from "react"
import Schedule from '../home/schedule/schedule'

export function Users(props) {
  const schedule = Array.isArray(props.workouts) ? "flex" : "fixed"
  return <div>
    <Schedule
      schedule={schedule}
      activeWorkout={false}
      workouts={props.workouts} />
  </div>
}

export default Users
