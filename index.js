let transactions = [];

const saved = localStorage.getItem("transactions");


const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expence = document.getElementById("expence");

const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

const historyContainer = document.querySelector(".history-info");

const addBtn = document.querySelector(".transaction-btn");

addBtn.addEventListener("click", function(e){
     e.preventDefault();

     const transaction = {
        id: Date.now(),
        text: text.value,
        amount: +amount.value
     };

     transactions.push(transaction);

     if(text.value.trim() === "" || amount.value.trim() === ""){
    alert("Please enter valid data");
    return;
    }

     renderTransactions();
     updateValues();

    text.value = "";
    amount.value = "";

})

function renderTransactions(){

    historyContainer.innerHTML = "";

    transactions.forEach((item , index) => {

    const li = document.createElement("li");
    li.innerText = `${item.text} R${item.amount}`;
    li.style.marginLeft = "30px";
    li.style.marginTop = "10px";

    if(item.amount > 0){
        li.style.color = "green";
    }else{
        li.style.color = "red";
    }

    const dltBtn = document.createElement("button");
    dltBtn.innerText = "Delete";
    dltBtn.style.marginLeft = "20px"

    dltBtn.addEventListener("click", function(){
        transactions.splice(index, 1);
        renderTransactions();
        updateValues();
    })
    

    li.appendChild(dltBtn);
    historyContainer.appendChild(li);
    })
}

function updateValues(){

    const amounts = transactions.map(item => item.amount);
    const totalbalance = amounts.reduce((acc, num) => acc + num , 0);

    const allIncome = amounts
    .filter(num => num > 0)
    .reduce((acc, num) => acc + num , 0);

    const expences = amounts
    .filter(num => num < 0)
    .reduce((acc, num) => acc + num , 0);

    balance.innerText = `R${totalbalance}`;
    income.innerText = `R${allIncome}`;
    expence.innerText = `R${Math.abs(expences)}`;

}
