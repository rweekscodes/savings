"use strict";

import details from "./details.js";

let menuBtn = document.getElementById("menuButton");
const menu = document.querySelector(".menu");
const closeBtn = document.querySelector(".close");
menuBtn.onclick = () => {
  menu.classList.add("open-menu");
  menu.classList.remove("close-menu");
};

closeBtn.onclick = () => {
  menu.classList.add("close-menu");
  menu.classList.remove("open-menu");
};

// total costs
let n = [],
  o = [];

function totalCost(transDetails) {
  let b = [];

  transDetails = Object.values(transDetails);

  b.push(transDetails);
  n.push(Array(b[0]));

  b.forEach((F) => {
    b = [];
    F.forEach((f) => {
      f.map((c) => b.push(Number(c.amount)));
    });
  });

  b = b.reduce((a, b) => a + b + 0);

  return b;
}

let pricesDOMs = [...document.querySelectorAll(".am")];

let Details = Object.values(details);
let accountTypes = Object.keys(details);

Details = Details.map((M, i) => {
  // console.log(totalCost(M));

  o.push(totalCost(M));
  // pricesDOMs[i].textContent = totalCost(M);
});

console.log(o);

let accContainer = document.querySelector(".acc-container");
let accountDOM = "";

accountTypes.forEach((a, i) => {
  accContainer.innerHTML += `
<button id=${a} class="acc">
		<div class="acc-head">
			<h1>${a} **1123</h1>
			<div
				class="numbs">
				<p class="cm title">Current</p>
				<div class="dots"></div>
				<p class="am current">${o[i]}</p>
			</div>
			<div class="numbs">
				<p class="cm title">Available</p>
				<div class="dots"></div>
				<p class="am available">${o[i]}</p>
			</div>

		</div>
		<div class="history">
			<h1 class="hd">History</h1>
			<div class="hs"></div>
		</div>
	</button>
  `;
});

let accounts = [...document.querySelectorAll(".acc")];
let allHistoryDOM = [...document.querySelectorAll(".hs")];

function clearAllHistoryDOM() {
  allHistoryDOM.forEach((h) => (h.innerHTML = ""));
}

accounts.forEach((account) => {
  account.onclick = ({ target }) => {
    let type = target.id;
    let historyDOM = target.children[1].children[1];

    if (target.classList.value.includes("open")) {
      target.classList.remove("open");
      return;
    }

    accounts.forEach((f) => f.classList.remove("open"));
    target.classList.add("open");
    openAccount(target, type, historyDOM);
  };
});

// Accounts

function openAccount(target, x, historyDOM) {
  const account = details[x];
  const transStatusDate = Object.keys(account);
  const transDetails = Object.values(account);

  clearAllHistoryDOM();

  transStatusDate.forEach((d) => {
    historyDOM.innerHTML += `
    <div class="t-sec">
        <div class="t-group"></div>
	  </div>`;
  });

  transDetails.forEach((d, i) => {
    let allTransactionGroups = [...document.querySelectorAll(".t-group")];
    if (d.length === 0) {
      allTransactionGroups[
        i
      ].innerHTML += `<p class='pending'>No pending transactions</p>`;
    }
    d.forEach((D) => {
      allTransactionGroups[i].innerHTML += `
        <div class="transaction">
          <p class="memo">${
            D.title
          } <span class='transid'>TransactionID : bgr_inv9272616726</span></p>
          <h1 class=${D.type === "Profit" ? "Profit" : "Deposit"} >
          ${D.type === "debit" ? "-" : "+"}$${D.amount}</h1>
        </div>`;
    });
  });
}

// const allItemsAmount = details.
