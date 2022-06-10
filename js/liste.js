// Identify DOM elements
let
input = document.getElementById("task"),
newList = document.getElementById("list"),
items = document.getElementsByClassName('list-group-item'),
button = document.getElementById("liveToastBtn"),
ayn = document.querySelector('#samesame')

// Focuses input and calls addItem on button-click
input.focus()
button.addEventListener('click', addItem)

// Defines the listener function
function addItem() {
 
// Trims whitespace and sets string to lowerCase
const inputTrimmedLower = input.value.trim().toLocaleLowerCase()

// Clears and refocuses input
input.value = ""
input.focus()

// Not to add empty input
if (!inputTrimmedLower) { return  toast0() }

// Not to add value if a list item matches it
for (const li of items) {
  const liTrimmedLower = li.firstChild.nodeValue // to avoid the span we added with the x button
  if (liTrimmedLower === inputTrimmedLower) {
     ayn.innerHTML = `${inputTrimmedLower} is already listed`
    toast1()
    return
  }
}

// Add the new item and the x close button and call saveAll function to save listed items in localstorage
let newItem = document.createElement("li")
newItem.classList.add("list-group-item")
newItem.append(inputTrimmedLower)
newList.append(newItem)
toast2()
let closeBtn = document.createElement("span") // Create span element
closeBtn.textContent = "\u00D7"
closeBtn.classList.add("close") // "close" is just a class name we add to span element 
newItem.append(closeBtn)
closeBtn.onclick = removeListItem
newItem.onclick = checked
saveAll()
}

// Add "checked" class name to the list elements which adds style. check style.css!!
function checked() {
this.classList.toggle("checked")
}
// Remove list element when clicked on closeBtn and first removes then add the rest of the list elements to localstore by calling saveAll
function removeListItem() {
this.parentElement.remove()
localStorage.removeItem('elemanlar')
saveAll()
}

// Hide all the other toasts first to avoid any conflict
function toast0() {
$('#liveToast').toast('hide')
$('#liveToast1').toast('hide')

$('#liveToast0').toast('show')
}
function toast1() { 
$('#liveToast0').toast('hide')
$('#liveToast').toast('hide')

$('#liveToast1').toast('show')
}
function toast2() {
$('#liveToast0').toast('hide')
$('#liveToast1').toast('hide')

$('#liveToast').toast('show')
}

// LocalStorage.setItem
function saveAll() {
var toStorage = [] // Create an empty array
for (var i = 0; i < items.length; i++) {
  toStorage.push(items[i].firstChild.nodeValue) // Pushing every list element's values into our array, avoiding span elements
  localStorage.clear('elemanlar')
  localStorage.setItem('elemanlar', JSON.stringify(toStorage)) // Store array with the key name "elemanlar" 
}
}
// LocalStorage.getItem
function loadAll() {
let storedvalue = JSON.parse(localStorage.getItem('elemanlar'))
for (var i = 0; i < storedvalue.length; i++) {
  input.value = storedvalue[i] // Get every value of the array, make them input values and call addItem to add them like the first time
  addItem()
}   
}
// Checking 
loadAll();