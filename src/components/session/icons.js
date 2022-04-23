import React, { useState } from "react"
import { Button, Modal } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import styled from 'styled-components'
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
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GetToken()}`
    }

    setLoading(true)
    const response = await fetch(process.env.CARNE_API_URL + `/api/v1/stats?q=${name}&exact=true`, {
      headers: headers,
    })
    if (response.ok) {
      const data = await response.json()
      setExercises(data.exercises)
    } else {
      console.log("TODO")
    }
    setLoading(false)
  }

  function videoSearch(name) {
    YTSearch({ key: "AIzaSyC8RMBxjqtC8Bz-e9l0xwQ4TJjXJsrkVVo", term: name }, videos => {
      setVideo(videos[0].id.videoId)
    })
  }

  return (
    <div>
      <Modal
        title="History"
        visible={infoPopupVisible}
        onOk={() => setInfoPopupVisible(false)}
        onCancel={() => setInfoPopupVisible(false)}
        footer={
          <Button key="OK" onClick={() => setInfoPopupVisible(false)}>
            Close
            </Button>}
      >
        <ExerciseTabs loading={loading} exercises={exercises} video={video} />
      </Modal>
      <InfoCircleOutlined
        style={{ marginRight: "10px" }}
        onClick={event => {
          getHistory(props.name)
          videoSearch(props.name)
          setInfoPopupVisible(true)
          event.stopPropagation()
        }}
      />

    </div>
  )
}

const IconStyling = styled.div`
  font-size: 20px;
`

export default Session
