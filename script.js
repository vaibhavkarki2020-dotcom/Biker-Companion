let trips=[];
let editingIndex=-1;
let today=new Date();

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
document.getElementById("cancelEdit").addEventListener("click",cancelEdit); 

function saveTrip(){

    let bike=document.getElementById("bike").value;
    let distance=Number(document.getElementById("distance").value);
    let fuel=Number(document.getElementById("fuel").value);
    let food=Number(document.getElementById("food").value);
    let other=Number(document.getElementById("other").value);
    let total=fuel+food+other;
    if(bike.trim()===""){
        alert("Please Enter Bike Name");
        return;
    }
    if(fuel===0 && food===0 && other===0){
      alert("Please Enter Atleast One Expense");
    return;
    }
    if(fuel<0 || food<0 || other<0){
      alert("Expense Cannot Be Negative")
      return;
    }
    if(distance<=0){
      alert("Please Enter Distance");
      return;
    }
let tripDate;
 if(editingIndex===-1){
   tripDate=currentDate;
 }   else{
  tripDate=trips[editingIndex].date;
 }

let trip={
    bike:bike,
    distance:distance,
    fuel:fuel,
    food:food,
    other:other,
    expense:total,
    date:tripDate,

    };
if(editingIndex===-1){
  trips.push(trip);
}else
{
  trips[editingIndex]=trip;
}editingIndex=-1;
document.getElementById("saveTrip").innerText="Save Trip";
document.getElementById("cancelEdit").style.display="none";

localStorage.setItem("trips",JSON.stringify(trips));
displayTrips();
}

function displayTrips(){
let tripHistory=document.getElementById("tripHistory");
tripHistory.innerHTML="";
for(let i=0;i<trips.length;i++){
  let trip=trips[i];

 tripHistory.innerHTML+=`
 <div class="trip-card">
 <p><strong>Bike:</strong> ${trip.bike}</p>
 <p><strong>Distance:</strong> ${trip.distance} km</p>
 <p><strong>Fuel:</strong> ₹${trip.fuel}</p>
 <p><strong>Food:</strong> ₹${trip.food}</p>
 <p><strong>Other:</strong> ₹${trip.other}</p>
 <p class="trip-total"><strong>Total:</strong> ₹${trip.expense}</p>
 <p><strong>Date:</strong> ${trip.date}</p>
 <button class="edit-btn" onclick="editTrip(${i})">Edit</button>
<button class="delete-btn" onclick="deleteTrip(${i})">Delete</button>
 <hr>
</div>
`;}
updateStatistics();
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

if(fuel===0 && food===0 && other===0 ){
  alert("Please Enter Atleast One Expense.");
return;
}
if(fuel<0 || food<0 || other<0)
    {
        alert("Expenses Cannot Be Negative.");
        return;
    }
if(distance<=0){
    alert("Please Enter Distance");
    return;
}

let total=fuel+food+other;
document.getElementById("totalExpense").innerText="Total Expense: ₹" + total;
let costPerKm=(total/distance).toFixed(2);
document.getElementById("costPerKm").innerText="Cost Per Km: ₹" +costPerKm + "/km";
document.getElementById("totalExpense").style.display="block";
document.getElementById("costPerKm").style.display="block";
}
document.getElementById("resetExpense").addEventListener("click",Reset);

function Reset(){
    clearForm();
    document.getElementById("totalExpense").innerText= "";
    document.getElementById("costPerKm").innerText= "";
    document.getElementById("totalExpense").style.display="none";
    document.getElementById("costPerKm").style.display="none";
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

function goToNextInput(event,nextInputId)
{
    if(event.key==="Enter")
      {
        if(nextInputId!==null)
        {
          document.getElementById(nextInputId).focus();
        }else
        calculateTotal();
      }
}

function updateStatistics(){
  let totalTrips=trips.length;
  let totalDistance=0;
  let totalExpense=0;

  for(let i=0;i<trips.length;i++)
  {
    let trip=trips[i];

    totalDistance+=trip.distance;
    totalExpense+=trip.expense;
  }
let averageCost=0;
if(totalDistance>0)
{
 averageCost=totalExpense/totalDistance;
}averageCost=averageCost.toFixed(2);

document.getElementById("totalTrips").innerText="Total Trips:"+totalTrips;
document.getElementById("totalDistance").innerText="Total Distance:"+totalDistance+" km";
document.getElementById("totalExpenseStats").innerText="Total Expense:₹"+totalExpense;
document.getElementById("averageCostKm").innerText="Average Cost/Km:₹"+averageCost;
}




function editTrip(index){
  editingIndex=index;

  let trip=trips[index];

  document.getElementById("bike").value=trip.bike;
  document.getElementById("distance").value=trip.distance;
  document.getElementById("fuel").value=trip.fuel;
  document.getElementById("food").value=trip.food;
  document.getElementById("other").value=trip.other;

  document.getElementById("totalExpense").innerText = "";
document.getElementById("costPerKm").innerText = "";

document.getElementById("totalExpense").style.display = "none";
document.getElementById("costPerKm").style.display = "none";

  document.getElementById("saveTrip").innerText = "Update Trip";
  document.getElementById("cancelEdit").style.display="inline-block";

}



function cancelEdit(){
  if (editingIndex!==-1){
    editingIndex=-1;
  document.getElementById("saveTrip").innerText="Save Trip";
  document.getElementById("cancelEdit").style.display="none";
 
  clearForm();

  document.getElementById("totalExpense").innerText = "";
document.getElementById("costPerKm").innerText = "";
document.getElementById("totalExpense").style.display="none";
document.getElementById("costPerKm").style.display="none";

}
 }


function clearForm(){
  document.getElementById("bike").value="";
  document.getElementById("distance").value="";
  document.getElementById("fuel").value="";
  document.getElementById("food").value="";
  document.getElementById("other").value="";
}