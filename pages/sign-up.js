import Link from "next/link"
import { useRouter } from "next/router"
import React, { useState } from "react"

export default function Signup() {
  const [username, setUsername] = useState(undefined)
  const [password, setPassword] = useState(undefined)
  const [error, setError] = useState(undefined)

  const router = useRouter()

  async function handleLogin(e) {
    setError(undefined)

    e.preventDefault()
    const body = {
      email: username,
      password
    }
    try {
      const response = await fetch(process.env.CARNE_API_URL + '/api/v2/users', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      })
      let data = await response.json()

      if (data.valid) {
        router.push("/")
      } else {
        setError("Nope that did not work. Try something else")
      }
    } catch (err) {
      console.log(err)
    }

  }


  return (
    <div className="devise-form">
      <h2>Create account</h2>
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
          >Create account</button>
        </div>
      </form>
      <br />
      {error && <div>{error}</div>}
      <Link href="/sign-up">
        <a>Login</a>
      </Link>
    </div>
  );
}
