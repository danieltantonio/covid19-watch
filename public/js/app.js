console.log('Client side JavaScript file is loaded!');

fetch('http://localhost:3000/covid?address=XG').then((response) => {
  response.json().then((data) => {
    if(data.error) {
      console.log(data.error);
    } else {
      console.log(data);
    }
  })
});

const covidForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

// messageOne.textContent = 'Fr';

covidForm.addEventListener('submit', (e) => {
  e.preventDefault();

  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';

  const location = search.value.toUpperCase();

  fetch(`/covid?address=${location}`).then((response) => {
    response.json().then((data) => {
      if(data.error) {
        messageTwo.textContent = data.error;
      } else {
        messageOne.textContent = `State: ${data.state} | Country: ${data.country}`;
        messageTwo.textContent = `Confirmed Cases: ${data.stats.confirmedCases} | Newly Confirmed Cases: ${data.stats.newlyConfirmedCases} | Recovered: ${data.stats.recoverd} | Total Deaths: ${data.stats.totalDeaths} | New Deaths: ${data.stats.newDeaths}`;
      }
    })
  });
});
