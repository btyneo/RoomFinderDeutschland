


const advancedSearch = document.querySelector(".advanced-search")
const variablesForm = document.querySelector(".form")
advancedSearch.addEventListener("click", function() {
    variablesForm.scrollIntoView({ behavior: 'smooth' })
})

let advancedOrNot = true 
const searchButton = document.querySelector(".search-button")


searchButton.addEventListener("click", function() {
    const cityNameTopBar = document.querySelector(".search-bar").value;
    localStorage.setItem('cityNameTopBar', cityNameTopBar)
    localStorage.setItem('advancedOrNot', false)
 
    window.location.href = "results.html"
    


})

const advancedSearchButton = document.querySelector(".advanced-search-button")
advancedSearchButton.addEventListener("click", function() {
    const cityName = document.querySelector(".inputs.cityName").value;
    const min = document.querySelector(".inputs.min").value;
    const max = document.querySelector(".inputs.max").value;
    localStorage.setItem('cityName', cityName)
    localStorage.setItem('min', min)
    localStorage.setItem('max', max)
    localStorage.setItem('advancedOrNot', true)
    window.location.href = "results.html"
    
   
    

})