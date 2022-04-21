import React from "react"
import { Table } from "antd"

export default function ExercisesTable(props) {
  const {exercises, loading} = props
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Reps',
      dataIndex: 'reps',
      key: 'reps',
    },
    {
      title: 'Weight',
      dataIndex: 'weight',
      key: 'weight',
    }]

  return <div className="container">
    <Table
      dataSource={exercises}
      columns={columns}
      loading={loading}
    />
    </div>
}
