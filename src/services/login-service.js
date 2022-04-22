export function DeleteToken() {
  try {
    localStorage.removeItem("token")
  } catch (err) {
    console.log(err)
  }
}

export function StoreToken(token) {
  try {
    if (token) {
      localStorage.setItem("token", token)
    }
  } catch (err) {
    console.log(err)
  }
}

export function GetToken() {
  try {
    const data = localStorage.getItem('token')
    return data
  } catch (err) {
    console.log(err)
  }
}
