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
    const earningsDisplay = document.getElementById("earnings-display")
    const overdueDisplay = document.getElementById("overdue-display")
    const currentEarnings = []
    const currentOverdue = []
    const res = await fetch('/api/invoices', {
        credentials: 'include'
    });
    
    if (!res.ok) {
        const errorData = await res.json()
        console.error(errorData)
        if (errorData.message === 'Server error unauthorized user.') {
            window.location.href = '/'
        }
    } 
    const data = await res.json()

    const unpaidData = data.unpaid
    const paidData = data.paid
    unpaidData.forEach((obj) => {
        const today = new Date()
        const dueDate = new Date(obj.due)
            if (dueDate < today) {
                obj.due = 'Overdue'
                currentOverdue.push(currentOverdue.length + 1)
                const totalOverdue = currentOverdue.reduce((a , b) => a + b, 0)
                overdueDisplay.innerText = totalOverdue
            }
        displayStatList(obj)
        displayInvoiceList(obj)
    })
    paidData.forEach((obj) => {
        displayStatList(obj)
        displayInvoiceList(obj)
        currentEarnings.push(obj.total)
        const totalEarnings = currentEarnings.reduce((a, b) => a + b, 0)
        earningsDisplay.innerText = `$${String(totalEarnings)}`
    })
}
fetchInvoiceData()
function displayStatList(obj) {
    const statusInvsCont = document.getElementById("status-container")

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
    statusInvsGridName.innerText = obj.name
    const statusInvsGridMobName = document.createElement("p")
    statusInvsGridMobName.classList.add("status-items")
    statusInvsGridMobName.id = "phone-client-name"
    statusInvsGridMobName.innerText = obj.name
    const statusInvsGridAmount = document.createElement("p")
    statusInvsGridAmount.classList.add("status-items")
    statusInvsGridAmount.innerText = `$${obj.total}`
    const statusInvsGridStat = document.createElement("p")
    statusInvsGridStat.classList.add("status-items")
    statusInvsGridStat.id = "web-status"
    statusInvsGridStat.innerText = obj.stat
    const statusInvsGridMobStat = document.createElement("p")
    statusInvsGridMobStat.classList.add("status-items")
    statusInvsGridMobStat.id = "phone-status"
    statusInvsGridMobStat.innerText = obj.stat

    statusInvsGridCont.appendChild(statusInvsGridNum)
    statusInvsGridCont.appendChild(statusInvsGridName)
    statusInvsGridCont.appendChild(statusInvsGridMobName)
    statusInvsGridCont.appendChild(statusInvsGridAmount)
    statusInvsGridCont.appendChild(statusInvsGridMobStat)
    statusInvsGridCont.appendChild(statusInvsGridStat)
    statusInvsCont.appendChild(statusInvsGridCont)
}
function displayInvoiceList(obj) {
    const allInvsCont = document.getElementById("all-invs-container")

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
    allInvsGridName.innerText = obj.name
    const allInvsGridMobName = document.createElement("p")
    allInvsGridMobName.classList.add("all-invs-items")
    allInvsGridMobName.id = "phone-client-name"
    allInvsGridMobName.innerText = obj.name
    const allInvsGridAmount = document.createElement("p")
    allInvsGridAmount.classList.add("all-invs-items")
    allInvsGridAmount.innerText = `$${obj.total}`
    const allInvsGridStat = document.createElement("p")
    allInvsGridStat.classList.add("all-invs-items")
    allInvsGridStat.id = "web-status"
    allInvsGridStat.innerText = obj.stat
    const allInvsGridMobStat = document.createElement("p")
    allInvsGridMobStat.classList.add("all-invs-items")
    allInvsGridMobStat.id = "phone-status"
    allInvsGridMobStat.innerText = obj.stat

    allInvsGridCont.appendChild(allInvsGridNum)
    allInvsGridCont.appendChild(allInvsGridName)
    allInvsGridCont.appendChild(allInvsGridMobName)
    allInvsGridCont.appendChild(allInvsGridAmount)
    allInvsGridCont.appendChild(allInvsGridStat)
    allInvsGridCont.appendChild(allInvsGridMobStat)
    allInvsCont.appendChild(allInvsGridCont)
}
// OPEN AND CLOSE ADD CLIENT PAGE
function openAddClPg() {
    addClientPage.style.display = 'flex'
}
addClientBtn1.addEventListener('click', openAddClPg)
function closeAddClPg() {
    addClientPage.style.display ='none'
}
exitAddClntPgBtn.addEventListener('click', closeAddClPg)
addClientBtn1.style.height = '100px'

