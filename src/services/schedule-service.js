import { Notification } from "../components/notifications/notification"

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
}

export async function AddToSchedule(body) {
  try {
    const response = await fetch('/schedules', {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    })
    Notification("Schedule updated", "The workout has been added!", 1.5)
    return response
  } catch (err) {
    Notification("Oh no!", "The schedule could not be updated. Please try again!", 1.5)
  }
}

export async function MoveToDay(body) {
  try {
    const response = await fetch('/schedules/' + body.id, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(body)
    })
    return response
  } catch (err) {
    Notification("Oh no!", "The schedule could not be updated. Please try again!", 1.5)
  }
}

export async function RemoveFromFlexibleSchedule(body) {
  try {
    const response = await fetch('/schedules/' + body.id, {
      method: 'DELETE',
      headers,
      body: JSON.stringify(body)
    })
    return response
  } catch (err) {
    Notification("Oh no!", "The schedule could not be updated. Please try again!", 1.5)
  }
}

export async function RemoveFromFixedSchedule(body) {
  try {
    const response = await fetch('/schedules/' + body.id, {
      method: 'DELETE',
      headers,
      body: JSON.stringify(body)
    })
    return response
  } catch (err) {
    Notification("Oh no!", "The schedule could not be updated. Please try again!", 1.5)
  }
}

export async function ChangeOrderOfFlexibleSchedule(body) {
  try {
    const response = await fetch('/schedules/1', {
      method: 'PATCH',
      headers,
      body: JSON.stringify(body)
    })
    return response
  } catch (err) {
    Notification("Oh no!", "The schedule could not be updated. Please try again!", 1.5)
  }
}

export async function SetScheduleType(body) {
  try {
    const response = await fetch('/schedules/1', {
      method: 'PATCH',
      headers,
      body: JSON.stringify(body)
    })
    return response
  } catch (err) {
    Notification("Oh no!", "The schedule could not be updated. Please try again!", 1.5)
  }
}
