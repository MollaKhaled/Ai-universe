const loadData = async(dataLimit) => {
  // start loader
  toggleSpinner(true);
  
  const url=`https://openapi.programming-hero.com/api/ai/tools`;
  const res = await fetch(url);
  const data = await res.json();
  displayData(data.data.tools,dataLimit);
  // console.log(data.data.tools.image);
  toggleSpinner(false);
}

const displayData = (tools, dataLimit) => {
  
const aiContainer = document.getElementById('ai-Container');
// display 6 data only
const showAll = document.getElementById('show-all');
if(dataLimit && tools.length > 6){
  tools = tools.slice(0, 6);
  showAll.classList.remove('d-none');
}
else{
  showAll.classList.add('d-none');
}

// display all data
  tools.forEach(data =>{
   const aiDiv = document.createElement('div');
   aiDiv.classList.add('col');
   aiDiv.innerHTML= `
        <div class="card h-100 p-4">
           <img src="${data.image ? data.image:'No Image Found'}" class="card-img-top" alt="...">
          <div class="card-body">
          <h5 class="card-title">Features:</h5>
          <ul>
            ${data.features
              ? data.features.map((feature, index) => `<li class="list-group-item">${index + 1}. ${feature}</li>`).join('')
              : '<li>No Data Found</li>'}
          </ul>
          </div>
          <div class="card-footer d-flex justify-content-between">
          <div>
          <h5 class="card-title">${data.name ? data.name : 'No Data Found'}</h5>
          <h5 class="card-title">${data.published_in ? data.published_in : 'No Data Found'}
          </div>
          <div>
            <button onclick="loadToolsDetails('${data.id}')" class="btn btn-primary mt-2" data-bs-toggle="modal" data-bs-target="#dataDetailModal">Details</button>
          </div>
        </div>
      </div>
        </div>
      </div>
   `;
   aiContainer.appendChild(aiDiv)
  })
}
const processData =(dataLimit) => {
  loadData(dataLimit);
}
const toggleSpinner = isLoading => {
  const loaderSection = document.getElementById('loader');
  if(isLoading){
    loaderSection.classList.remove('d-none')
  }
  else{
    loaderSection.classList.add('d-none')
  }
} 

// not the best way to load show all
document.getElementById('btn-show-all').addEventListener('click', function(){
  processData()
})

const loadToolsDetails = async (id) => {
  const url=`https://openapi.programming-hero.com/api/ai/tool/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayToolsDetails(data.data);
}

const displayToolsDetails = data =>{
   console.log(data.accuracy.score);
  const modalBody = document.getElementById('modal-body');
  modalBody.innerHTML=`
  <div class="card w-50" style="width: 20rem;">
  <div class="card-body">
  <h5 id="description" class="card-title fs-5">${data.description}</h5>
  <div class="d-flex justify-content-center align-items-center gap-1 ms-2 ">
  <h5 class="card-title fs-6 border border-success p-2 mb-2 border-opacity-50 bg-success rounded">${data.pricing[0].price+ " "+ data.pricing[0].plan}   </h5>
<h5 id="pro" class="card-title fs-6 border border-success p-2 mb-2 border-opacity-50 bg-danger rounded">${data.pricing[1].price+ " "+ data.pricing[1].plan}</h5>
<h5 id="enterprise" class="card-title fs-6 border border-success p-2 mb-2 border-opacity-50 bg-info rounded">${data.pricing[2].price+ " "+ data.pricing[2].plan}</h5>
</div>
<div class="d-flex justify-content-between align-items-start ">
<div class="card" >
  <div class="card-body">
    <h6 class="card-title">Features:</h6>
    <ul>
      <li>${data.features[1].feature_name} </li>
      <li>${data.features[2].feature_name}</li>
      <li>${data.features[3].feature_name}</li>
    </ul>
  </div>
</div>
<div class="card" style="width: 20rem;" >
  <div class="card-body">
    <h6 class="card-title">Integrations:</h6>
    <ul>
      <li>${data.integrations[1]?data.integrations[1]:"Not Found" }</li>
      <li>${data.integrations[2]?data.integrations[2]:"Not Found" }</li>
      <li>${data.integrations[3]?data.integrations[3]:"Not Found" }</li>
    </ul>
  </div>
</div>
</div>
   </div>
   </div>
</div>
<div class="card w-50" style="width: 20rem;">
<img src="${data.image_link[0]}" class="card-img-top p-4 img-fluid" alt="...">
<div class="card-img-overlay">
<button class="btn btn-danger ms-2 mt-3 p-2">${data.accuracy.score} Accuracy</button>
</div>
<div class="card-body">
  <h5 class="card-title">${data.input_output_examples[0].input}</h5>
  <p>${data.input_output_examples[0].output}</p> 
</div>
  `;   
 
}
loadData();