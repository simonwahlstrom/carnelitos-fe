import React, { useState } from "react"
import { StoreToken } from "../src/services/workout-service"

export default function login() {
  const [username, setUsername] = useState(undefined)
  const [password, setPassword] = useState(undefined)
  const [error, setError] = useState(undefined)

  async function handleLogin(e) {
    setError(undefined)

    e.preventDefault()
    const body = {
      username,
      password
    }
    try {
      const response = await fetch('http://localhost:3000/api/v1/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      })
      let data = await response.json()

      if (data.token) {
        StoreToken(data.token)
        window.location = "/"
      } else {
        setError("Invalid login")
      }
    } catch (err) {
      console.log(err)
    }

  }


  return (
    <div className="devise-form">
      <h2>Log in</h2>
      <form
        className="new_user"
      >
        <div className="field">
          <input
            autoFocus="autofocus"
            placeholder="Email"
            type="email"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="field">
          <input
            autocomplete="off"
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="actions">
          <button
            className="login-button"
            onClick={(e) => handleLogin(e)}
            disabled={!username || !password}
          >Log in</button>
        </div>
      </form>
      {/* <a href="/users/sign_up">Sign up</a> */}
      <br />
      {error && <div>{error}</div>}
    </div>
  );
}
