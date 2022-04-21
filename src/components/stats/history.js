import React from "react"
import { Table, Spin } from 'antd'

export default function History(props) {

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
      { title: 'Name', dataIndex: 'name', key: 'name' },
      { title: 'Reps', dataIndex: 'reps', key: 'reps' },
      { title: 'Weight', dataIndex: 'weight', key: 'weight' },
    ]

    return <Table
      columns={columns}
      dataSource={data.flat()}
      pagination={{ defaultPageSize: 20, hideOnSinglePage: true }}
    />
  }

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Completed', dataIndex: 'finished', key: 'finished' },
  ]

  if (props.loadingHistory) {
    return <Spin size="large" style={spinnerStyling} />
  }
  return <div className="container">
      <Table
        columns={columns}
        expandedRowRender={record => exercises(record.exercises)}
        dataSource={props.history}
        expandRowByClick={true}
        pagination={{ defaultPageSize: 15 }}
      />
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
