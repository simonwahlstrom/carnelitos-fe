import React from 'react'
import FooterButton from "./footer-button"
import styled from 'styled-components'

import {
  HomeOutlined,
  PlayCircleOutlined,
  LineChartOutlined,
  ScheduleOutlined,
 } from '@ant-design/icons'

export function Footer(props) {
  const path = window.location.pathname

  return (
    <>
      <div style={{ margin: "1px", height: "1px", width: "100%" }} />
      <FooterStyling>
        <div className='footer'>
          <FooterButton icon={HomeOutlined} active={true} url="/" highlighted={path === "/"} />
          <FooterButton icon={PlayCircleOutlined} active={props.activeWorkout} url="/session" highlighted={path === "/session"} />
          <FooterButton icon={LineChartOutlined} active={true} url="/stats" highlighted={path === "/stats"} />
          <FooterButton icon={ScheduleOutlined} active={true} url="/settings" highlighted={path === "/settings"} />
        </div>
      </FooterStyling>
    </>
  )
}

const FooterStyling = styled.div`
  .footer {
    height: 80px;
    position: fixed;
    display: flex;
    left: 0;
    bottom: 0;
    width: 100%;
    button {
      flex: auto;
      height: 5rem;
      border-radius: 0;
      border: none;
      color: #808080;
      background-color: #262629;
      &.highlighted {
        color: #fff;
      }
      &:disabled {
        color: #808080;
        background-color: #000000;
        opacity: 0.65;
      }
    }
  }
`;

export default Footer