// ADD NEW CLIENT VARIABLES AND FUNCTIONS 
const newNameInput = document.getElementById("new-name-input")
const newEmailInput = document.getElementById("new-email-input")
const newPhoneInput = document.getElementById("new-phone-input")
const newNumInput = document.getElementById("new-id-input")
const addNewClientBtn = document.getElementById("save-client-btn")

const newClient = {}
async function addNewClient() {
    if (!validateEmail(newEmailInput.value.trim())) {
        alertPage.style.display = 'flex'
        alertPage.style.height = 'fit-content'
        alertTitle.innerText = 'ALERT'
        alertText.innerText = 'Enter a valid email'
        setTimer()
        return
    }
    if (!validatePhone(newPhoneInput.value.trim())) {
        alertPage.style.display = 'flex'
        alertPage.style.height = 'fit-content'
        alertTitle.innerText = 'ALERT'
        alertText.innerText = 'Enter a valid phone number'
        setTimer()
        return
    }
    newClient.name = newNameInput.value.trim()
    newClient.email = newEmailInput.value.trim()
    newClient.phone = newPhoneInput.value.trim()
    newClient.id = Math.floor(Math.random() * 3000) || newNumInput.value.trim()

    const editClientCont = document.getElementById("edit-container")
    const editGridCont = document.createElement("li")
    editGridCont.classList.add("edit-item-cont")
    editGridCont.style.padding = '0'
    editGridCont.style.margin = '0'
    const editGridName = document.createElement("button")
    editGridName.classList.add("edit-name-btns")
    editGridName.value = newClient.id
    editGridName.type = 'button'
    editGridName.id = "web-client-name"
    editGridName.innerText = newClient.name
    editGridName.addEventListener('click', openEditPopup)
    const editGridMobName = document.createElement("button")
    editGridMobName.classList.add("edit-name-btns")
    editGridMobName.value = newClient.id
    editGridMobName.type = 'button'
    editGridMobName.id = "phone-client-name"
    editGridMobName.innerText = newClient.name
    editGridMobName.addEventListener('click', openEditPopup)
    const editGridID = document.createElement("p")
    editGridID.classList.add("edit-items")
    editGridID.innerText = newClient.id

    editGridCont.appendChild(editGridName)
    editGridCont.appendChild(editGridMobName)
    editGridCont.appendChild(editGridID)
    editClientCont.appendChild(editGridCont)

    newNameInput.value = null
    newEmailInput.value = null
    newPhoneInput.value = null
    newNumInput.value = null

    addClientPage.style.display ='none'
    const request = await fetch('/api/clients', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newClient),
        credentials: 'include'
    })
}
addNewClientBtn.addEventListener('click', addNewClient)
// OPEN AND CLOSE EDIT PAGE FUNCTIONS 
function openEditPage() {
    editPage.style.display = 'flex'
}
editClientBtn.addEventListener('click', openEditPage)
function closeEditPage() {
    editPage.style.display = 'none'
}
exitEditPageBtn.addEventListener('click', closeEditPage)

// OPEN SEE ALL INVOICES PAGE
let extractedData = [];
function goToInvList() {
    allInvsPage.style.display = 'flex'
}
invoicesBtn.addEventListener('click', goToInvList)
function exitInvList() {
    allInvsPage.style.display = 'none'
}
exitAllInvsPgBtn.addEventListener('click', exitInvList)

