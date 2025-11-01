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
function openSendInvsPage() {
        sendInvsPage.style.display = 'flex'
}
sendInvsPageBtnMob.addEventListener('click', openSendInvsPage)
sendInvsPageBtnWeb.addEventListener('click', openSendInvsPage)
function closeSendInvsPage() {
    sendInvsPage.style.display = 'none'
}
exitSendInvsPgBtn.addEventListener('click', closeSendInvsPage)
// OPEN AND CLOSE SEND POPUP VARIABLES AND FUNCTIONS
const sendPopupPage = document.getElementById("send-popup-page-cont")
const ExitsendPopupBtn = document.getElementById("exit-send-popup-btn")
const currentInvID = []
function openSendPopup(e) {
    console.log(e.target.value)
    if (e.target.innerText === 'Unpaid') {
        return
    } else {
        sendPopupPage.style.display = 'flex'
        if (currentInvID.length > 0) {
            currentInvID.pop()
            currentInvID.push(e.target.value.trim())
        } else {
            currentInvID.push(e.target.value.trim())
        }
    }
}
function closeSendPopup() {
    sendPopupPage.style.display = 'none'
}
ExitsendPopupBtn.addEventListener('click', closeSendPopup)
// SEND TO POP FUNCTIONS 
// dropdown list population
const dropdownCont = document.getElementById("clients-dropdown") 
async function createClientDropdown() {
    const response = await fetch('/api/clients', {
        credentials: 'include'
    })
    const data = await response.json()

    data.forEach((client) => {
        const dropdownClient = document.createElement("option") 
        dropdownClient.classList.add("dropdown-clients-list")
        dropdownClient.textContent = String(client.name)
        dropdownClient.value = String(client.email)

        dropdownCont.appendChild(dropdownClient)
    })
}
createClientDropdown()
// email button function 
// const emailInvBtn = document.getElementById("email-btn")
const sendInvBtn = document.getElementById("send-btn") 
// const sendDropdown = document.getElementById("clients-dropdown")
// function emailInvoice() {

// }
// emailInvBtn.addEventListener('click', emailInvoice)
async function sendInvoice(e) {
    const sendData = {}
    const dropDown = document.getElementById("clients-dropdown")
    const selectedClient = dropDown.value
    sendData.id = Number(currentInvID[0])
    sendData.email = selectedClient
    if (selectedClient === 'Choose Client') {
        alertPage.style.display = 'flex'
        alertPage.style.height = 'fit-content'
        alertTitle.innerText = 'ALERT'
        alertText.innerText = 'Choose a client'
    } else {
        try {
            const res = await fetch('/api/invoices/send', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(sendData),
                credentials: 'include'
            })
        } catch (err) {
            console.error(err)
        }

        const sentInvEl = document.getElementById(String(currentInvID[0]))
        if (sentInvEl) {
            const children = sentInvEl.children
            sentInvEl.removeChild(sentInvEl.lastElementChild)
            sentInvEl.removeChild(children[children.length - 1])
            const newStat = document.createElement("p")
            newStat.classList.add("send-invs-btns")
            newStat.innerText = 'Sent'
            newStat.style.fontSize = '16.5px'
            newStat.style.fontWeight = 'bold'
            sentInvEl.appendChild(newStat)
        }
        sendPopupPage.style.display = 'none'
        alertPage.style.display = 'flex';
        alertPage.style.height= 'fit-content';
        alertTitle.innerText = 'SENT'
        alertText.innerText = 'Invoice was sent successfully.';
        setTimer();
    }
}
sendInvBtn.addEventListener('click', sendInvoice)

// ALL INVOICES DATA VARIABLES
const invoices = []
const currentInvoice = []

