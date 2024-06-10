export default function Login() {
  return (
    <div>
      <div>
        <h1>Sign in</h1>
      </div>
      <div>
        <div>
          <h3>In order to chat, you must be signed in.</h3>
        </div>

        <div>
          <p>Select the service you would like to sign in with</p>
          <ul>
            <li>
              <a href="/auth/facebook">Facebook</a>
            </li>
            <li>
              <a href="/auth/github">Github</a>
            </li>
            <li>
              <a href="http://localhost:8080/auth/google">Google</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
