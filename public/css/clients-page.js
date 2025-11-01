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
// OPEN AND CLOSE ADD CLIENT PAGE
// ADD CLIENT PAGE INPUT VARIABLE
const clientNameInput = document.getElementById("client-name-input")
const clientEmailInput = document.getElementById("client-email-input")
const clientPhoneInput = document.getElementById("client-phone-input")
const clientIDInput = document.getElementById("client-id-input")
const saveClientBtn = document.getElementById("save-client-btn")

// OPEN AND CLOSE ADD NEW CLIENT PAGE FUNCTIONS
function openAddClPg() {
    addClientPage.style.display = 'flex'
}
addClientBtn2.addEventListener('click', openAddClPg)
function closeAddClPg(e) {
    e.preventDefault()
    addClientPage.style.display ='none'
}
exitAddClntPgBtn.addEventListener('click', closeAddClPg)
// SAVE CLIENTS FUNCTION 
const clients = []
async function saveClientInfo(e) {
    const newClient = {}
    e.preventDefault()
    if (!validateEmail(clientEmailInput.value.trim())) {
        alertPage.style.display = 'flex'
        alertPage.style.height = 'fit-content'
        alertTitle.innerText = 'ALERT'
        alertText.innerText = 'Enter a valid email.'
        setTimer()
        return
    }
    if (!validatePhone(clientPhoneInput.value.trim())) {
        alertPage.style.display = 'flex'
        alertPage.style.height = 'fit-content'
        alertTitle.innerText = 'ALERT'
        alertText.innerText = 'Enter a valid phone number with no spaces or -'
        alertText.style.textAlign = 'center'
        setTimer()
        return
    }
    newClient.name = clientNameInput.value.trim()
    newClient.email = clientEmailInput.value.trim()
    newClient.phone = clientPhoneInput.value.trim()
    
    clientNameInput.value = null
    clientEmailInput.value = null
    clientPhoneInput.value = null

    addClientPage.style.display = 'none'
     console.log(newClient

     )
    
    const request = await fetch('/api/clients', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newClient),
        credentials: 'include'
    })

    fetchData()
}
saveClientBtn.addEventListener('click', saveClientInfo)


