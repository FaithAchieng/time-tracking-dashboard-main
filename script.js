const daily=document.getElementById('daily');

fetch("/data.json")
.then(response=>{
    if(!response.ok){
        throw new Error('Could not fetch data');
    }
    return response.json();
})
.then(data=>console.log(data))
.catch(error=>console.log(error));

daily.addEventListener('click', (event)=>{
      
});

function getDailyData(){

};