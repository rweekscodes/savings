"use strict";
import details from "./details.js";
let accounts = [...document.querySelectorAll(".acc")];

accounts.forEach((account) => {
  console.log(account.classList);
  account.onclick = ({ target }) => {
    let type = target.id;
    let historyDOM = target.children[1].children[1];

    accounts.forEach((f) => f.classList.remove("open"));

    if (target.classList.contains("open")) {
      target.classList.remove("open");
      historyDOM.innerHTML = "";
      return;
    }

    target.classList.add("open");
    openAccount(target, type, historyDOM);
  };
});

function openAccount(target, x, historyDOM) {
  const account = details[x];
  const transStatusDate = Object.keys(account);
  const transDetails = Object.values(account);

  transStatusDate.forEach((d) => {
    historyDOM.innerHTML += `
    <div class="t-sec">
		<h2 class="status">${d}</h2>
        <div class="t-group"></div>
	</div>`;
  });

  transDetails.forEach((d, i) => {
    let allF = [...document.querySelectorAll(".t-group")];
    if (d.length === 0) {
      allF[i].innerHTML += `<p class='pending'>No pending transactions</p>`;
    }
    d.forEach((D) => {
      allF[i].innerHTML += `
        <div class="transaction">
          <p class="memo">${D.title}</p>
          <h1 class=${D.type === "debit" ? "debit" : "credit"} >
          ${D.type === "debit" ? "-" : "+"}$${D.amount}</h1>
        </div>`;
    });
  });
}
