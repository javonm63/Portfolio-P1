// SEARCHBAR VARIABLES
const mobileNavbar = document.getElementById("mobile-navbar");
const webNavbar = document.getElementById("web-navbar");
const sideNavExitBtn = document.getElementById("side-nav-exit-btn");
const sideNavBtn = document.getElementById("dropdown-menu-icon");
const searchBtn = document.getElementById("search-icon");
const webSearchBtn = document.getElementById("web-search-icon");
const phoneLogo = document.getElementById("phone-logo");
const webLogo = document.getElementById("web-logo");
const searchInput = document.getElementById("search-input");
const notifExitBtn = document.getElementById("exit-notif-page-btn");
const mobileNotifpageBtn = document.getElementById("notification-icon");
const webNotifpageBtn = document.getElementById("web-notif-icon");
const notifPage = document.getElementById("notif-page-container");
const profilePage = document.getElementById("profile-page-container");
const webprofileBtn = document.getElementById("profile-icon");
const mobileProfileBtn = document.getElementById("mobile-profile-btn");
const exitProfileBtn = document.getElementById("exit-profile-btn");
const mobileExitProfileBtn = document.getElementById("exit-profile-btn-mob");
const addClientPage = document.getElementById("add-client-page");
const addClientBtn2 = document.getElementById("add-client-btn-2");
const exitAddClntPgBtn = document.getElementById("exit-cl-add-pg-btn");
const settingsPage = document.getElementById("settings-page-main-cont");
const settingPagebtnWeb = document.getElementById("web-setting-btn");
const settingPagebtnMob = document.getElementById("mobile-settings-btn");
const exitSettingsBtn = document.getElementById("exit-setting-btn");
const page = document.getElementById("body");
// SEARCHBAR CHANGE ON SCREEN RESIZE FUNCTION
function resize() {
    if (window.innerWidth <= 1024) {
        phoneLogo.style.display = 'block'
        webLogo.style.display = 'none'
        searchInput.style.display = 'none'
    } else {
        phoneLogo.style.display = 'none'
        searchInput.style.display = ''
        webLogo.style.display = 'block'
    }
}
window.addEventListener('resize', resize)
resize()
// SIDE NAVBAR OPEN AND CLOSE FUNCTIONS 
function openSideNav() { 
    mobileNavbar.style.display = 'block';
}
sideNavBtn.addEventListener('click', openSideNav)
function closeSideNav() {
    mobileNavbar.style.display = 'none';
}
sideNavExitBtn.addEventListener('click', closeSideNav)
// SHOW SEARCHBAR ON MOBILE FUNCTION
const searchInputs = []
function showSearch() {
    if (window.innerWidth <= 1024) {
        if (searchInput.style.display === 'none') {
        phoneLogo.style.display = 'none'
        searchInput.style.display = 'block'
        searchInput.style.width = '80%'
        } else {
            searchInput.style.display = 'none'
            phoneLogo.style.display = 'block'
        }
    } else {
        if (searchInput.value === '') {
            console.log('working')
        } else {
            searchInputs.unshift(searchInput.value)
            console.log(searchInputs)
            searchInput.value = ''
        }
    }
}
searchBtn.addEventListener('click', () => showSearch())
webSearchBtn.addEventListener('click', showSearch)
// OPEN AND CLOSE NOTIFICATION PAGE FUNCTIONS 
function exitNotifs() {
    notifPage.style.visibility = 'hidden';
}
notifExitBtn.addEventListener('click', exitNotifs)
function openNotifPage() {
    notifPage.style.visibility = 'visible';
}
mobileNotifpageBtn.addEventListener('click', openNotifPage)
webNotifpageBtn.addEventListener('click', openNotifPage)
// OPEN AND CLOSE SETTINGS PAGE
function openSettings() {
    settingsPage.style.display = 'flex'
}
settingPagebtnMob.addEventListener('click', openSettings)
settingPagebtnWeb.addEventListener('click', openSettings)
function closeSettings() {
    settingsPage.style.display = 'none'
}
exitSettingsBtn.addEventListener('click', closeSettings)

// DISPLAY EARNINGS PER MONTH BAR GRAPH 
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: 'Total',
      data: [3, 5, 2, 6, 1, 4, 6, 5, 2, 7, 3, 4],
      backgroundColor: 'rgba(211, 116, 0, 0.6)',
      borderColor: 'rgba(255, 140, 0, 0.6)', 
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { beginAtZero: true, ticks: {
          stepSize: 1 
        } }
    }
  }
});
// DISPLAY PAID VS UNPAID PIE CHART 
const ctx2 = document.getElementById('myChart2').getContext('2d');
const myChart2 = new Chart(ctx2, {
  type: 'pie',
  data: {
    labels: ['Paid', 'Unpaid'],
    datasets: [{
      label: 'Total',
      data: [19, 7],
      backgroundColor: ['rgba(255, 140, 0, 0.6)', 'rgba(255, 72, 0, 0.6)'],
      borderColor: 'rgba(255, 140, 0, 0.6)', 
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false
  }
});

async function fetchData() {
  const req = await fetch('/api/cl/Invoices', {
    credentials: 'include'
  })
  if (!req.ok) {
    const errorData = await req.json()
    if (errorData.message === 'Server error unauthorized user.') {
            window.location.href = '/'
        } else if (errorData.message === 'FORBIDDEN: insufficient permissions') {
            window.location.href = '/'
        }
  }
}
fetchData()