import React, { useState } from "react"
import { Table, Spin, Drawer } from "antd"

export default function History(props) {
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [drawerTitle, setDrawerTitle] = useState("")
  const [selectedExercises, setSelectedExercises] = useState([])

  function exercises(exercises) {
    const data = exercises.map(e => {
      return e.sets.map((s, index) => {
        return {
          key: `${e.name}-${index}`,
          name: e.name,
          reps: s.reps,
          weight: s.weight,
        }
      })
    })
    const columns = [
      { title: "Name", dataIndex: "name", key: "name" },
      { title: "Weight", dataIndex: "weight", key: "weight" },
      { title: "Reps", dataIndex: "reps", key: "reps" },
    ]

    return (
      <Table
        columns={columns}
        dataSource={data.flat()}
        pagination={{ defaultPageSize: 20, hideOnSinglePage: true }}
      />
    )
  }

  function openDrawer(exercises, title) {
    setSelectedExercises(exercises)
    setDrawerTitle(title)
    setDrawerVisible(true)
  }

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Completed", dataIndex: "finished", key: "finished" },
  ]

  if (props.loadingHistory) {
    return <Spin size="large" style={spinnerStyling} />
  }
  return (
    <div className="container">
      <Table
        columns={columns}
        dataSource={props.history}
        pagination={{ defaultPageSize: 15 }}
        onRow={(record, index) => {
          return {
            onClick: event => {
              openDrawer(
                record.exercises,
                `${record.name} - ${record.finished}`,
              )
            },
          }
        }}
      />
      <Drawer
        title={drawerTitle}
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        placement="right"
      >
        {exercises(selectedExercises)}
      </Drawer>
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
