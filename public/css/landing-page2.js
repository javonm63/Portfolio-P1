const alertTitle = document.getElementById("alert-title");
const alertText = document.getElementById("alert-text");
const alertPage = document.getElementById("alert-container");
const page = document.getElementById("body");
// SEARCHBAR VARIABLES
const webNavbar = document.getElementById("web-navbar");
// SEARCHBAR VARIABLES 
const phoneLogo = document.getElementById("phone-logo");
const webLogo = document.getElementById("web-logo");
// SEARCHBAR CHANGE ON SCREEN RESIZE FUNCTION
function resize() {
    if (window.innerWidth <= 1024) {
        phoneLogo.style.display = 'flex'
        webLogo.style.display = 'none'
    } else {
        phoneLogo.style.display = 'none'
        webLogo.style.display = 'flex'
    }
}
window.addEventListener('resize', resize)
resize()
// SIDE NAVBAR OPEN AND CLOSE VARIABLES
const mobileNavbar = document.getElementById("mobile-navbar");
const sideNavExitBtn = document.getElementById("side-nav-exit-btn");
const sideNavBtn = document.getElementById("dropdown-menu-icon");
// SIDE NAVBAR OPEN AND CLOSE FUNCTIONS 
function openSideNav() { 
    mobileNavbar.style.display = 'block';
}
sideNavBtn.addEventListener('click', openSideNav)
function closeSideNav() {
    mobileNavbar.style.display = 'none';
}
sideNavExitBtn.addEventListener('click', closeSideNav)

// DISPLAY EARNINGS PER MONTH BAR GRAPH 
const ctx = document.getElementById('bar-graph').getContext('2d');
const myChart = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: ['Paid', 'Unpaid'],
    datasets: [{
      label: 'Paid vs Unpaid',
      data: [85, 15],
      backgroundColor: ['rgba(232, 127, 0, 0.6)', 'rgba(191, 74, 1, 0.6)'],
      borderColor: 'rgba(255, 140, 0, 0)', 
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
  }
});
const signupPopup = document.getElementById("signup-popup-page")
const exitSignupPopupBtn = document.getElementById("exit-signup-popup")
const signupPopupBtn1 = document.getElementById("freelancer-signup-btn1")
const signupPopupBtn2 = document.getElementById("freelancer-signup-btn2")
function openSignUpPopup() {
  signupPopup.style.display = 'flex'
}
signupPopupBtn1.addEventListener('click', openSignUpPopup)
signupPopupBtn2.addEventListener('click', openSignUpPopup)
function closeSignUpPopup() {
  signupPopup.style.display = 'none'
}
exitSignupPopupBtn.addEventListener('click', closeSignUpPopup)

async function createFrAccount(e) {
  e.preventDefault()

  let name = document.getElementById("signup-name-input").value
  let email = document.getElementById("signup-email-input").value.trim()
  let phone = document.getElementById("signup-phone-input").value
  let pass = document.getElementById("signup-pw-input").value
  let passCon = document.getElementById("signup-con-pw-input").value

  if (!email || !pass || !name || !phone) {
    setAlert("All fields are required.")
    return
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setAlert("Enter valid email")
    return
  }
  if (pass.length < 6) {
    setAlert("Password must be atleast 6 characters long.")
    return
  }
  if (pass !== passCon) {
    setAlert("Passwords must match")
    return
  } 

  try {
    const res = await fetch('/api/client/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name, email, phone, pass})
    })

    if (res.ok) {
      window.location.href = '/client/dashboard'
      signupPopup.reset()
      const data = await res.json()
      localStorage.setItem('authToken', data.token)
    } else {
      const errorData = await res.json()
      console.error("signup failed", errorData)
      const errorDataExtract = errorData.errors
      const errorDataExtract2 = errorDataExtract[0]
      console.log(errorDataExtract2.msg)
      if (String(errorDataExtract2.msg) === "Phone is required") {
        setAlert("Enter a valid phone number")
      } else if (String(errorDataExtract2.msg) === "Name is required") {
        setAlert("Name is required")
      } else if (String(errorDataExtract2.msg) === "Email is required") {
        setAlert("Enter valid email")
      } else if (String(errorDataExtract2.msg) === "Pass is required") {
        setAlert("Password isn't valid")
      } else if (String(errorDataExtract2.msg) === "Email already registered.") {
        setAlert("Email already registered.")
      }
      // setAlert("Signup failed.")
      return
    }
  } catch (err) {
    console.log(err)
    setAlert("Server error, please try again later.")
    return
  }
}
signupPopup.addEventListener('submit', createFrAccount)
// LOGIN PAGE VARIABLES
const loginPage = document.getElementById("login-popup-page")
const exitLoginPageBtn = document.getElementById("exit-login-popup")
const loginEmailInput = document.getElementById("login-email-input")
const loginPassInput = document.getElementById("login-pw-input")
const loginPageBtn = document.getElementById("login-page-btn")
const webLoginPageBtn = document.getElementById("web-login-page-btn")
const loginBtn = document.getElementById("login-btn")
// open and close login page functions 
function openLoginPage() {
  loginPage.style.display = 'flex'
}
loginPageBtn.addEventListener('click', openLoginPage)
webLoginPageBtn.addEventListener('click', openLoginPage)
function closeLoginPage() {
  loginPage.style.display = 'none'
}
exitLoginPageBtn.addEventListener('click', closeLoginPage)

async function login() {
  if (loginEmailInput.value === '') {
    setAlert('Enter your email address')
  } else if (loginPassInput.value === '') {
    setAlert('Enter your password')
  }
  const user = {}
  user.email = loginEmailInput.value.trim()
  user.pass = loginPassInput.value.trim()

  try { 
    const res = await fetch('/api/client/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(user),
      credentials: 'include'
    })
    if (res.ok) {
        window.location.href = '/client/dashboard'
        loginPage.reset()
        const data = await res.json()
    } else {
      const errorData = await res.json()
      console.error('login failed', errorData)
      const resMessage = errorData.message
      if (resMessage === 'Invalid email or password') {
        setAlert('Invalid email or password')
      }
    }
  } catch (err) {
    console.log(err)
    setAlert('Server error, try again later')
  }
}
loginBtn.addEventListener('click', login)

function setAlert(text) {
    alertPage.style.display = 'flex'
    alertPage.style.height = 'fit-content'
    alertPage.style.textAlign = 'center'
    alertTitle.innerText = 'ALERT'
    alertText.innerText = text
    setTimer()
}
function setTimer() {
    setTimeout(() => {alertPage.style.display = 'none'}, 3500)
}