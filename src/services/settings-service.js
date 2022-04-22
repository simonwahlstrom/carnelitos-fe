import { GetToken } from "./login-service"

export async function GetSettings() {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${GetToken()}`
  }

  try {
    const response = await fetch(`http://localhost:3000/api/v2/settings`, {
      headers: headers,
    })
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}
