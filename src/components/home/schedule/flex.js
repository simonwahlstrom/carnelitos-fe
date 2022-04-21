import React from 'react'
import Workout from './workout'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

export function Flex(props) {
  const { workouts, activeWorkout } = props
  return <Tabs>
    <TabList>
      {workouts.map((workout, id) => {
        return <Tab key={id}>
          <div>
            {workouts.length > 4 ? workout.name.substr(0, 3) : workout.name}
          </div>
        </Tab>
      })}
    </TabList>

    {workouts.map((workout, id) => {
      return <TabPanel key={id}>
        <Workout activeWorkout={activeWorkout} workout={workout} />
      </TabPanel>
    })}
  </Tabs>
}

export default Flex
