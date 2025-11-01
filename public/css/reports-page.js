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
      data: [100, 190, 300, 500, 200, 320, 126, 195, 312, 598, 287, 302],
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
          stepSize: 100  
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

async function fetchChartData() {
  const req = await fetch('/api/invoices', {
    credentials: 'include'
  })

  if (!req.ok) {
      const errorData = await req.json()
      console.error('hi', errorData)
      if (errorData.message === 'Server error unauthorized user.') {
          window.location.href = '/'
      } else if (errorData.message === 'FORBIDDEN: insufficient permissions') {
            window.location.href = '/'
            return
        }
  }

  const res = await req.json()

  const unpaidData = res.unpaid
  const paidData = res.paid
  const paidDataArr = []
  const unpaidDataArr = []
  const currentUnpaid = []
  const currentOverdue = []
  unpaidData.forEach((invoice) => {
    unpaidDataArr.push(unpaidDataArr.length + 1)
    const totalUnpaidDis = document.getElementById("total-unpaid-display")
    currentUnpaid.push(invoice.total)
    const totalUnpaid = currentUnpaid.reduce((a, b) => a + b, 0)
    totalUnpaidDis.innerText = `$${String(totalUnpaid)}`
    const dueDate = new Date(invoice.due)
    const today = new Date()
    if (dueDate < today) {
      currentOverdue.push(Number(invoice.total))
      const totalOverdue = currentOverdue.reduce((a, b) => a + b, 0)
      const totalOverdueDis = document.getElementById("total-overdue-display")
      totalOverdueDis.innerText = `$${String(totalOverdue)}`
    }
  });
  const currentTotal = []
  paidData.forEach((invoice) => {
    paidDataArr.push(paidDataArr.length + 1)
    const totalEarnedDis = document.getElementById("total-earned-display")
    currentTotal.push(invoice.total)
    const totalEarned = currentTotal.reduce((a, b) => a + b, 0)
    totalEarnedDis.innerText = `$${String(totalEarned)}`
  });
  const totalUnpaid = unpaidDataArr.reduce((a, b) => a + b, 0)
  const totalPaid = paidDataArr.reduce((a, b) => a + b, 0)
  myChart2.data.datasets[0].data = [totalPaid, totalUnpaid]
  myChart2.update()
}
fetchChartData()

