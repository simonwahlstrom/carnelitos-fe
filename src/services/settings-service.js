export async function GetSettings() {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }

  try {
    const response = await fetch(process.env.CARNE_API_URL + `/api/v2/settings`, {
      headers: headers,
    })
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}
