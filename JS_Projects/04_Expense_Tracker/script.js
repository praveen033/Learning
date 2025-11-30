document.addEventListener("DOMContentLoaded", () => {
  const expenseForm = document.getElementById("expense-form");
  const expense_Name_Input = document.getElementById("expense-name");
  const expense_Amount_Input = document.getElementById("expense-amount");
  const submit_Btn = document.getElementsByTagName("submit");
  const expense_List_Display = document.getElementById("expense-list");
  const expense_Total = document.getElementById("total-amount");

  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  runderValue();

  function saveToLocalStorage() {
    // console.log("it will calcutate total amount");
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }

  expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = expense_Name_Input.value.trim();
    const amount = parseFloat(expense_Amount_Input.value.trim());

    if (name !== null && amount > 0 && !isNaN(amount)) {
      expenses.push({
        productId: expenses.length + 1, // or we can use Date.now() to create ID
        Expense: name,
        Amount: amount,
      });
    } else {
      alert(`Expense or Amount value not correct!`);
      return;
    }
    saveToLocalStorage();
    expense_Name_Input.value = "";
    expense_Amount_Input.value = "";

    runderValue();
    console.log(expenses);
    // console.log(expenses.length);
  });

  // We can use this function for total calculation too
  // function Total_Amount_Display()
  // {
  //   return expenses.reduce((sum, expense)=>sum + expense.Amount,0)
  // }

  function runderValue() {
    let total = 0;
    expense_List_Display.innerHTML = "";

    if (expenses.length > 0) {
      expenses.forEach((l) => {
        total += l.Amount;
        let expenseList = document.createElement("li");
        expenseList.innerHTML = `
        ${l.Expense} - ${l.Amount}
        <button id=${l.productId}>Delete</button>`;

        expense_List_Display.appendChild(expenseList);
      });
      expense_Total.textContent = ` ${total}`;
    } else {
      expense_Total.textContent = ` ${total}`;
    }
  }

  expense_List_Display.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      let id = parseInt(e.target.getAttribute("id"));
      console.log(id);
      const delete_id = expenses.findIndex((p) => p.productId === id);
      console.log(`delete_id = `, expenses[delete_id]);
      if (delete_id !== -1) {
        expenses.splice(delete_id, 1);
      }
      console.log(expenses);
    }
    runderValue();
  });
});
