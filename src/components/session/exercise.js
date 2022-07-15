import React, { useState } from "react"
import ToggleButton from "./toggle-button"
import { Notification } from "../notifications/notification"
import { SaveSet } from "../../services/session-service"
import { Input } from "antd"

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

  function exerciseData() {
    return data.map((e, index) => {
      return <React.Fragment key={index}>
        <tr style={{ height: 60 }}>
          <td style={{ width: "35%", padding: 0}}>
            <Input
              style={{ height: 60 }}
              prefix="Weight: "
              step="0.01"
              inputMode="decimal"
              name="weight"
              className="form-control weight"
              defaultValue={e.weight}
              onChange={(e) => updateValue(e, index)}
            />
          </td>
          <td style={{ width: "50%", padding: 0}}>
            <Input
              style={{ height: 60 }}
              prefix={`Reps (${props.exercise.reps}): `}
              pattern="\d*"
              name="reps"
              type="number"
              className="form-control reps"
              defaultValue={e.reps}
              onChange={(e) => updateValue(e, index)}
            />
          </td>
          <td style={{ width: "10%" , padding: 0}}>
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
    <table style={{ width: "100%" }}>
      <tbody>
        {exerciseData()}
      </tbody>
    </table>
    )

}

export default Exercise
