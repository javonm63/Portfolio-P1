const alertTitle = document.getElementById("alert-title");
const alertText = document.getElementById("alert-text");
const alertPage = document.getElementById("alert-container");
const page = document.getElementById("body");
// SEARCHBAR VARIABLES
const webNavbar = document.getElementById("web-navbar");
const searchBtn = document.getElementById("search-icon");
const webSearchBtn = document.getElementById("web-search-icon");
const profilePage = document.getElementById("profile-page-container");
const webprofileBtn = document.getElementById("profile-icon");
const mobileProfileBtn = document.getElementById("mobile-profile-btn");
const exitProfileBtn = document.getElementById("exit-profile-btn");
const mobileExitProfileBtn = document.getElementById("exit-profile-btn-mob");


// SEARCHBAR VARIABLES 
const phoneLogo = document.getElementById("phone-logo");
const webLogo = document.getElementById("web-logo");
const searchInput = document.getElementById("search-input");
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
// NOTICATION PAGE VARIABLES
const notifExitBtn = document.getElementById("exit-notif-page-btn");
const mobileNotifpageBtn = document.getElementById("notification-icon");
const webNotifpageBtn = document.getElementById("web-notif-icon");
const notifPage = document.getElementById("notif-page-container");
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
// SETTINGS PAGE VARIABLES
const settingsPage = document.getElementById("settings-page-main-cont");
const settingPagebtnWeb = document.getElementById("web-setting-btn");
const settingPagebtnMob = document.getElementById("mobile-settings-btn");
const exitSettingsBtn = document.getElementById("exit-setting-btn");
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

// ALL INVOICES PAGE VARIABLES
const exitAllInvsPgBtn = document.getElementById("exit-all-inv-pg");
const allInvsPage = document.getElementById("all-inv-page-cont");
const allInvsPageBtnMob = document.getElementById("mobile-all-btn");
const allInvsPageBtnWeb = document.getElementById("web-all-btn");
// OPEN AND CLOSE ALL INVOICES PAGE FUNCTIONS
function openAllInvsPage() {
    allInvsPage.style.display = 'flex'
}
allInvsPageBtnMob.addEventListener('click', openAllInvsPage)
allInvsPageBtnWeb.addEventListener('click', openAllInvsPage)
function closeAllInvsPage() {
    allInvsPage.style.display = 'none'
}
exitAllInvsPgBtn.addEventListener('click', closeAllInvsPage)
// SEND INVOICES PAGE VARIABLES
const exitSendInvsPgBtn = document.getElementById("exit-send-inv-pg");
const sendInvsPage = document.getElementById("send-invs-page-cont");
const sendInvsPageBtnMob = document.getElementById("mobile-send-btn");
const sendInvsPageBtnWeb = document.getElementById("web-send-btn");
// OPEN AND CLOSE SEND INVOICES PAGE FUNCTIONS
async function openSendInvsPage() {
    sendInvsPage.style.display = 'flex'
}
sendInvsPageBtnMob.addEventListener('click', openSendInvsPage)
sendInvsPageBtnWeb.addEventListener('click', openSendInvsPage)
function closeSendInvsPage() {
    sendInvsPage.style.display = 'none'
}
exitSendInvsPgBtn.addEventListener('click', closeSendInvsPage)

async function fetchInvoices() {
    try {
        const res = await fetch('/api/cl/Invoices', {
            credentials: 'include'
        })
        if (!res.ok) {
            const errorData = await res.json()
            if (errorData.message === 'FORBIDDEN: insufficient permissions') {
                window.location.href = '/'
            } else if (errorData.message === 'Server error unauthorized user.') {
                window.location.href = '/'
            }
        }
        const data = await res.json()
        console.log(data)
        if (data.message === 'no current invoices') {
            return
        }
        const unpaidData = data.unpaid
        console.log(unpaidData)
        unpaidData.forEach((invoice) => {
            displayPayInvoices(invoice)
            populatePayDrpDwn(invoice)
        })
        const allData = data.all
        console.log(allData)
        allData.forEach((invoice) => {
            displayAllInvoices(invoice)
        })
        const savedData = data.saved
        console.log(savedData)
        savedData.forEach((invoice) => {
            displayInvoices(invoice)
        })
    } catch (err) {
        console.error(err)
    }
}
fetchInvoices()

