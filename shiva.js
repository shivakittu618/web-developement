const myForm = document.querySelector('#my-form');
const msg = document.querySelector('#msg');
const expenseInputs = document.querySelector('#expense');
const descriptionInput = document.querySelector('#description');
const categoryInput = document.querySelector('#category');
const btn = document.querySelector('#btn');
const expenseList = document.querySelector("#expense-list");

btn.addEventListener('click', (e) => {
    e.preventDefault();
    
    if (expenseInputs.value === '' || descriptionInput.value === '' || categoryInput.value === ''){
        msg.innerHTML = "*please don't leave any field blank";

    } else if(localStorage.getItem(descriptionInput.value) !== null){
        msg.innerHTML = `*${descriptionInput.value} is already present in list`;

    } else {
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(`${expenseInputs.value} - ${descriptionInput.value} - ${categoryInput.value}`));
        li.className = "list-group-item d-flex justify-content-between align-items-center";

      
        var btnDiv = document.createElement("div");
        btnDiv.className = "btn-group";
        li.appendChild(btnDiv);

       
        var editBtn = document.createElement('button');
        editBtn.appendChild(document.createTextNode("Edit"));
        editBtn.className = "btn btn-sm btn-success mx-1";
        btnDiv.appendChild(editBtn);

        
        var deleteBtn = document.createElement('button');
        deleteBtn.appendChild(document.createTextNode('Delete'));
        deleteBtn.className = "btn btn-sm btn-danger mx-1";
        btnDiv.appendChild(deleteBtn);

       
        expenseList.appendChild(li);

        
        let expenseStorage = {
            expense: expenseInputs.value,
            description: descriptionInput.value,
            category: categoryInput.value
        };

        expenseStorage = JSON.stringify(expenseStorage)
        localStorage.setItem(descriptionInput.value, expenseStorage)

        expenseStorage = JSON.parse(localStorage.getItem(descriptionInput.value));

        //clear input fields and error msg
        expenseInputs.value="";
        descriptionInput.value="";
        categoryInput.value="";
        msg.innerHTML = "";

        deleteBtn.addEventListener('click', (e) => {
            li.remove();
            localStorage.removeItem(expenseStorage.description);
        });

        
        editBtn.addEventListener('click', (e) => {
            expenseInputs.value = expenseStorage.expense;
            descriptionInput.value = expenseStorage.description;
            categoryInput.value = expenseStorage.category;

            li.remove();

            localStorage.removeItem(expenseStorage.description);
        });
        
    }
});