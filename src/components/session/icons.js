import React, { useState } from "react"
import { Button, Icon, Modal } from 'antd'
import styled from 'styled-components'
import ExerciseTabs from "../stats/exercise-tabs"
import YTSearch from "youtube-api-search"

export function Session(props) {
  const [exercises, setExercises] = useState(undefined)
  const [video, setVideo] = useState(undefined)
  const [infoPopupVisible, setInfoPopupVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  async function getHistory(name) {
    setLoading(true)
    const response = await fetch(`http://localhost:3000/api/v1/stats?q=${name}&exact=true`)
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
      <IconStyling>
        <Icon
          type="info-circle"
          style={{ marginRight: "10px" }}
          onClick={event => {
            getHistory(props.name)
            videoSearch(props.name)
            setInfoPopupVisible(true)
            event.stopPropagation()
          }}
        />
      </IconStyling>
    </div>
  )
}

const IconStyling = styled.div`
  font-size: 20px;
`

export default Session