async function fetchData() {
    const res = await fetch('/api/clients', {
        credentials: 'include'
    })
    if (!res.ok) {
        const errorData = await res.json()
        console.error(errorData)
        if (errorData.message === 'Server error unauthorized user.') {
            window.location.href = '/'
            return
        } else if (errorData.message === 'FORBIDDEN: insufficient permissions') {
            window.location.href = '/'
            return
        }
    } else {
        const data = await res.json()
        console.log(data)
        data.forEach((newClient) => {
        const clientStatEl = document.getElementById(String(newClient.email + 1))
        const clientEl = document.getElementById(String(newClient.email + 2))
        const clientEditEl = document.getElementById(String(newClient.email))
        if (clientStatEl) {
            clientStatEl.innerHTML = "" 
            }
        if (clientEl) {
            clientEl.remove()
        }
        if (clientEditEl) {
            clientEditEl.innerHTML = ""
        }
            // CLIENT PAGE DISPLAY VARIABLES
            const clientTableCont = document.getElementById("table-sub-cont")
            const clientListTableCont = document.getElementById("clients-list-sub-cont")
            const rowCont = document.createElement("tr")
            rowCont.classList.add("client-stats-cont")
            rowCont.id = String(newClient.email + 1)
            const clientName = document.createElement("td")
            clientName.classList.add("client-stats")
            clientName.innerText = newClient.name
            const clientEmail = document.createElement("td")
            clientEmail.classList.add("client-stats")
            clientEmail.innerText = newClient.email
            const clientStat = document.createElement("td")
            clientStat.classList.add("client-stats")
            clientStat.innerText = `$${0}`
            const rowCont2 = document.createElement("tr")
            rowCont2.id = String(newClient.email + 2)
            const clientName2 = document.createElement("td")
            clientName2.classList.add("clients")
            clientName2.innerText = newClient.name
            const clientEmail2 = document.createElement("td")
            clientEmail2.classList.add("clients")
            clientEmail2.innerText = newClient.email
            const clientPhone = document.createElement("td")
            clientPhone.classList.add("clients")
            clientPhone.innerText = newClient.phone
            const clientID = document.createElement("td")
            clientID.classList.add("clients")
            clientID.innerText = newClient.id

            rowCont.appendChild(clientName)
            rowCont.appendChild(clientEmail)
            rowCont.appendChild(clientStat)
            clientTableCont.appendChild(rowCont)
            rowCont2.appendChild(clientName2)
            rowCont2.appendChild(clientEmail2)
            rowCont2.appendChild(clientPhone)
            rowCont2.appendChild(clientID)
            clientListTableCont.appendChild(rowCont2)

            const editClientCont = document.getElementById("edit-container")
            const editGridCont = document.createElement("li")
            editGridCont.id = String(newClient.email)
            editGridCont.classList.add("edit-item-cont")
            editGridCont.style.padding = '0'
            editGridCont.style.margin = '0'
            const editGridName = document.createElement("button")
            editGridName.classList.add("edit-name-btns")
            editGridName.value = newClient.id
            editGridName.id = "web-client-name"
            editGridName.innerText = newClient.name
            editGridName.addEventListener('click', openEditPopup)
            const editGridMobName = document.createElement("button")
            editGridMobName.classList.add("edit-name-btns")
            editGridMobName.value = newClient.id
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
    
}
fetchData()

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/   // simple pattern
  return regex.test(email)
}
function validatePhone(phone) {
  const regex = /^\d{10}$/
  return regex.test(phone)
}


// EDIT PAGE VARIABLES
const editPage = document.getElementById("edit-client-page")
const editPageBtn = document.getElementById("edit-client-btn")
const exitEditPageBtn = document.getElementById("exit-cl-edit-pg-btn")

// OPEN AND CLOSE EDIT PAGE FUNCTIONS
async function editClientInfo() {
    editPage.style.display = 'flex'
}
editPageBtn.addEventListener('click', editClientInfo)
function closeEditPage() {
    editPage.style.display = 'none'
}
exitEditPageBtn.addEventListener('click', closeEditPage)
// OPEN AND CLOSE EDIT INFO POPUP VARIABLE
const editInfoPopup = document.getElementById("edited-info-page-cont")
const editInfoPopupBtns = document.querySelectorAll(".edit-name-btns")
const ExiteditPopupBtn = document.getElementById("exit-edited-pg-btn")
// OPEN AND CLOSE EDIT INFO POPUP FUNCTIONS
const currentBtn = []
function openEditPopup(e) {
    e.preventDefault()
    editInfoPopup.style.display = 'flex'
    if (currentBtn.length !== 0) {
        currentBtn.pop()
        currentBtn.push(e.target.value.trim())
        console.log(currentBtn)
    } else {
        currentBtn.push(e.target.value.trim())
        console.log(currentBtn)}
}
function closeEditPopup() {
    editInfoPopup.style.display = 'none'
}
ExiteditPopupBtn.addEventListener('click', closeEditPopup)
// UPDATE NEW INFO VARIABLES 
const editInfoNameInput = document.getElementById("edit-name-input")
const editInfoEmailInput = document.getElementById("edit-email-input")
const editInfoPhoneInput = document.getElementById("edit-phone-input")
const saveEditInfoBtn = document.getElementById("save-edit-btn")
const delClientBtn = document.getElementById("delete-edit-btn")
// UPDATE NEW INFO FUNCTIONS
// edit info function 
async function saveEditedInfo(e) {
    const res = await fetch('/api/clients', {
        credentials: 'include'
    })
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
        if (!validateEmail(editInfoEmailInput.value.trim())) {
            alertPage.style.display = 'flex'
            alertPage.style.height = 'fit-content'
            alertTitle.innerText = 'ALERT'
            alertText.innerText = 'Enter a valid email.'
            setTimer()
            return
        }
        currentClient.email = editInfoEmailInput.value.trim()
        editInfoEmailInput.value = ''
    } 
    if (newPhone !== '') {
        if (!validatePhone(editInfoPhoneInput.value.trim())) {
            alertPage.style.display = 'flex'
            alertPage.style.height = 'fit-content'
            alertTitle.innerText = 'ALERT'
            alertText.innerText = 'Enter a valid phone number with no spaces or -'
            alertText.style.textAlign = 'center'
            setTimer()
            return
        }
        currentClient.phone = editInfoPhoneInput.value.trim()
        editInfoPhoneInput.value = ''
    } 
    
    const request = await fetch('/api/clients', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(currentClient),
        credentials: 'include'
    })
    
    editInfoPopup.style.display = 'none'
}
saveEditInfoBtn.addEventListener('click', saveEditedInfo)
// delete client function 
async function deleteClient() {
    const res = await fetch('/api/clients', {
        credentials: 'include'
    })
    const data = await res.json()
    const currentClient = data.find((client) => Number(client.id) === Number(currentBtn[0]))
    currentClient.del = 'yes'

    editInfoPopup.style.display = 'none'

    const request = await fetch('/api/clients', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(currentClient),
        credentials: 'include'
    })
}
delClientBtn.addEventListener('click', deleteClient)
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

function setTimer() {
    setTimeout(() => {alertPage.style.display = 'none'}, 3500)
}