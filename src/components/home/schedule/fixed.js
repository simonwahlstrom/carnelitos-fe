import React from 'react'
import Workout from './workout'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

export function Fixed(props) {
  const { workouts, activeWorkout } = props
  const days = Object.keys(workouts)
  const tabs = Object.values(workouts)
  return <Tabs>
    <TabList>
      {days.map((day, index) => {
        return <Tab key={index}>
          <div>
            {days.length > 4 ? day.substr(0, 3) : day}
          </div>
        </Tab>
      })}
    </TabList>

    {tabs.map((workouts, index) => {
      return <TabPanel key={index}>
        {workouts.map((workout) => {
          return <Workout key={workout.id} activeWorkout={activeWorkout} workout={workout} />
        })}
      </TabPanel>
    })}
  </Tabs>
}

export default Fixed
