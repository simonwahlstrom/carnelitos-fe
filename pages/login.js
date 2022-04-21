export default function login() {
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
          />
        </div>
        <div className="field">
          <input
            autocomplete="off"
            placeholder="Password"
            type="password"
          />
        </div>
        <div className="actions">
          <input
            className="login-button"
            name="commit"
            value="Log in"
          />
        </div>
      </form>
      {/* <a href="/users/sign_up">Sign up</a> */}
      <br />
    </div>
  );
}
