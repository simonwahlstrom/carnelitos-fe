import React from 'react'
import FooterButton from "./footer-button"
import styled from 'styled-components'

export function Footer(props) {
  const path = window.location.pathname
  let footer
  if (props.logged_in) {
    footer =
    <div className='footer'>
      <FooterButton name="home" active={true} url="/" highlighted={path === "/"} />
      <FooterButton name="play-circle" active={props.active_workout} url="/sessions/new" highlighted={path === "/sessions/new"} />
      <FooterButton name="line-chart" active={true} url="/stats" highlighted={path === "/stats"} />
      <FooterButton name="schedule" active={true} url="/settings" highlighted={path === "/settings"} />
    </div>
  } else {
    footer =
      <div className='footer'>
        <FooterButton name="home" active={true} url="/" highlighted={path === "/"} />
        <FooterButton name="user" active={true} url="/users/sign_in" highlighted={path === "/users/sign_in"} />
      </div>
  }
  return (
    <FooterStyling>
      {footer}
    </FooterStyling>
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
      }
    }
  }
`;

export default Footer
