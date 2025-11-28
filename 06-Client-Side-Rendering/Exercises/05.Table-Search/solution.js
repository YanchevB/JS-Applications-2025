import { html, render } from "./node_modules/lit-html/lit-html.js";

function solve() {
   document.querySelector('#searchBtn').addEventListener('click', onClick);
   window.addEventListener('load', onLoad);

   const tbody = document.querySelector('tbody');
   const BASE_URL = 'http://localhost:3030/jsonstore/advanced/table';
   const inputRef = document.getElementById('searchField');

   const temp = (data) => html `
      <tr data-id=${data._id}>
         <td>${data.firstName} ${data.lastName}</td>
         <td>${data.email}</td>
         <td>${data.course}</td>
      </tr>`

   async function onLoad(e) {
      const response = await fetch(BASE_URL);

      if (response.status !== 200) {
        return alert('Error');
      }

      const data = await response.json();
      const allData = html `${Object.values(data).map(x => temp(x))}`;
      render(allData, tbody);
   }

   function onClick(e) {
      let input = inputRef.value;
      input = input.toLowerCase().trim();

      if (!input) {
         return;
      }

      const allRows = tbody.querySelectorAll('tr');
      allRows.forEach(row => {
         row.classList.remove('select');
         const cells = row.querySelectorAll('td');
         const match = Array.from(cells).some(cell => cell.textContent.toLowerCase().includes(input));

         if (!match) {
            return;
         } 
         
         row.classList.add('select')
      });

      inputRef.value = '';
   }
}

solve();