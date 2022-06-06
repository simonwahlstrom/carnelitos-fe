import { Notification } from "../components/notifications/notification"
import { GetToken } from "./login-service"

export async function GetAdminData() {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${GetToken()}`
  }

  try {
    const response = await fetch(process.env.CARNE_API_URL + '/api/v2/admins', {
      headers,
    })
    return await response.json()
  } catch (err) {
    Notification("Oh no!", "Seems like you don't have any internet connection", 1.5)
  }
}

export async function LoginAsUser(id) {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${GetToken()}`
  }

  try {
    const response = await fetch(process.env.CARNE_API_URL + '/api/v2/admins/' + id, {
    headers,
    })
    return await response.json()
  } catch (err) {
    Notification("Oh no!", "Seems like you don't have any internet connection", 1.5)
  }
}
