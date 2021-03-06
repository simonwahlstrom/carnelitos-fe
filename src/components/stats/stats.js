import React, { useState, useEffect } from 'react'
import History from "./history"
import { Overview } from "./overview"
import { AutoComplete } from "antd"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import ExerciseTabs from "./exercise-tabs"
import { GetAllExercises, GetStats } from '../../services/stats-service'

export default function Stats() {
  const [exercises, setExercises] = useState(undefined)
  const [message, setMessage] = useState(undefined)
  const [loading, setLoading] = useState(false)

  const [loadingHistory, setLoadingHistory] = useState(true)
  const [history, setHistory] = useState([])
  const [overview, setOverview] = useState([])
  const [allExercises, setAllExercises] = useState([])


  useEffect(() => {
    async function fetchData() {
      let data = await GetStats("history=true")
      setHistory(data)
      setLoadingHistory(false)
    }
    fetchData()
  }, [])

  useEffect(() => {
    async function fetchData() {
      let data = await GetStats("overview=true")
      setOverview(data)
    }
    fetchData()
  }, [])

  useEffect(() => {
    async function fetchData() {
      let data = await GetAllExercises()
      setAllExercises(data.all_exercises)
    }
    fetchData()
  }, [])

  function handleInputChange(value) {
    // $(".stats input")[0].blur()
    setLoading(true)
    fetchExercises(value)
  }

  async function fetchExercises(query) {
    const data = await GetStats(`q=${query}&exact=true`)
    setLoading(false)
    if(data.message) {
      setMessage(data.message)
    } else {
      setExercises(data.exercises)
      setMessage(undefined)
    }
  }

  return (
    <div className="stats">
      <Tabs defaultIndex={0}>
        <TabList>
          <Tab key="1">Progress</Tab>
          <Tab key="2">History</Tab>
          <Tab key="3">Overview</Tab>
        </TabList>

        <TabPanel key="1">
          <div className="container">
            <AutoComplete
              style={{ width: "100%", marginBottom: "10px", marginTop: "10px", fontSize: "16px" }}
              allowClear={true}
              size="large"
              dataSource={allExercises}
              placeholder="Search for exercises"
              onSelect={handleInputChange}
              filterOption={(inputValue, option) =>
                option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
              }
            />
            {message && <div >{message}</div>}
            <ExerciseTabs
              loading={loading}
              exercises={exercises}
            />
          </div>
        </TabPanel>

        <TabPanel key="2">
          <History loadingHistory={loadingHistory} history={history}/>
        </TabPanel>

        <TabPanel key="3">
          <Overview overview={overview} history={history}/>
        </TabPanel>
      </Tabs>
    </div>
  )
}
