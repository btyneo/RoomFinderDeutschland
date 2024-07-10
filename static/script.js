const advancedSearch = document.querySelector(".advanced-search")
const variablesForm = document.querySelector(".form")
advancedSearch.addEventListener("click", function() {
    variablesForm.scrollIntoView({ behavior: 'smooth' })
})

const min = document.querySelector(".min")
const max = document.querySelector(".max")
const advancedSearchButton = document.querySelector(".advanced-search-button")
advancedSearchButton.addEventListener("click", function() {
    if (min < 0 || min > max) {
        // handle
    }
    min = (min > 1000) ? 1000 : min
    max = (max < 500) ? 500 : max

})