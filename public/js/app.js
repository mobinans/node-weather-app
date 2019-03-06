console.log('Client side js file loaded.')

const address = (address) => {
    fetch(`http://localhost:3000/weather?address=${address}`).then((response => {
    response.json().then((data) => {
        if(data.error){
            messageOne.textContent = 'Ooopppsss....'
            messageTwo.textContent = data.error;
        }else{
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forcast;
        }
    });
}));
};  

const searchForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.getElementById('message-1');
const messageTwo = document.getElementById('message-2');

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    messageOne.textContent = 'Loading....';
    messageTwo.textContent = '';

    const location = search.value;
    address(location);
});