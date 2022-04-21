import React from "react"
import { Menu, Dropdown, Icon } from 'antd';
export function DaySelector(props) {

  const menu = (
    <Menu>
      <Menu.Item>
        <a onClick={(e) => {e.stopPropagation(), props.moveToDay(props.id, props.day.toLowerCase(), "monday")}}>
          Monday
        </a>
      </Menu.Item>
      <Menu.Item>
        <a onClick={(e) => {e.stopPropagation(), props.moveToDay(props.id, props.day.toLowerCase(), "tuesday")}}>
          Tuesday
        </a>
      </Menu.Item>
      <Menu.Item>
        <a onClick={(e) => {e.stopPropagation(), props.moveToDay(props.id, props.day.toLowerCase(), "wednesday")}}>
          Wednesday
        </a>
      </Menu.Item>
      <Menu.Item>
        <a onClick={(e) => {e.stopPropagation(), props.moveToDay(props.id, props.day.toLowerCase(), "thursday")}}>
          Thursday
        </a>
      </Menu.Item>
      <Menu.Item>
        <a onClick={(e) => {e.stopPropagation(), props.moveToDay(props.id, props.day.toLowerCase(), "friday")}}>
          Friday
        </a>
      </Menu.Item>
      <Menu.Item>
        <a onClick={(e) => {e.stopPropagation(), props.moveToDay(props.id, props.day.toLowerCase(), "saturday")}}>
          Saturday
        </a>
      </Menu.Item>
      <Menu.Item>
        <a onClick={(e) => {e.stopPropagation(), props.moveToDay(props.id, props.day.toLowerCase(), "sunday")}}>
          Sunday
        </a>
      </Menu.Item>
    </Menu>
  )

  return (
    <Dropdown overlay={menu}>
      <a className="ant-dropdown-link" href="#">
        {props.day} <Icon type="down" />
      </a>
    </Dropdown>
  )
}

export default DaySelector
