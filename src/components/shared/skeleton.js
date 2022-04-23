import React from 'react'
import { Spin } from "antd";
import Image from "next/image"
import { TabList, TabPanel, Tabs, Tab } from "react-tabs";
import Footer from "../layout/footer";

export default function Skeleton(props) {
  function renderView() {
    if (props.offline) {
      return (
        <div>
          <div style={{ marginLeft: "auto", marginRight: "auto", width: "250px", marginTop: "50px" }}>
            <Image src="/carneicon.png" width="250px" height="360px" alt="Carne" />
          </div>
          <p>You are offline ;(</p>
        </div>
      )
    }

    return <Spin size="large" style={spinnerStyling} />
  }
  return (
    <>
      <Tabs>
        <TabList>
          <Tab>
            Carnelitos
          </Tab>
        </TabList>
        <TabPanel>
          {renderView()}
        </TabPanel>
      </Tabs>
      <Footer activeWorkout={false} skeleton={true} />
    </>
  )
}

const spinnerStyling = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  minHeight: "100vh",
}
