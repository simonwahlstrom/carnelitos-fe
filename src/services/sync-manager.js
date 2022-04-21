import { SaveSession } from "./session-service"


export function SaveOffline(session) {
  localStorage.setItem(`session-${session.id}`, JSON.stringify(session))
}

export function RemoveOffline(sessionId) {
  localStorage.removeItem("timer")
  localStorage.removeItem(`session-${sessionId}`)
}

export async function Sync() {
  const keys = Object.keys(localStorage)
  const sessionsKeys = keys.filter((k) => k.startsWith("session-"))
  sessionsKeys.forEach(async (sessionKey) => {
    const session = JSON.parse(localStorage.getItem(sessionKey))
    if (session.finished) {
      const request = await SaveSession(session, true)
      if (request.status == 404) {
        RemoveOffline(session.id)
      }
      if (request.ok) {
        const result = await request.json()
        RemoveOffline(session.id)
        location.reload()
      }
    }
  })
}
