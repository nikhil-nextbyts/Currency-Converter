let baseURL =
  "https://currency-conversion-and-exchange-rates.p.rapidapi.com/latest?from=USD&to=EUR,";

let apiKey =
  "GBP&rapidapi-key=1985cba75fmsh191e09f0cffd30ep12f1bejsn91f74501b462";

const dropdowns = document.querySelectorAll(".select select");
const fromCurr = document.querySelector(".from-under select");
const toCurr = document.querySelector(".to-under select");
const btn = document.querySelector("form button");
const msg = document.querySelector(".result");

for(let select of dropdowns){
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "From" && currCode === "USD") {
          newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
          newOption.selected = "selected";
        }
        select.append(newOption);
    }  
    
    select.addEventListener("change", (evt)=> {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
}

const updateExchangeRate = async () => {
    let amount = document.querySelector("form input");
    let amtValue = amount.value;
    if(amtValue === "" || amtValue < 1){
        amtValue = 1;
        amount.value = "1";
    }
    const URL = `${baseURL}${fromCurr}&to=${toCurr},${apiKey}`;
    let response = await fetch(URL);
    let data = await response.json();
    let {rates} = data;
    let country = toCurr.value;
    let rate = rates[country];
    

    let exchangeAmount = amtValue * rate;
    msg.innerText = `${amtValue} ${fromCurr.value} = ${exchangeAmount} ${toCurr.value}`;
}

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});



