import { Notification } from "../components/notifications/notification"
import { GetToken } from "./login-service"

export async function GetWorkouts() {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${GetToken()}`
  }

  try {
    const response = await fetch('http://localhost:3000/api/v2/home', {
      headers,
    })
    return await response.json()
  } catch (err) {
    Notification("Oh no!", "Seems like you don't have any internet connection", 1.5)
  }
}

export function StoreLocally(data) {
  try {
    if (data) {
      localStorage.setItem("workoutData", JSON.stringify(data))
    }
  } catch (err) {
    console.log(err)
  }
}

export function GetLocally() {
  const data = localStorage.getItem('workoutData')
  if (data) {
    return JSON.parse(data)
  }
}
