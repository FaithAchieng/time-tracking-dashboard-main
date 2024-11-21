document.addEventListener('DOMContentLoaded', ()=>{

const daily=document.getElementById('daily');
const work=document.querySelector('.work');
const dailyContainer = document.querySelector('.work .down .daily'); 

fetch("/data.json")
.then(response=>{
    if(!response.ok){
        throw new Error("Could not fetch the data");  
    }
    return response.json();
})
.then(data=> getDailyData(data))
.catch(error=>console.log(error));

function getDailyData(data){
    daily.addEventListener('click',event=>{
        event.preventDefault();
        const workData = data.find(entry => entry.title === "Work");
        const { current, previous } = workData.timeframes.daily;
        dailyContainer.textContent="";
        const style1=document.createElement('p');
        const style2=document.createElement('p');
        style1.classList.add('style1');
        style2.classList.add('style2');
        style1.textContent = `${current}hrs`;
        style2.textContent = `Previous - ${previous}hrs`; 

        dailyContainer.appendChild(style1);
        dailyContainer.appendChild(style2);
    })
}
});