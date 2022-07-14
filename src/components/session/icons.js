import React, { useState } from "react"
import { Button, Drawer } from "antd"
import { InfoCircleOutlined } from "@ant-design/icons"
import styled from "styled-components"
import ExerciseTabs from "../stats/exercise-tabs"
import YTSearch from "youtube-api-search"
import { GetToken } from "../../services/login-service"

export function Session(props) {
  const [exercises, setExercises] = useState(undefined)
  const [video, setVideo] = useState(undefined)
  const [infoPopupVisible, setInfoPopupVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  async function getHistory(name) {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${GetToken()}`,
    }

    setLoading(true)
    const response = await fetch(
      process.env.CARNE_API_URL + `/api/v1/stats?q=${name}&exact=true`,
      {
        headers: headers,
      },
    )
    if (response.ok) {
      const data = await response.json()
      setExercises(data.exercises)
    } else {
      console.log("TODO")
    }
    setLoading(false)
  }

  return (
    <div>
      <Drawer
        title="History"
        visible={infoPopupVisible}
        onClose={() => setInfoPopupVisible(false)}
        placement="right"
        width={"100%"}
      >
        <ExerciseTabs loading={loading} exercises={exercises} video={video} />
      </Drawer>
      <InfoCircleOutlined
        style={{
          marginRight: "10px",
          fontSize: 18,
          position: "relative",
          top: 5,
        }}
        onClick={event => {
          getHistory(props.name)
          setInfoPopupVisible(true)
          event.stopPropagation()
        }}
      />
    </div>
  )
}

export default Session
