import React from 'react'
import Flex from "./flex"
import Fixed from "./fixed"

export function Schedule(props) {
  const { schedule, activeWorkout } = props
  if (schedule == "flex") {
    return <Flex workouts={props.workouts} activeWorkout={activeWorkout} />
  }
  return <Fixed workouts={props.workouts} activeWorkout={activeWorkout} />
}

export default Schedule
