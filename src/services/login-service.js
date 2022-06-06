import { Notification } from "../components/notifications/notification"

export async function CheckUser() {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }

  try {
    const response = await fetch(process.env.CARNE_API_URL + '/api/v1/login', {
      headers,
    })
    const valid = await response.json()
    return valid
  } catch (err) {
    Notification("Oh no!", "Seems like you don't have any internet connection", 1.5)
  }
}
