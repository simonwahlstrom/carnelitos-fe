import React, { useState } from "react"
import ExercisesTable from "./exercises-table"
import ExercisesChart from "./exercises-chart"
import { Tabs, Switch, Spin } from "antd"
import YoutubePlayer from "../session/youtube-player"

export function ExerciseTabs(props) {
  const [activeTab, setActiveTab] = useState("x")
  const [weight, setWeight] = useState(true)
  const [reps, setReps] = useState(false)

  function onChange(key, event) {
    event.stopPropagation()
    setActiveTab(key)
  }

  if (props.loading) {
    return <Spin size="large" style={{ paddingLeft: "50%" }} />
  }

  return (
    <Tabs activeKey={activeTab} onTabClick={onChange}>
      <Tabs.TabPane tab="Data" key="x" disabled={!props.exercises}>
        {props.exercises && <ExercisesTable
          exercises={props.exercises}
        />}
      </Tabs.TabPane>
      <Tabs.TabPane tab="Graph" key="y" disabled={!props.exercises}>
        <div className="chart">
          {props.exercises && props.exercises.length > 0 && <React.Fragment>
            <div className="switches" style={{ textAlign: "center", marginBottom: "20px" }}>
              <Switch style={{ marginRight: "10px" }} name="weight" checkedChildren="Weight" unCheckedChildren="Weight" defaultChecked={weight} onChange={(e) => setWeight(e)} />
              <Switch style={{ marginRight: "10px" }} name="reps" checkedChildren="Reps" unCheckedChildren="Reps" defaultChecked={reps} onChange={(e) => setReps(e)} />
            </div>
            <ExercisesChart
              weight={weight}
              reps={reps}
              exercises={props.exercises}
            />
          </React.Fragment>
          }
        </div>
      </Tabs.TabPane>
      <Tabs.TabPane tab="Video" key="z" disabled={!props.exercises}>
        <div className="video">
          <YoutubePlayer id={props.video} />
        </div>
      </Tabs.TabPane>
    </Tabs>
  )
}

export default ExerciseTabs
