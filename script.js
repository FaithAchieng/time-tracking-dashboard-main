document.addEventListener('DOMContentLoaded', () => {
    const daily = document.getElementById('daily');
    const weekly = document.getElementById('Weekly');
    const monthly = document.getElementById('Monthly');
    const cards = document.querySelectorAll('.work, .social, .play, .exercise, .self, .study');

    fetch("/data.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Could not fetch the data");
            }
            return response.json();
        })
        .then(data => {
            updateCards(data, 'weekly'); 
            setupButton(daily, data, 'daily');
            setupButton(weekly, data, 'weekly');
            setupButton(monthly, data, 'monthly');
        })
        .catch(error => console.log(error));

    function setupButton(button, data, timeframe) {
        button.addEventListener('click', event => {
            event.preventDefault();
            updateCards(data, timeframe);
        });
    }

    function updateCards(data, timeframe) {
        cards.forEach(card => {
            const title = card.querySelector('.down span').textContent.trim();
            const activityData = data.find(entry => entry.title === title);

            if (activityData) {
                const { current, previous } = activityData.timeframes[timeframe];

                
                ['daily', 'weekly', 'monthly'].forEach(tf => {
                    const container = card.querySelector(`.${tf}`);
                    if (container) container.textContent = ""; 
                });

                
                const container = card.querySelector(`.${timeframe}`);
                if (container) {
                    const style1 = document.createElement('p');
                    const style2 = document.createElement('p');
                    style1.classList.add('style1');
                    style2.classList.add('style2');

                    style1.textContent = `${current}hrs`; 
                    style2.textContent = `Previous - ${previous}hrs`; 

                    container.appendChild(style1);
                    container.appendChild(style2);
                }
            }
        });
    }
});



