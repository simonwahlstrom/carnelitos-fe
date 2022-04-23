import React, { useEffect, useState } from "react"
import Exercise from "./exercise"
import Timer from "./timer"
import { Notification } from "../notifications/notification"
import { Button, Collapse, Popconfirm, Spin } from "antd"
import styled from "styled-components"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import { SaveOffline, RemoveOffline } from "../../services/sync-manager"
import {
  SaveSession,
  DeleteSession,
  GetActiveSession,
} from "../../services/session-service"
import Icons from "./icons"
import Skeleton from "../shared/skeleton"
import { useRouter } from "next/router"

export function Session() {
  const [loading, setLoading] = useState(true)
  const [workout, setWorkout] = useState(undefined)
  const [session, setSession] = useState(undefined)
  const [deadline, setDeadline] = useState(
    new Date(localStorage.getItem("timer")),
  )

  const router = useRouter()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const data = await GetActiveSession()
    setWorkout(data.workout)
    const localSession = JSON.parse(
      localStorage.getItem(`session-${data.session.id}`),
    )
    setSession(localSession ? localSession : data.session)
    setLoading(false)
  }

  function renderExercises(exercises, session) {
    const data = session.exercises
    const { Panel } = Collapse
    return exercises.map((e, index) => {
      const isCompleted = Object.values(data[index].sets).every(
        item => item.completed,
      )
      return (
        <Panel
          header={e.name}
          key={index}
          forceRender={true}
          showArrow={false}
          extra={<Icons name={e.name} />}
          style={
            isCompleted
              ? { background: "#67c172", textAlign: "center" }
              : { textAlign: "center" }
          }
        >
          <Exercise
            exercise={e}
            data={data[index]}
            sessionId={session.id}
            timer={e.timer}
            startTimer={startTimer}
            stopTimer={stopTimer}
          />
        </Panel>
      )
    })
  }

  async function cancelWorkout() {
    setLoading(true)
    stopTimer()
    try {
      await DeleteSession(session)
      router.push("/")
    } catch (err) {
      setLoading(false)
      Notification(
        "No connection",
        "Seems like there is no connection. Try to delete again later",
      )
    }
  }

  function startTimer(minutes) {
    SaveOffline(session)
    const currentDate = new Date()
    const newDate = new Date(currentDate.getTime() + minutes * 60000)
    localStorage.setItem("timer", newDate)
    setDeadline(newDate)
  }

  function stopTimer() {
    SaveOffline(session)
    setDeadline(null)
    localStorage.setItem("timer", null)
  }

  function verifyWorkout() {
    let valid = true
    const sets = session.exercises.flatMap(e => e.sets)
    sets.map((s, index) => {
      if (!s.weight || s.weight.length < 1) {
        valid = false
      }
      if (!s.reps || s.reps.length < 1) {
        valid = false
      }
    })
    if (!valid) {
      Notification(
        "Verification failed",
        "You have not filled in all values. Don't lose your gains!",
      )
    }
    return valid
  }

  async function saveWorkout() {
    SaveOffline(session)

    if (!verifyWorkout()) {
      return
    }
    setLoading(true)
    const response = await SaveSession(session)

    if (response && response.ok) {
      RemoveOffline(session.id)
      router.push("/")
    } else {
      setLoading(false)
      Notification(
        "Something went wrong!",
        "Don't worry, we will sync your data later!",
      )
    }
  }

  if (loading) {
    return <Skeleton />
  }

  return (
    <Tabs>
      <TabList>
        <Tab key={1}>
          <div className="name">{workout.name}</div>
        </Tab>
      </TabList>
      <TabPanel key={1}>
        <div className="container">
          {deadline > new Date() && <Timer stopTimer={stopTimer} />}
          <Collapse accordion style={{ fontSize: "18px" }}>
            {renderExercises(workout.exercises, session)}
          </Collapse>
          <ButtonStyling className="buttons">
            <Popconfirm
              placement="top"
              title="Save workout session"
              onConfirm={saveWorkout}
              okText="Yes"
              cancelText="No"
            >
              <Button loading={loading} type="primary">
                Save
              </Button>
            </Popconfirm>
            <Popconfirm
              placement="top"
              title="Delete workout session"
              onConfirm={cancelWorkout}
              okText="Yes"
              cancelText="No"
            >
              <Button loading={loading} type="danger">
                Cancel
              </Button>
            </Popconfirm>
          </ButtonStyling>
        </div>
      </TabPanel>
    </Tabs>
  )
}

const ButtonStyling = styled.div`
  display: flex;
  margin-top: 1rem;
  justify-content: space-between;

  button {
    height: 2.4rem;
    width: 45%;
  }
`

export default Session
