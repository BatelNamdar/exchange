const amountInput = document.getElementById("amountInput")
const selectFromCurrency = document.getElementById("selectFromCurrency")
const selectToCurrency = document.getElementById("selectToCurrency")
const showResult = document.getElementById("showResult")

async function getAllCurrencyNames(){
    let rates = await fetch('http://data.fixer.io/api/latest?access_key=88a5e040fd4f62eeb2f06ce7dbd02428')
    
    let data = await rates.json()
   
    let arr = []
    for( const key in data['rates']){
        arr.push(key)
    }
   
    return arr 
}   

function generateSelect(){
    let html = ``
   getAllCurrencyNames().then((rates_arr) => {

        for(i=0 ; i< rates_arr.length ; i++){
    
            html += ` <option value="${rates_arr[i]}">${rates_arr[i]}</option>`;
        }
    }).then(() => {
       
        selectFromCurrency.innerHTML = html
        selectToCurrency.innerHTML = html
    })

}

async function convert(){
    if(amountInput.value){
        apply()
    } else {
        alert('you need to insert Amount!')
    }
   


}
generateSelect()


async function apply(){
    let rates = await fetch('http://data.fixer.io/api/latest?access_key=88a5e040fd4f62eeb2f06ce7dbd02428')
    let data = await rates.json()
 
    let toCurrency = selectToCurrency.value
    
     
    showResult.innerHTML =
    `
    <h3 >${amountInput.value} ${ selectFromCurrency.value} is </h3>
    <h1 class=" text-light">${((data.rates[selectToCurrency.value])/(data.rates[selectFromCurrency.value]))* amountInput.value} ${selectToCurrency.value}</h1>
    `
 
}