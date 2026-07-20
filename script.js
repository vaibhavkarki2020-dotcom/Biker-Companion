console.log("Hello Biker");

let trips=[];

let today=new Date();

console.log(today.getDate());
console.log(today.getMonth());
console.log(today.getFullYear());

let day=today.getDate();
let month=today.getMonth()+1;
let year=today.getFullYear();
 
let currentDate=`${day}/${month}/${year}`;


let savedTrips=localStorage.getItem("trips");
if(savedTrips)
{
  trips=JSON.parse(savedTrips);
  displayTrips();
}

document.getElementById("saveTrip").addEventListener("click",saveTrip);

function saveTrip(){

    let bike=document.getElementById("bike").value;
    console.log("Bike Value:",bike)
    let distance=Number(document.getElementById("distance").value);
    let fuel=Number(document.getElementById("fuel").value);
    let food=Number(document.getElementById("food").value);
    let other=Number(document.getElementById("other").value);
    let total=fuel+food+other;
    if(bike.trim()==""){
        alert("Please Enter Bike Name");
        return;
    }


let trip={
    bike:bike,
    distance:distance,
    expense:total,
    date:currentDate,

    };
trips.push(trip);
console.log(trips);
displayTrips();
localStorage.setItem("trips",JSON.stringify(trips));
}

function displayTrips(){
let tripHistory=document.getElementById("tripHistory");
tripHistory.innerHTML="";
for(let i=0;i<trips.length;i++){
  let trip=trips[i];

 tripHistory.innerHTML+=`
 <div class="trip-card">
 <p><strong>Bike:</strong> ${trip.bike}</p>
 <p><strong>Distance:</strong> ${trip.distance}</p>
 <p><strong>Expense:</strong> ${trip.expense}</p>
 <p><strong>Date:</strong> ${trip.date}</p>
<button onclick="deleteTrip(${i})">Delete</button>
 <hr>
</div>
`;}
}



function deleteTrip(index){
  trips.splice(index,1);
  localStorage.setItem("trips",JSON.stringify(trips));
  displayTrips();

}


document.getElementById("calculateTrip").addEventListener("click",calculateTotal);

function calculateTotal(){
let fuel=Number(document.getElementById("fuel").value);
let food=Number(document.getElementById("food").value);
let other=Number(document.getElementById("other").value);
let distance=Number(document.getElementById("distance").value);
if(fuel==0 && food==0 && other==0)
    {
        alert("Please Enter At Least One Expense.");
        return;
    }
if(distance<=0){
    alert("Please Enter Distance");
    return;
}

let total=fuel+food+other;
document.getElementById("totalExpense").innerText="Total Expense: ₹" + total;
let costPerKm=(total/distance).toFixed(2);
document.getElementById("costPerKm").innerText="Cost Per Km: ₹" +costPerKm + "km";

}
document.getElementById("resetExpense").addEventListener("click",Reset);

function Reset(){
    document.getElementById("distance").value="";
    document.getElementById("fuel").value= "";
    document.getElementById("food").value= "";
    document.getElementById("other").value= "";
    document.getElementById("totalExpense").innerText= "";
    document.getElementById("costPerKm").innerText= "";
}


document.getElementById("rider").addEventListener("keydown",(event)=>{
  goToNextInput(event,"bike");
});
document.getElementById("bike").addEventListener("keydown",(event)=>{
    goToNextInput(event,"distance");
  });

  document.getElementById("distance").addEventListener("keydown", (event)=>{
    goToNextInput(event,"fuel");
  })
  document.getElementById("fuel").addEventListener("keydown",(event)=>{
    goToNextInput(event,"food");
  });
  document.getElementById("food").addEventListener("keydown",(event)=>{
    goToNextInput(event,"other");
  });
  document.getElementById("other").addEventListener("keydown",(event)=>{
    goToNextInput(event,null);
  });

function goToNextInput(event,nextInputId){
    if(event.key=="Enter"){
        if(nextInputId!=null){
            document.getElementById(nextInputId).focus();
        }else
        calculateTotal();
    }
}