// INVOICE ITEM SECTION ADD AND DISPLAY ITEM VARIABLES
const invItemsList = document.getElementById("invoice-items-grid-dis"); 
const itemInput = document.getElementById("item");
const description = document.getElementById("descript");
const quantity = document.getElementById("quantity");
const price = document.getElementById("price");
const addItemBtn = document.getElementById("add-inv-btn");
// INVOICE ITEM SECTION ERROR HANDLING, ADD AND DISPLAY ITEM FUNCTION 
// ADD ITEMS FUNCTION 
let items = []
async function addItem(e) {
    e.preventDefault();
    const item = {};
    switch ('') {
        case itemInput.value : 
        alertPage.style.display = 'flex', 
        alertText.innerText = 'The item textbox is empty.',
        setTimer();
        break;
        case description.value : 
        alertPage.style.display = 'flex',
        alertText.innerText = 'The description textbox is empty.',
        setTimer();
        break;
        case quantity.value : 
        alertPage.style.display = 'flex',
        alertText.innerText = 'The quantity textbox is empty.',
        setTimer();
        break;
        case price.value : 
        alertPage.style.display = 'flex',
        alertText.innerText = 'The price textbox is empty.',
        setTimer();
        break;
        default : {
        const itemContainer = document.createElement("tr");
        itemContainer.classList.add("inv-item-containers");
        const itemDis = document.createElement("td");
        itemDis.classList.add("inv-items");
        itemDis.textContent = itemInput.value.trim();
        const descriptionDis = document.createElement("td");
        descriptionDis.classList.add("inv-items");
        descriptionDis.textContent = description.value.trim();
        const quantityDis = document.createElement("td");
        quantityDis.classList.add("inv-items");
        quantityDis.textContent = quantity.value.trim();
        const priceDis = document.createElement("td");
        priceDis.classList.add("inv-items");
        priceDis.textContent = `$${price.value.trim()}`;
        item.item = itemInput.value.trim();
        item.description = description.value.trim();
        item.quantity = quantity.value.trim();
        item.price = price.value.trim();
        itemContainer.appendChild(itemDis);
        itemContainer.appendChild(descriptionDis);
        itemContainer.appendChild(quantityDis);
        itemContainer.appendChild(priceDis);
        invItemsList.appendChild(itemContainer);
        
        item.item = itemInput.value.trim();
        item.description = description.value.trim();
        item.quantity = quantity.value.trim();
        item.price = price.value.trim();
        item.comp = 'no';
        item.del = 'no';

        itemInput.value = '';
        description.value = '';
        quantity.value = '';
        price.value = '';
        break;
        }
    } 
    console.log(item)
    items.push(Number(items.length - 1) + 1)
    const response = await fetch('/api/invoices', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(item),
        credentials: 'include'
    })

    const data = await response.json()
}
addItemBtn.addEventListener('click', addItem)

