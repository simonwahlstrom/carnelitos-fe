import { SaveOffline, RemoveOffline } from "./sync-manager"

export async function SaveSession(session, sync = false) {
  const Session = {
    sets: session.exercises.flatMap((e) => e.sets),
    id: session.id,
  }

  try {
    const response = await fetch('/api/v2/sessions?sync=' + sync, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Session)
    })
    return response
  } catch (err) {
    session.finished = true
    SaveOffline(session)
  }
}

export async function DeleteSession(session) {
  RemoveOffline(session.id)
  const response = await fetch('/api/v2/sessions/' + session.id, {
    method: 'DELETE',
  })

  return response
}
