import { Notification } from "../components/notifications/notification"

export async function CheckToken() {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${GetToken()}`
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

export function DeleteToken() {
  try {
    localStorage.removeItem("token")
  } catch (err) {
    console.log(err)
  }
}

export function StoreToken(token) {
  try {
    if (token) {
      localStorage.setItem("token", token)
    }
  } catch (err) {
    console.log(err)
  }
}

export function GetToken() {
  try {
    const data = localStorage.getItem('token')
    return data
  } catch (err) {
    console.log(err)
  }
}