async function addToSavePage() {
    const res = await fetch('/api/invoices', {
        credentials: 'include'
    })
    const data = await res.json()
    
    const unpaidData = data.unpaid
    const paidData = data.paid
    console.log(data, unpaidData, paidData)
    unpaidData.forEach((invoiceInfo) => {
        const invListEl = document.getElementById(String(invoiceInfo.InvoiceID))
        const invListEl2 = document.getElementById(String(invoiceInfo.InvoiceID + 1))
        if (invListEl) {
            invListEl.remove()
            invListEl2.remove()
            displaySendList(invoiceInfo, 'button', 'WAITING', 'button', 'Waiting')
            displayAllList(invoiceInfo, 'In.pr.', 'IN PROGRESS')
        } else {
            displaySendList(invoiceInfo, 'button', 'WAITING', 'button', 'Waiting')
            displayAllList(invoiceInfo, 'In.pr.', 'IN PROGRESS')
        }
    })
    paidData.forEach((invoiceInfo) => {
        const invListEl2 = document.getElementById(String(invoiceInfo.InvoiceID + 1))
        if (invListEl2) {
            invListEl2.remove()
            displayAllList(invoiceInfo, 'In.pr.', 'IN PROGRESS')
        } else {
            displayAllList(invoiceInfo, 'In.pr.', 'IN PROGRESS')
        }
    })
}
function displayAllList(invoiceInfo, text, text2) {
    const allInvsCont = document.getElementById("all-invs-container")
    
    const allInvsGridCont = document.createElement("li")
    allInvsGridCont.classList.add("all-invs-item-cont")
    allInvsGridCont.id = String(invoiceInfo.InvoiceID + 1)
    allInvsGridCont.style.padding = '0'
    allInvsGridCont.style.margin = '0'
    
    const allInvsGridNum = document.createElement('button')
    allInvsGridNum.classList.add("send-invs-btns")
    allInvsGridNum.value = invoiceInfo.InvoiceID
    allInvsGridNum.innerText = `#${invoiceInfo.InvoiceID}`
    allInvsGridNum.addEventListener('click', deleteInvoice)
    const allInvsGridName = document.createElement("p")
    allInvsGridName.classList.add("all-invs-items")
    allInvsGridName.id = "web-client-name"
    allInvsGridName.innerText = invoiceInfo.name
    const allInvsGridMobName = document.createElement("p")
    allInvsGridMobName.classList.add("all-invs-items")
    allInvsGridMobName.id = "phone-client-name"
    allInvsGridMobName.innerText = invoiceInfo.name
    const allInvsGridAmount = document.createElement("p")
    allInvsGridAmount.classList.add("all-invs-items")
    allInvsGridAmount.innerText = `$${invoiceInfo.total}`
    const allInvsGridMobStat = document.createElement("p")
    allInvsGridMobStat.classList.add("all-invs-items")
    allInvsGridMobStat.id = "phone-status"
    allInvsGridMobStat.innerText = text
    const allInvsGridStat = document.createElement("p")
    allInvsGridStat.classList.add("all-invs-items")
    allInvsGridStat.id = "web-status"
    allInvsGridStat.innerText = text2

    
    allInvsGridCont.appendChild(allInvsGridNum)
    allInvsGridCont.appendChild(allInvsGridName)
    allInvsGridCont.appendChild(allInvsGridMobName)
    allInvsGridCont.appendChild(allInvsGridAmount)
    allInvsGridCont.appendChild(allInvsGridMobStat)
    allInvsGridCont.appendChild(allInvsGridStat)
    allInvsCont.appendChild(allInvsGridCont)
}
function displaySendList(invoiceInfo, el, text2, el2, text) {
    const sendInvsCont = document.getElementById("send-invs-container")
    const sendInvsGridCont = document.createElement("li")
    sendInvsGridCont.classList.add("send-invs-item-cont")
    sendInvsGridCont.id = invoiceInfo.InvoiceID
    sendInvsGridCont.style.padding = '0'
    sendInvsGridCont.style.margin = '0'
    const sendInvsGridNum = document.createElement("p")
    sendInvsGridNum.classList.add("all-invs-items")
    sendInvsGridNum.innerText = `#${invoiceInfo.InvoiceID}`
    const sendInvsGridName = document.createElement("p")
    sendInvsGridName.classList.add("all-invs-items")
    sendInvsGridName.id = "web-client-name"
    sendInvsGridName.innerText = invoiceInfo.name
    const sendInvsGridAmount = document.createElement("p")
    sendInvsGridAmount.classList.add("all-invs-items")
    sendInvsGridAmount.innerText = `$${invoiceInfo.total}`
    const sendInvsGridStat = document.createElement(el)
    sendInvsGridStat.classList.add("send-invs-btns")
    sendInvsGridStat.id = "web-status"
    sendInvsGridStat.innerText = text2
    sendInvsGridStat.addEventListener('click', openSendPopup)
    const sendInvsGridMobName = document.createElement("p")
    sendInvsGridMobName.classList.add("all-invs-items")
    sendInvsGridMobName.id = "phone-client-name"
    sendInvsGridMobName.innerText = invoiceInfo.name
    const sendInvsGridMobStat = document.createElement(el2)
    sendInvsGridMobStat.classList.add("send-invs-btns")
    sendInvsGridMobStat.id = "phone-status"
    sendInvsGridMobStat.innerText = text
    sendInvsGridMobStat.value = invoiceInfo.InvoiceID
    sendInvsGridMobStat.addEventListener('click', openSendPopup)

    sendInvsGridCont.appendChild(sendInvsGridNum)
    sendInvsGridCont.appendChild(sendInvsGridName)
    sendInvsGridCont.appendChild(sendInvsGridMobName)
    sendInvsGridCont.appendChild(sendInvsGridAmount)
    sendInvsGridCont.appendChild(sendInvsGridMobStat)
    sendInvsGridCont.appendChild(sendInvsGridStat)
    sendInvsCont.appendChild(sendInvsGridCont)
}
// CREATING & SAVING INVOICES VARIABLES 
const nameInput = document.getElementById("name");
const invNum = document.getElementById("invoice-num");
const dateInput = document.getElementById("date");
const dueDateInput = document.getElementById("due-date");
const notesInput = document.getElementById("note-input");
const disCoupFeesInputs = document.querySelectorAll(".dis-coup-inputs")
const createInvBtn = document.getElementById("enter-inv-inputs-btn"); 
// CREATING & SAVING INVOICES FUNCTION
async function saveInvoice(e) {
    const invoiceInfo = {}
    e.preventDefault();
    const inputs = document.querySelectorAll("input[required]");
    let hasEmpty = false;
    for (let input of inputs) {
        if (!input.value.trim()) {
        hasEmpty = true;
        break;
        } 
    }

    if (hasEmpty) {
        alertPage.style.display = 'flex';
        alertText.innerText = 'Fill in billing information.';
        setTimer();
    } else if (items.length === 0) {
        alertPage.style.display = 'flex';
        alertText.innerText = 'Add items to the invoice.';
        setTimer();
    } else if (items.length > 0) {
        const [discountInput, couponInput, feesInput] = disCoupFeesInputs;

        const discounts = discountInput.value.trim() || "nothing entered";
        const coupons = couponInput.value.trim() || "nothing entered";
        const fees = Number(feesInput.value.trim()) || 0;
        const notes = notesInput.value.trim() || "nothing entered";
        invoiceInfo.InvoiceID = Number(invNum.value.trim()) || null
        invoiceInfo.name = nameInput.value.trim();
        invoiceInfo.date = dateInput.value.trim();
        invoiceInfo.due = dueDateInput.value.trim();
        invoiceInfo.discounts = discounts;
        invoiceInfo.notes = notes;
        invoiceInfo.fees = fees;
        invoiceInfo.coupons = coupons;
        invoiceInfo.comp = 'yes';
        invoiceInfo.del = 'no';
        invoiceInfo.stat = 'Waiting'

        if (currentInvoice.length >= 1) {
            currentInvoice.shift(currentInvoice[0])
            currentInvoice.unshift(invoiceInfo);
        } else {
            currentInvoice.unshift(invoiceInfo);
        }

        nameInput.value = '';
        invNum.value = '';
        dateInput.value = '';
        dueDateInput.value = '';
        notesInput.value = '';
        discountInput.value = '';
        couponInput.value = '';
        feesInput.value = '';
        
        invItemsList.innerHTML = ''

        sendInvsPage.style.display = 'flex'

        console.log(invoiceInfo)
        const request = await fetch('/api/invoices', {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(invoiceInfo),
            credentials: 'include'
        })

        addToSavePage()
    }    
}
createInvBtn.addEventListener('click', saveInvoice);

