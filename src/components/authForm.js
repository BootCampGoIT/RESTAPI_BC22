export const authForm = () => {
  return `
  <form name="authForm" class="authForm">
      <input type="text" name="email" class="authFormEmail" />
      <input type="text" name="password" class="authFormPassword" />
      <div className="authFormButtons">
        <button name="signin" type="submit" class="authFormSignIn button">SignIn</button>
        <button name="signup" type="submit" class="authFormSignUp button">SignUp</button></div>
  </form>
    `
}
