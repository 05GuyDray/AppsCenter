import {
  getDataFromServer,
  deleteById,
} from "../services/applicationService.js";
let currData;

window.document.addEventListener("DOMContentLoaded", () => {
  load();
  addPublishNewAppLink();
});

const load = () => {
  getData().then((data) => {
    currData = data;
    let html = makeApplicationsHtml(currData);
    document.getElementById("apps").innerHTML = html;
  });
};

function refresh() {
  load();
  document.body.querySelector("#search").value = "";
}

function addPublishNewAppLink() {
  document.getElementById("addAppButton").onclick = function () {
    location.href = "./addApplication.html";
  };
}

// make html

const makeApplicationsHtml = (data) => {
  let applectionsHTML = "";
  data.forEach((appData) => {
    applectionsHTML += makeAppRowHtml(appData);
  });
  return applectionsHTML;
};

const makeAppRowHtml = (appData) => {
  let imageurl = `../assets/images/app/${appData.imageUrl}`;
  let trashUrl = `../assets/images/trash.png`;
  return ` 
    <div class = "row-margin">
      <div class = "row sortable-item" data-mdb-id="sortable-item-266228">
          <div class="col col-sm-3" >
          </div> 
          <div class="col col-sm-2 text-center "> 
              <img src="${imageurl}" class = "img-logo" width="100" height="100">
          </div>
          <div class=" col col-sm-3 ">
              <div class = "row">
               <div class = "col-sm-12 no-paddin"><h2 class= " text">${appData.name}</h2>
              </div>
              <div class = "col-sm-12 no-paddin"><p class = "text">${appData.description}<p>
              </div>
              <div class = "col-sm-12 no-paddin" > <small class = "text">price: ${appData.price}$</small>
              </div>
              <div class = "col-sm-12 no-paddin"> <small  class = "text">compny name: ${appData.companyName}</small></div>
              </div>
          </div>
          <div class = "col col-sm-4">
              <button " onclick="onDelete('${appData.id}') ">
                  <img src="${trashUrl}"  width="40" height="40"/>
              </button>
          </div>
      </div>
      </div>
     `;
};

// search bar
window.search = (value) => {
  document.getElementById("apps").innerHTML = makeApplicationsHtml(
    filterData(value)
  );
};

const filterData = (searchedParam) => {
  const filterdData = currData.filter((app) =>
    app.name.toLowerCase().includes(searchedParam.toLowerCase())
  );
  return filterdData;
};

// data meniplation
async function getData() {
  return await getDataFromServer();
}

window.onDelete = (id) => {
  deleteById(id);
  refresh();
};