// DELETING INVOICES VARIABLES AND FUNCTION 
async function deleteInvoice(e) {
    const currentDelInvBtn = e.target.value.trim()
    const deletedInvData = {}
    deletedInvData.id = currentDelInvBtn
    deletedInvData.del = 'yes'
    const deletedAllInv = document.getElementById(String(Number(currentDelInvBtn) + 1))
    const deletedSendInv = document.getElementById(currentDelInvBtn)

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
                deletedAllInv.remove()
                deletedSendInv.remove()
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

// DRAFTED PAGE VARIABLES AND FUNCTIONS 
const draftPage = document.getElementById("drafted-invs-page")
const draftPageBtn = document.getElementById("draft-menu-btn")
const exitDraftPageBtn = document.getElementById("exit-draft-page-btn") 
const draftPageListCont = document.getElementById("draft-list-container")
const draftInvBtn = document.getElementById("draft-inv-inputs-btn")
const currentDraftInv = {}
// save a load the draft page functions 
async function draftInvoice() {
    const inputs = document.querySelectorAll("input[required]");
    let hasEmpty = false;
    for (let input of inputs) {
        if (!input.value.trim()) {
        hasEmpty = true;
        break;
        } 
    }

    if (hasEmpty) {
        alertPage.style.display = 'flex';
        alertPage.style.height= 'fit-content';
        alertText.innerText = 'Cannot draft an empty invoice.';
        setTimer();
        return
    }

    const [discountInput, couponInput, feesInput] = disCoupFeesInputs;
    currentDraftInv.name = nameInput.value.trim()
    currentDraftInv.invID = Number(invNum.value.trim()) || Math.floor(Math.random() * 3000)
    currentDraftInv.date = dateInput.value.trim()
    currentDraftInv.dueDate = dueDateInput.value.trim()
    currentDraftInv.discount = discountInput.value.trim()
    currentDraftInv.coupon = couponInput.value.trim()
    currentDraftInv.fees = feesInput.value.trim()
    currentDraftInv.item = {
        item: itemInput.value.trim(),
        description: description.value.trim(),
        quantity: quantity.value.trim(),
        price: price.value.trim()
    }
    const request = await fetch('api/invoices/drafts', {
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(currentDraftInv),
        credentials: 'include'
    })
    if (!request.ok) {
        const errorData = await request.json()
        if (errorData.message === 'FORBIDDEN: insufficient permissions') {
            window.location.href = '/'
        }
    }

    const draftItemsCont = document.createElement("li")
    draftItemsCont.classList.add("draft-items-cont")
    draftItemsCont.id = String(currentDraftInv.invID)
    const draftNum = document.createElement("button")
    draftNum.classList.add("draft-id-btns")
    draftNum.innerText = `#${currentDraftInv.invID}`
    draftNum.value = currentDraftInv.invID
    draftNum.addEventListener('click', loadDraftInv)
    const draftName = document.createElement("p")
    draftName.classList.add("draft-items")
    draftName.innerText = nameInput.value.trim()
    const draftDate = document.createElement("p")
    draftDate.classList.add("draft-items")
    draftDate.innerText = dateInput.value.trim()
    const deleteDraftBtn = document.createElement("button")
    deleteDraftBtn.classList.add("delete-draft-btn")
    deleteDraftBtn.innerText = 'DELETE'
    deleteDraftBtn.value = currentDraftInv.invID
    deleteDraftBtn.addEventListener('click', deleteDraftedInv)

    draftItemsCont.appendChild(draftNum)
    draftItemsCont.appendChild(draftName)
    draftItemsCont.appendChild(draftDate)
    draftItemsCont.appendChild(deleteDraftBtn)
    draftPageListCont.appendChild(draftItemsCont)

    nameInput.value = '';
    invNum.value = '';
    dateInput.value = '';
    dueDateInput.value = '';
    notesInput.value = '';
    discountInput.value = '';
    couponInput.value = '';
    feesInput.value = '';
    itemInput.value = '';
    description.value = '';
    quantity.value = '';
    price.value = '';

    invItemsList.innerHTML = ''
    draftPage.style.display = 'flex'
}
draftInvBtn.addEventListener('click', draftInvoice)
// open, close and populate draft page functions
function exitDraftPage() {
    draftPage.style.display = 'none'
}
exitDraftPageBtn.addEventListener('click', exitDraftPage)
function openDraftPage() {
    draftPage.style.display = 'flex'
}
draftPageBtn.addEventListener('click', openDraftPage)

const currentBtn = []
async function fetchDraftsData() {
    const res = await fetch('/api/invoices/drafts', {
        credentials: 'include'
    })
    const data = await res.json()

    data.forEach((invoice) => {
        const draftItemsCont = document.createElement("li")
        draftItemsCont.classList.add("draft-items-cont")
        draftItemsCont.id = String(invoice.invID - 1)
        const draftNum = document.createElement("button")
        draftNum.classList.add("draft-id-btns")
        draftNum.innerText = `#${invoice.invID}`
        draftNum.value = invoice.invID
        draftNum.addEventListener('click', loadDraftInv)
        const draftName = document.createElement("p")
        draftName.classList.add("draft-items") 
        draftName.innerText = invoice.name
        const draftDate = document.createElement("p")
        draftDate.classList.add("draft-items")
        draftDate.innerText = invoice.date
        const deleteDraftBtn = document.createElement("button")
        deleteDraftBtn.classList.add("delete-draft-btn")
        deleteDraftBtn.innerText = 'DELETE'
        deleteDraftBtn.value = invoice.invID
        deleteDraftBtn.addEventListener('click', deleteDraftedInv)

        draftItemsCont.appendChild(draftNum)
        draftItemsCont.appendChild(draftName)
        draftItemsCont.appendChild(draftDate)
        draftItemsCont.appendChild(deleteDraftBtn)
        draftPageListCont.appendChild(draftItemsCont)
    })
}
fetchDraftsData()

async function loadDraftInv(e) {
    const res = await fetch('/api/invoices/drafts', {
        credentials: 'include'
    })
    const data = await res.json()
    console.log(data)
    if (currentBtn.length > 0) {
        currentBtn.pop()
        currentBtn.push(e.target.value)
    } else {
        currentBtn.push(e.target.value)
    }
     console.log(data)
    const currentInvData = data.find((draft) => draft.invID === Number(currentBtn[0]))
    const [discountInput, couponInput, feesInput] = disCoupFeesInputs;
    nameInput.value = currentInvData.name
    invNum.value = currentInvData.invID
    dateInput.value = currentInvData.date
    dueDateInput.value = currentInvData.dueDate
    discountInput.value = currentInvData.discount
    couponInput.value = currentInvData.coupon
    feesInput.value = currentInvData.fees
    const itemContainer = document.createElement("tr");
    itemContainer.classList.add("inv-item-containers");
    const itemDis = document.createElement("td");
    itemDis.classList.add("inv-items");
    itemDis.textContent = currentInvData.item.item
    const descriptionDis = document.createElement("td");
    descriptionDis.classList.add("inv-items");
    descriptionDis.textContent = currentInvData.item.description
    const quantityDis = document.createElement("td");
    quantityDis.classList.add("inv-items");
    quantityDis.textContent = currentInvData.item.quantity
    const priceDis = document.createElement("td");
    priceDis.classList.add("inv-items");
    priceDis.textContent = `$${currentInvData.item.price}`;
    itemContainer.appendChild(itemDis);
    itemContainer.appendChild(descriptionDis);
    itemContainer.appendChild(quantityDis);
    itemContainer.appendChild(priceDis);
    invItemsList.appendChild(itemContainer);

    currentInvData.del = 'yes'

    draftPage.style.display = 'none'

    const draftItemsCont = document.getElementById(String(currentInvData.invID))
    const currentDraft = data.findIndex((draft) => draft.invID === Number(currentInvData.invID) - 1)
    draftItemsCont.remove()

    const request = await fetch('/api/invoices/drafts', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(currentInvData),
        credentials: 'include'
    })
}
// delete drafted invoice function 
const currentDelBtn = []
async function deleteDraftedInv(e) {
    const res = await fetch('/api/invoices/drafts', {
        credentials: 'include'
    })
    const data = await res.json()
    if (currentDelBtn.length > 0) {
        currentDelBtn.pop()
        currentDelBtn.push(e.target.value.trim())
    } else {
        currentDelBtn.push(e.target.value.trim())
    }
    const deletedDraft = data.find((draft) => draft.invID === Number(currentDelBtn[0]))
    deletedDraft.del = 'yes'

    const delDraftItemsCont = document.getElementById(String(deletedDraft.invID))
    delDraftItemsCont.remove()


    const request = await fetch('/api/invoices/drafts', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(deletedDraft),
        credentials: 'include'
    })
}


