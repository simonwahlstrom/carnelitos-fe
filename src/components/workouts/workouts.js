import React, { useState } from "react"
import Workout from "../home/schedule/workout"

export function Workouts(props) {
  return (
    <Workout workout={props.workout} />
  )
}

export default Workouts
