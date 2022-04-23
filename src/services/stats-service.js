import { GetToken } from "./login-service"

export async function GetStats(path) {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${GetToken()}`
  }

  try {
    const response = await fetch(process.env.CARNE_API_URL + `/api/v1/stats?${path}`, {
      headers: headers,
    })
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}

export async function GetAllExercises() {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${GetToken()}`
  }

  try {
    const response = await fetch(process.env.CARNE_API_URL + `/api/v2/stats`, {
      headers: headers,
    })
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}
