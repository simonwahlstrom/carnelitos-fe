import React, { useState } from "react"
import ToggleButton from "./toggle-button"
import { Notification } from "../notifications/notification"
import { SaveSet } from "../../services/session-service"

export function Exercise(props) {
  const [data, setData] = useState(props.data.sets)
  const [loading, setLoading] = useState(false)

  async function saveSet(index) {
    setLoading(true)
    const newData = [...data]
    const set = {
      set: {
        name: props.data.name,
        weight: data[index].weight,
        reps: data[index].reps,
        completed: !data[index].completed,
      },
      id: props.sessionId,
      index: index
    }

    newData[index].completed = !data[index].completed
    setData(newData)

    if (newData[index].completed) {
      props.startTimer(props.timer)
    } else {
      props.stopTimer()
    }

    setLoading(false)

    await SaveSet(set)
  }

  function updateValue(e, index) {
    // $(e.target).removeClass('is-invalid')
    const newData = [...data]
    const value = e.target.value
    const name = e.target.name
    newData[index][name] = value

    setData(newData)
  }

  function exercise() {
    return <React.Fragment>
      <tr>
        <td style={{width: "50%"}}>Weight</td>
        <td style={{ width: "40%" }}>{props.exercise.reps}</td>
        <td style={{ width: "10%" }}></td>
      </tr>
      {exerciseData()}
    </React.Fragment>
  }

  function exerciseData() {
    return data.map((e, index) => {
      return <React.Fragment key={index}>
        <tr>
          <td style={{ width: "65%" }}>
            <input
              name="weight"
              type="number"
              className="form-control weight"
              defaultValue={e.weight}
              onChange={(e) => updateValue(e, index)}
            />
          </td>
          <td style={{ width: "25%" }}>
            <input
              name="reps"
              type="number"
              className="form-control reps"
              defaultValue={e.reps}
              onChange={(e) => updateValue(e, index)}
            />
          </td>
          <td style={{ width: "10%" }}>
            <ToggleButton
              loading={loading}
              completed={e.completed}
              saveSet={saveSet}
              index={index}
              disabled={!e.reps || e.reps.length < 1 || !e.weight || e.weight.length < 1} />
          </td>
        </tr>
      </React.Fragment>
    })
  }

  return (
    <table className="table table-sm">
      <tbody>
        {exercise()}
      </tbody>
    </table>
    )

}

export default Exercise
