import React, { useState } from "react"
import { Spin } from "antd"
import YouTube from "react-youtube"

export function YoutubePlayer(props) {
  const [ready, setReady] = useState(false)
  const opts = {
    height: '390',
    width: '100%',
    playerVars: { // https://developers.google.com/youtube/player_parameters
      autoplay: 0
    }
  };

  return <React.Fragment>
    <Spin hidden={ready} size="large" style={{ paddingLeft: "50%" }} />
    <div hidden={!ready}>
      <YouTube
        videoId={props.id}
        opts={opts}
        onReady={(() => setReady(true))}
      />
    </div>
    </React.Fragment>
}

export default YoutubePlayer