async function fetchInvoiceData() {
    const res = await fetch('/api/invoices', {
        credentials: 'include'
    })
    if (!res.ok) {
        const errorData = await res.json()
        console.error(errorData)
        if (errorData.message === 'Server error unauthorized user.') {
            window.location.href = '/'
            return
        }
    } else {
        const dataExt = await res.json()
        const unpaidData = dataExt.unpaid
        const paidData = dataExt.paid
        console.log(dataExt, unpaidData, paidData)
        unpaidData.forEach((invoiceInfo) => {
            const stat = invoiceInfo.stat
            console.log(stat)
            const invListEl = document.getElementById(String(invoiceInfo.InvoiceID))
            const invListEl2 = document.getElementById(String(invoiceInfo.InvoiceID + 1))
            if (invListEl || invListEl2) {
                invListEl.remove()
                invListEl2.remove()
                if (stat === 'Unpaid') {
                    displaySendList(invoiceInfo, 'p', stat, 'p', stat)
                    displayAllList(invoiceInfo, 'In.pr.', 'IN PROGRESS')
                } else if (stat === 'Waiting') {
                    displaySendList(invoiceInfo, 'button', stat, 'button', stat)
                    displayAllList(invoiceInfo, 'In.pr.', 'IN PROGRESS')
                } else if (stat === 'Paid') {
                    displaySendList(invoiceInfo, 'p', stat, 'p', stat)
                    displayAllList(invoiceInfo, 'Paid.', 'PAID')
                }
            } else {
                if (stat === 'Unpaid') {
                    displaySendList(invoiceInfo, 'button', stat, 'button', stat)
                    displayAllList(invoiceInfo, 'In.pr.', 'IN PROGRESS')
                } else if (stat === 'Waiting') {
                    displaySendList(invoiceInfo, 'button', stat, 'button', stat)
                    displayAllList(invoiceInfo, 'In.pr.', 'IN PROGRESS')
                } else if (stat === 'Paid') {
                    displaySendList(invoiceInfo, 'p', stat, 'p', stat)
                    displayAllList(invoiceInfo, 'Paid', 'PAID')
                }
            }
        })
        paidData.forEach((invoiceInfo) => {
            const stat = invoiceInfo.stat
            console.log(stat)
            const invListEl = document.getElementById(String(invoiceInfo.InvoiceID + 1))
            if (invListEl) {
                invListEl.remove()
                if (String(stat) === 'Unpaid') {
                    displayAllList(invoiceInfo, 'In.pr.', 'IN PROGRESS')
                } else if (stat === 'Waiting') {
                    displayAllList(invoiceInfo, 'In.pr.', 'IN PROGRESS')
                } else if (stat === 'Paid') {
                    displayAllList(invoiceInfo, 'Paid', 'PAID')
                }
            } else {
                if (String(stat) === 'Unpaid') {
                    displayAllList(invoiceInfo, 'In.pr.', 'IN PROGRESS')
                } else if (stat === 'Waiting') {
                    displayAllList(invoiceInfo, 'In.pr.', 'IN PROGRESS')
                } else if (stat === 'Paid') {
                    displayAllList(invoiceInfo, 'Paid', 'PAID')
                }
            }
        })
    }
}
fetchInvoiceData()

function setTimer() {
    setTimeout(() => {alertPage.style.display = 'none'}, 3500)
}



// NOTES
//  COLOR FOR THE TOP NAVBAR COLOR WHEN ON PAGE
// rgb(168, 109, 0);

// ADD A UNIQUE ID TO EACH INVOICE AS DEFAULT IF USER DOESNT ENTER A INVOICE NUMBER 
// update Math.random to unique id either in the frontend or backend

// CONTINUE EMAIL AND SEND INVOICE FUNCTIONS
// the currentInvID array has the id of the current invoice stored already match it to 
// the invoice in the invoices array in either front or backend then email or send to 
// client that was choosen