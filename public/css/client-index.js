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
const settingsPage = document.getElementById("settings-page-main-cont");
const settingPagebtnWeb = document.getElementById("web-setting-btn");
const settingPagebtnMob = document.getElementById("mobile-settings-btn");
const exitSettingsBtn = document.getElementById("exit-setting-btn");
const addClientPage = document.getElementById("add-client-page");
const addClientBtn1 = document.getElementById("add-client-btn-1");
const exitAddClntPgBtn = document.getElementById("exit-cl-add-pg-btn");
const payInvsPage = document.getElementById("home-pay-invs-page");
const payInvsBtn1 = document.getElementById("add-invoice-btn-1");
const exitPayInvsPgBtn = document.getElementById("exit-pay-invs-pg-btn");
const allInvsPage = document.getElementById("home-all-invs-page");
const allInvsBtn1 = document.getElementById("invoices-btn");
const exitAllInvsPgBtn = document.getElementById("exit-all-invs-pg-btn");
const invoicesBtn = document.getElementById("invoices-btn");
const alertTitle = document.getElementById("alert-title");
const alertText = document.getElementById("alert-text");
const alertPage = document.getElementById("alert-container");
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
const editPage = document.getElementById("edit-client-page")
const editClientBtn = document.getElementById("home-edit-cl-btn")
const exitEditPageBtn = document.getElementById("exit-cl-edit-pg-btn")
function openSettings() {
    settingsPage.style.display = 'flex'
    console.log('this is working')
}
settingPagebtnMob.addEventListener('click', openSettings)
settingPagebtnWeb.addEventListener('click', openSettings)
function closeSettings() {
    settingsPage.style.display = 'none'
}
exitSettingsBtn.addEventListener('click', closeSettings)
// LOAD INVOICE STATUS DISPLAY 
async function fetchInvoiceData() {
    const res = await fetch('/api/cl/Invoices', {
        credentials: 'include'
    });
    
    if (!res.ok) {
        const errorData = await res.json()
        console.error(errorData)
        if (errorData.message === 'Server error unauthorized user.') {
            window.location.href = '/'
        } else if (errorData.message === 'FORBIDDEN: insufficient permissions') {
            window.location.href = '/'
        }
    } 
    const data = await res.json()
    
    let invoiceCounter = 0
    const statusInvsCont = document.getElementById("status-container")
    const allInvsCont = document.getElementById("pay-invs-container")
    data.forEach((obj) => {
        const invCount = document.getElementById("inv-counter")
        invoiceCounter = invoiceCounter + 1
        invCount.innerText = invoiceCounter
        console.log(invoiceCounter)

        const statusInvsGridCont = document.createElement("li")
        statusInvsGridCont.classList.add("status-item-cont")
        statusInvsGridCont.id = String(Number(obj.InvoiceID) + 1)
        statusInvsGridCont.style.padding = '0'
        statusInvsGridCont.style.margin = '0'
        const statusInvsGridNum = document.createElement("p")
        statusInvsGridNum.classList.add("status-items")
        statusInvsGridNum.innerText = `#${obj.InvoiceID}`
        const statusInvsGridName = document.createElement("p")
        statusInvsGridName.classList.add("status-items")
        statusInvsGridName.id = "web-client-name"
        statusInvsGridName.innerText = obj.due
        const statusInvsGridMobName = document.createElement("p")
        statusInvsGridMobName.classList.add("status-items")
        statusInvsGridMobName.id = "phone-client-name"
        statusInvsGridMobName.innerText = obj.due
        const statusInvsGridAmount = document.createElement("p")
        statusInvsGridAmount.classList.add("status-items")
        statusInvsGridAmount.innerText = `$${obj.total}`
        const statusInvsGridStat = document.createElement("p")
        statusInvsGridStat.classList.add("status-items")
        statusInvsGridStat.id = "web-status"
        statusInvsGridStat.innerText = 'UNPAID'
        const statusInvsGridMobStat = document.createElement("p")
        statusInvsGridMobStat.classList.add("status-items")
        statusInvsGridMobStat.id = "phone-status"
        statusInvsGridMobStat.innerText = 'Unpaid'
        const allInvsGridCont = document.createElement("li")
        allInvsGridCont.classList.add("all-invs-item-cont")
        allInvsGridCont.id = String(Number(obj.InvoiceID) - 1)
        allInvsGridCont.style.padding = '0'
        allInvsGridCont.style.margin = '0'
        const allInvsGridNum = document.createElement("button")
        allInvsGridNum.classList.add("all-invs-btns")
        allInvsGridNum.value = obj.InvoiceID
        allInvsGridNum.innerText = `#${obj.InvoiceID}`
        allInvsGridNum.addEventListener('click', deleteInvoice)
        const allInvsGridName = document.createElement("p")
        allInvsGridName.classList.add("all-invs-items")
        allInvsGridName.id = "web-client-name"
        allInvsGridName.innerText = obj.due
        const allInvsGridMobName = document.createElement("p")
        allInvsGridMobName.classList.add("all-invs-items")
        allInvsGridMobName.id = "phone-client-name"
        allInvsGridMobName.innerText = obj.due
        const allInvsGridAmount = document.createElement("p")
        allInvsGridAmount.classList.add("all-invs-items")
        allInvsGridAmount.innerText = `$${obj.total}`
        const allInvsGridStat = document.createElement("p")
        allInvsGridStat.classList.add("all-invs-items")
        allInvsGridStat.id = "web-status"
        allInvsGridStat.innerText = 'IN PROGRESS'
        const allInvsGridMobStat = document.createElement("p")
        allInvsGridMobStat.classList.add("all-invs-items")
        allInvsGridMobStat.id = "phone-status"
        allInvsGridMobStat.innerText = 'In. Pr.'


        statusInvsGridCont.appendChild(statusInvsGridNum)
        statusInvsGridCont.appendChild(statusInvsGridName)
        statusInvsGridCont.appendChild(statusInvsGridMobName)
        statusInvsGridCont.appendChild(statusInvsGridAmount)
        statusInvsGridCont.appendChild(statusInvsGridMobStat)
        statusInvsGridCont.appendChild(statusInvsGridStat)
        statusInvsCont.appendChild(statusInvsGridCont)
        allInvsGridCont.appendChild(allInvsGridNum)
        allInvsGridCont.appendChild(allInvsGridName)
        allInvsGridCont.appendChild(allInvsGridMobName)
        allInvsGridCont.appendChild(allInvsGridAmount)
        allInvsGridCont.appendChild(allInvsGridStat)
        allInvsGridCont.appendChild(allInvsGridMobStat)
        allInvsCont.appendChild(allInvsGridCont)
   
    })
}
fetchInvoiceData()

