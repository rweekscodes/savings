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

let accounts = [...document.querySelectorAll(".acc")];
let allHistoryDOM = [...document.querySelectorAll(".hs")];

function clearAllHistoryDOM() {
  allHistoryDOM.forEach((h) => (h.innerHTML = ""));
}

// Options for the observer (which mutations to observe)
var config = { childList: true, subtree: true };

// Callback function to execute when mutations are observed
var callback = function (mutationsList, observer) {
  for (var mutation of mutationsList) {
    if (mutation.type === "childList") {
      console.log("Content of the container changed!");
      account.style.height = `${account.scrollHeight}px`;
      // Do something when content changes
    }
  }
};

accounts.forEach((account) => {
  // Create an observer instance linked to the callback function
  var observer = new MutationObserver(callback);

  // Start observing the target node for configured mutations
  observer.observe(account, config);

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

function openAccount(target, x, historyDOM) {
  const account = details[x];
  const transStatusDate = Object.keys(account);
  const transDetails = Object.values(account);

  clearAllHistoryDOM();

  transStatusDate.forEach((d) => {
    historyDOM.innerHTML += `
    <div class="t-sec">
		<h2 class="status">${d}</h2>
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
          <p class="memo">${D.title}</p>
          <h1 class=${D.type === "debit" ? "debit" : "credit"} >
          ${D.type === "debit" ? "-" : "+"}$${D.amount}</h1>
        </div>`;
    });
  });
}
