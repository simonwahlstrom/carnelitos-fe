import Link from "next/link"
import { useRouter } from "next/router"
import React, { useState } from "react"
import { StoreToken } from "../src/services/login-service"

export default function Login() {
  const [username, setUsername] = useState(undefined)
  const [password, setPassword] = useState(undefined)
  const [error, setError] = useState(undefined)

  const router = useRouter()

  async function handleLogin(e) {
    setError(undefined)

    e.preventDefault()
    const body = {
      username,
      password
    }
    try {
      const response = await fetch(process.env.CARNE_API_URL + '/api/v1/login', {
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
        router.push("/")
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
            autoComplete="off"
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
      <br />
      {error && <div>{error}</div>}
      <Link href="/sign-up">
        <a>Create account</a>
      </Link>
    </div>
  );
}