// OPEN AND CLOSE PAY INVOICES PAGE 
function openPayPage() {
    payInvsPage.style.display = 'flex'
}
payInvsBtn1.addEventListener('click', openPayPage)
function closePayPage() {
    payInvsPage.style.display = 'none'
}
exitPayInvsPgBtn.addEventListener('click', closePayPage)
// OPEN SEE ALL INVOICES PAGE
let extractedData = [];
function goToInvList() {
    window.location.href = '/client/invoices'
}
allInvsBtn1.addEventListener('click', goToInvList)
function exitInvList() {
    allInvsPage.style.display = 'none'
}
exitAllInvsPgBtn.addEventListener('click', exitInvList)

// DELETING INVOICES VARIABLES AND FUNCTION 
async function deleteInvoice(e) {
    const currentDelInvBtn = e.target.value.trim()
    const token = localStorage.getItem('authToken')
    const res = await fetch('/api/invoices', {
        credentials: 'include'
    });
    const data = await res.json()
    const deletedInvData = data.find((invoice) => invoice.InvoiceID === Number(currentDelInvBtn))
    deletedInvData.id = Number(currentDelInvBtn)
    deletedInvData.del = 'yes'
    const deletedInv = document.getElementById(String(Number(deletedInvData.InvoiceID) - 1))
    const deletedInvStat = document.getElementById(String(Number(deletedInvData.InvoiceID) + 1))

    if (deletedInvData.del === 'yes') {
        alertPage.style.display = 'flex'
        alertPage.style.height = 'fit-content'
        alertText.innerText = 'Are you sure?'
        const yesText = document.createElement('P')
        yesText.class = "delete-alert-titles"
        yesText.innerText = "YES"
        yesText.style.margin = '0'
        const yes = document.createElement('input')
        yes.type = 'radio'
        yes.name = 'delete-confirm'
        yes.classList.add("delete-inv-checkboxes")
        yes.style.marginBottom = '10px'
        const noText = document.createElement('P')
        noText.class = "delete-alert-titles"
        noText.innerText = "NO"
        noText.style.margin = '0'
        const no = document.createElement('input')
        no.type = 'radio'
        no.name = 'delete-confirm'
        no.classList.add("delete-inv-checkboxes")
        no.style.marginBottom = '10px'
        const deleteConfBtn = document.createElement('button')
        deleteConfBtn.classList.add("add-inv-btn")
        deleteConfBtn.type = 'submit'
        deleteConfBtn.innerText = 'confirm'
        deleteConfBtn.addEventListener('click', async function confirm() {
            if (yes.checked === false && no.checked === false) {
                alert("choose an option")
            } else if (yes.checked === true) {
                deletedInv.remove()
                deletedInvStat.remove()
                deletedInvData.comp = 'yes'
                alertPage.style.display = 'none'
                alertPage.innerHTML = ''

                const request = await fetch('/api/invoices', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(deletedInvData),
                    credentials: 'include'
                })
            } else if (no.checked === true) {
                alertPage.style.display = 'none'
                alertPage.innerHTML = ''

            }   
        })

        alertPage.appendChild(yesText)
        alertPage.appendChild(yes)
        alertPage.appendChild(noText)
        alertPage.appendChild(no)
        alertPage.appendChild(deleteConfBtn)
    } 
}

// DISPLAY EARNINGS PER MONTH BAR GRAPH 
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: ['Paid', 'Unpaid'],
    datasets: [{
      label: 'Total Invoices',
      data: [100, 10],
      backgroundColor: ['rgba(151, 84, 2, 0.6)', 'rgba(158, 69, 2, 0.6)'],
      borderColor: 'rgba(255, 140, 0, 0.6)', 
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
  }
});

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/   // simple pattern
  return regex.test(email)
}
function validatePhone(phone) {
  const regex = /^\d{10}$/
  return regex.test(phone)
}

function setTimer() {
    setTimeout(() => {alertPage.style.display = 'none'}, 3500)
}
