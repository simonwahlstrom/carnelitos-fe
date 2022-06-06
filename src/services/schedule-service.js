import { Notification } from "../components/notifications/notification"

export async function AddToSchedule(body) {
    const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }

  try {
    const response = await fetch(process.env.CARNE_API_URL + '/api/v2/schedules', {
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
    const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }

  try {
    const response = await fetch(process.env.CARNE_API_URL + '/api/v2/schedules/' + body.id, {
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
    const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }

  try {
    const response = await fetch(process.env.CARNE_API_URL + '/api/v2/schedules/' + body.id, {
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
    const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }

  try {
    const response = await fetch(process.env.CARNE_API_URL + '/api/v2/schedules/' + body.id, {
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
    const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }

  try {
    const response = await fetch(process.env.CARNE_API_URL + '/api/v2/schedules/1', {
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
    const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }

  try {
    const response = await fetch(process.env.CARNE_API_URL + '/api/v2/schedules/1', {
      method: 'PATCH',
      headers,
      body: JSON.stringify(body)
    })
    return response
  } catch (err) {
    Notification("Oh no!", "The schedule could not be updated. Please try again!", 1.5)
  }
}
