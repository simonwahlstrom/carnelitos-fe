import { Notification } from "../components/notifications/notification"

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
}

export async function GetWorkouts() {
  try {
    const response = await fetch('/api/v2/', {
      headers,
    })
    return await response.json()
  } catch (err) {
    Notification("Oh no!", "Seems like you don't have any internet connection", 1.5)
  }
}

export function StoreLocally(data) {
  try {
    localStorage.setItem("workoutData", JSON.stringify(data))
  } catch (err) {
    console.log(err)
  }
}

export function GetLocally() {
  return JSON.parse(localStorage.getItem('workoutData'))
}
