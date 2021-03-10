document.addEventListener('DOMContentLoaded', function () {
    console.log('hello');
    const inputUah = document.querySelector('#uah'),
        inputUsd = document.querySelector('#usd'),
        inputEur = document.querySelector('#eur');

    function inputEvent(inputSelector) {
        inputSelector.addEventListener('input', () => {
            const request = new XMLHttpRequest();

            request.open('GET', 'https://api.exchangeratesapi.io/latest');
            request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            request.send();

            request.addEventListener('readystatechange', () => {
                if (request.readyState === 4 && request.status === 200) {
                    console.log(request.response);
                }
            });

            
        });
    }

    inputEvent(inputUah);
});

// create const inputs
// create event input
// add XMLHttpRequest
// request open (method, url)
// 
// 
// 
// 