const invoicePayCont = document.getElementById("send-invs-container")
const invoiceCont = document.getElementById("invs-container")
const invoiceAllCont = document.getElementById("all-invs-container")
function displayInvoices(invoice) {
    const invID = String(invoice.InvoiceID + 1)
    const invoiceEl = document.getElementById(invID)
    if (invoiceEl) {
        invoiceEl.remove()
    }
    const invContRow = document.createElement("li")
    invContRow.classList.add("invs-item-cont")
    invContRow.id = invoice.InvoiceID + 1
    const invNum = document.createElement("p")
    invNum.classList.add("invs-items")
    invNum.innerText = `#${String(invoice.InvoiceID)}`
    const invDate = document.createElement("p")
    invDate.classList.add("invs-items")
    invDate.innerText = invoice.due
    const invAmount = document.createElement("p")
    invAmount.classList.add("invs-items")
    invAmount.innerText = `$${String(invoice.total)}`
    const invStat = document.createElement("p")
    invStat.classList.add("invs-items")
    invStat.id = String(Number(invoice.InvoiceID) + 1)
    invStat.innerText = invoice.stat
    

    invContRow.appendChild(invNum)
    invContRow.appendChild(invDate)
    invContRow.appendChild(invAmount)
    invContRow.appendChild(invStat)
    invoiceCont.appendChild(invContRow)
}
function displayPayInvoices(invoice) {
    const invID = String(invoice.InvoiceID - 1)
    const invoiceEl = document.getElementById(invID)
    console.log(invoiceEl)
    if (invoiceEl) {
        invoiceEl.remove()
    }
    const invContRow2 = document.createElement("li")
    invContRow2.classList.add("pay-invs-item-cont")
    invContRow2.id = invoice.InvoiceID - 1
    const invNum = document.createElement("button")
    invNum.classList.add("invs-item-btns")
    invNum.value = invoice.InvoiceID - 1
    invNum.innerText = `#${String(invoice.InvoiceID)}`
    invNum.addEventListener('click', openPayPopup)
    const invDate = document.createElement("p")
    invDate.classList.add("invs-items")
    invDate.innerText = invoice.due
    const invAmount = document.createElement("p")
    invAmount.classList.add("invs-items")
    invAmount.innerText = `$${String(invoice.total)}`
    const invStat = document.createElement("p")
    invStat.classList.add("invs-items")
    invStat.id = String(Number(invoice.InvoiceID) - 1)
    invStat.innerText = invoice.stat
    

    invContRow2.appendChild(invNum)
    invContRow2.appendChild(invDate)
    invContRow2.appendChild(invAmount)
    invContRow2.appendChild(invStat)
    invoicePayCont.appendChild(invContRow2)
}
function displayAllInvoices(invoice) {
    const invID = String(invoice.InvoiceID)
    const invoiceEl = document.getElementById(invID)
    console.log(invoiceEl)
    if (invoiceEl) {
        invoiceEl.remove()
    } 
    const today = new Date()
    const dueDate = new Date(invoice.due)
        if (dueDate < today) {
            invoice.due = 'Overdue'
        }
    const invContRow3 = document.createElement("li")
    invContRow3.classList.add("pay-invs-item-cont")
    invContRow3.id = invoice.InvoiceID
    const invNum = document.createElement("button")
    invNum.classList.add("invs-item-btns")
    invNum.value = invoice.InvoiceID
    invNum.innerText = `#${String(invoice.InvoiceID)}`
    const invDate = document.createElement("p")
    invDate.classList.add("invs-items")
    invDate.innerText = invoice.due
    const invAmount = document.createElement("p")
    invAmount.classList.add("invs-items")
    invAmount.innerText = `$${String(invoice.total)}`
    const invStat = document.createElement("button")
    invStat.classList.add("invs-item-btns")
    invStat.value = invoice.InvoiceID
    invStat.id = String(invoice.InvoiceID)
    invStat.innerText = invoice.stat
    

    invContRow3.appendChild(invNum)
    invContRow3.appendChild(invDate)
    invContRow3.appendChild(invAmount)
    invContRow3.appendChild(invStat)
    invoiceAllCont.appendChild(invContRow3)
}
// PAY INVOICE POPUP VARIABLES AND FUNCTIONS
const payPopup = document.getElementById("send-popup-page-cont")
const exitPayPopupBtn = document.getElementById("exit-send-popup-btn")
const payInvDropdown = document.getElementById("pay-inv-dropdown")


// pay popup window open and close functions 
function openPayPopup(e) {
    payPopup.style.display = 'flex'
    if (currentInv.length > 0) {
        currentInv.pop()
        currentInv.push(Number(e.target.value) - 1)
    } else {
        currentInv.push(Number(e.target.value) + 1)
    }
}
function closePayPopup() {
    window.location.href = '/client/invoices'
}
exitPayPopupBtn.addEventListener('click', closePayPopup)
// choosing invoice dropdown function
function populatePayDrpDwn(invoice) {
    const payInvDrpItem = document.createElement("option")
    payInvDrpItem.classList.add("pay-ivn-drop-items")
    payInvDrpItem.value = invoice.total
    payInvDrpItem.innerText = invoice.InvoiceID

    payInvDropdown.appendChild(payInvDrpItem)
}
const amountDisplay = document.getElementById("invoice-amount-display")
const selectInvBtn = document.getElementById("select-inv-btn")
function selectInvoice() {
    amountDisplay.innerText = `Invoice total: $${payInvDropdown.value}`
    console.log(payInvDropdown.value)
}
selectInvBtn.addEventListener('click', selectInvoice)


function setAlert(text) {
    alertPage.style.display = 'flex'
    alertPage.style.height = 'fit-content'
    alertTitle.innerText = 'ALERT'
    alertText.innerText = text
    alertText.style.textAlign = 'center'
    setTimer()
}
function setTimer() {
    setTimeout(() => {alertPage.style.display = 'none'}, 5000)
}