// OPEN AND CLOSE EDIT CLIENT POPUP PAGE
const editPopupPage = document.getElementById("edited-info-page-cont")
const exitPopupPageBtn = document.getElementById("exit-edited-pg-btn")
const currentBtn = []
function openEditPopup(e) {
    editPopupPage.style.display = 'flex'

    if (currentBtn.length !== 0) {
        currentBtn.pop()
        currentBtn.push(e.target.value.trim())
        console.log(currentBtn)
    } else {
        currentBtn.push(e.target.value.trim())
        console.log(currentBtn)} 

    console.log('working')
}
function exitEditPopup() {
    editPopupPage.style.display = 'none'
}
exitPopupPageBtn.addEventListener('click', exitEditPopup)
// UPDATE NEW INFO VARIABLES 
const editInfoNameInput = document.getElementById("edit-name-input")
const editInfoEmailInput = document.getElementById("edit-email-input")
const editInfoPhoneInput = document.getElementById("edit-phone-input")
const saveEditInfoBtn = document.getElementById("save-edit-btn")
const delClientBtn = document.getElementById("delete-edit-btn")
// UPDATE NEW INFO FUNCTIONS
// edit info function 
async function saveEditedInfo() {
    const token = localStorage.getItem('authToken')
    const res = await fetch('/api/invoices', {
        credentials: 'include'
    });
    const data = await res.json()
    const currentClient = data.find((client) => Number(client.id) === Number(currentBtn[0]))
    const newName = editInfoNameInput.value.trim()
    const newEmail = editInfoEmailInput.value.trim()
    const newPhone = editInfoPhoneInput.value.trim()
    currentClient.del = 'no'

    if (newName !== '') {
        currentClient.name = editInfoNameInput.value.trim()
        editInfoNameInput.value = ''
    } 
    if (newEmail !== '') {
        currentClient.email = editInfoEmailInput.value.trim()
        editInfoEmailInput.value = ''
    } 
    if (newPhone !== '') {
        currentClient.phone = editInfoPhoneInput.value.trim()
        editInfoPhoneInput.value = ''
    } 
    const request = await fetch('/api/clients', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(currentClient),
        credentials: 'include'
    })
    
    editPopupPage.style.display = 'none'
}
saveEditInfoBtn.addEventListener('click', saveEditedInfo)
// delete client function 
async function deleteClient() {
    const token = localStorage.getItem('authToken')
    const res = await fetch('/api/invoices', {
        credentials: 'include'
    });
    const data = await res.json()
    const currentClient = data.find((client) => Number(client.id) === Number(currentBtn[0]))
    currentClient.del = 'yes'

    editPopupPage.style.display = 'none'
    const request = await fetch('/api/clients', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(currentClient),
        credentials: 'include'
    })
}
delClientBtn.addEventListener('click', deleteClient)


// LOAD CLIENT DATA FOR EDIT AND ADD BUTTONS
async function fetchClientData() {
    const res = await fetch('/api/clients', {
        credentials: 'include'
    });
    if (!res.ok) {
        const errorData = await res.json()
        if (errorData.message === 'FORBIDDEN: insufficient permissions') {
            window.location.href = '/'
        }
    }
    const data = await res.json()
    
    data.forEach((newClient) => {
        const editClientCont = document.getElementById("edit-container")
        const editGridCont = document.createElement("li")
        editGridCont.classList.add("edit-item-cont")
        editGridCont.style.padding = '0'
        editGridCont.style.margin = '0'
        const editGridName = document.createElement("button")
        editGridName.classList.add("edit-name-btns")
        editGridName.value = newClient.id
        editGridName.type = 'button'
        editGridName.id = "web-client-name"
        editGridName.innerText = newClient.name
        editGridName.addEventListener('click', openEditPopup)
        const editGridMobName = document.createElement("button")
        editGridMobName.classList.add("edit-name-btns")
        editGridMobName.value = newClient.id
        editGridMobName.type = 'button'
        editGridMobName.id = "phone-client-name"
        editGridMobName.innerText = newClient.name
        editGridMobName.addEventListener('click', openEditPopup)
        const editGridID = document.createElement("p")
        editGridID.classList.add("edit-items")
        editGridID.innerText = newClient.id

        editGridCont.appendChild(editGridName)
        editGridCont.appendChild(editGridMobName)
        editGridCont.appendChild(editGridID)
        editClientCont.appendChild(editGridCont)
    })
}
fetchClientData()

// DELETING INVOICES VARIABLES AND FUNCTION 
async function deleteInvoice(e) {
    const currentDelInvBtn = e.target.value.trim()
    const token = localStorage.getItem('authToken')
    const res = await fetch('/api/invoices', {
        credentials: 'include'
    });
    const data = await res.json()
    const unpaidData = data.unpaid
    const paidData = data.paid
    let deletedInvData = unpaidData.find((invoice) => invoice.InvoiceID === Number(currentDelInvBtn))
    if (!deletedInvData) {
        deletedInvData = paidData.find((invoice) => invoice.InvoiceID === Number(currentDelInvBtn))
    }
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
                alertTitle.remove()
                alertText.remove()
                no.remove()
                yes.remove()
                noText.remove()
                yesText.remove()
                deleteConfBtn.remove()

                const request = await fetch('/api/invoices', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(deletedInvData),
                    credentials: 'include'
                })
            } else if (no.checked === true) {
                alertPage.style.display = 'none'
                alertTitle.remove()
                alertText.remove()
                no.remove()
                yes.remove()
                noText.remove()
                yesText.remove()
                deleteConfBtn.remove()
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
  type: 'bar',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: 'Monthly Earnings',
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
