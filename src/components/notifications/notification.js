import { notification } from 'antd'

export function Notification(message, description, duration = 3) {
  notification.open({
    message: message,
    description: description,
    duration: duration,
  })
}
