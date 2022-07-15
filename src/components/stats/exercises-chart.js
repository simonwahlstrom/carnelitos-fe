import React from 'react'
import {
  LineChart, Line, Legend, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'

export default function ExercisesChart(props) {
  const exercises = props.exercises.slice()
  const min = exercises.reduce((min, p) => parseInt(p.weight) < min ? parseInt(p.weight) : min, parseInt(exercises[0].weight))
  const max = exercises.reduce((max, p) => parseInt(p.weight) > max ? parseInt(p.weight) : max, parseInt(exercises[0].weight))
  const data = exercises.reverse().map(e => {
    return {
      weight: e.weight.replace(/,/g, '.'), date: e.date, reps: e.reps,
    }
  })

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{
          top: 5, right: 20, left: -20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis domain={[min - 20, max + 20]}/>
        <Tooltip />
        <Legend />
        {props.weight && <Line type="monotone" dot={false} dataKey="weight" stroke="#fc0303" />}
        {props.reps && <Line type="monotone" dot={false} dataKey="reps" stroke="#032cfc" />}
      </LineChart>
    </ResponsiveContainer>
  )
}
