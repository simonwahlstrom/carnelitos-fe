import { SaveOffline, RemoveOffline } from "./sync-manager"
import { Notification } from "../components/notifications/notification"
import { GetToken } from "./login-service"

export async function SaveSession(session, sync = false) {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${GetToken()}`
  }

  const Session = {
    sets: session.exercises.flatMap((e) => e.sets),
    id: session.id,
  }

  try {
    const response = await fetch(process.env.CARNE_API_URL + '/api/v2/sessions?sync=' + sync, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(Session)
    })
    return response
  } catch (err) {
    session.finished = true
    SaveOffline(session)
  }
}

export async function SaveSet(set) {
  try {
    const response = await fetch(process.env.CARNE_API_URL + '/api/v2/sessions', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GetToken()}`
      },
      body: JSON.stringify(set)
    })
  } catch (err) {
    Notification("No connection", "Don't worry, we will try and sync your data later.")
  }
}

export async function GetActiveSession() {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${GetToken()}`
  }

  const response = await fetch(process.env.CARNE_API_URL + '/api/v2/sessions/', {
    headers: headers,
  })

  return await response.json()
}

export async function DeleteSession(session) {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${GetToken()}`
  }

  RemoveOffline(session.id)
  const response = await fetch(process.env.CARNE_API_URL + '/api/v2/sessions/' + session.id, {
    method: 'DELETE',
    headers: headers,
  })

  return response
}
