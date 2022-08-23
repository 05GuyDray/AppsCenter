import { addToServer } from "../services/applicationService.js";

const MIN_APP_NAME_LENGTH = 4;
const MAX_APP_NAME_LENGTH = 30;
const MAX_DESC_LENGTH = 500;
const MAX_COM_NAME_LENGTH = 30;
const MAX_IMG_URL_LENGTH = 300;

const DEFOLT_COMPNY_NAME_MSG = "this app does not have a company";
const DEFOLT_DESC_MSG = "this app does not have a description";
const DEFOLT_URL = `Help.png`;


window.onsubmit = (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const formProps = Object.fromEntries(formData);

  if (!isDataFormValid(formProps)) {
    document.getElementById("error msg").innerHTML =
      "Oops,something went wrong! <br> Check your fields again.";
  } else {
    addItemToTheList(makeDataApprpriatToInputIntoSys(formProps)); // TODO
    window.location.href = "MainPage.html";
  }
};

// input buttons

const inputValidationById = (id, Condtion) => {
  let element = document.getElementById(id);

  if (Condtion) {
    if (!element.classList.contains("is-valid")) {
      element.classList.add("is-valid");
    }
    if (element.classList.contains("is-invalid")) {
      element.classList.remove("is-invalid");
    }
  } else {
    if (!element.classList.contains("is-invalid")) {
      element.classList.add("is-invalid");
    }
    if (element.classList.contains("is-valid")) {
      element.classList.remove("is-valid");
    }
  }
};


window.inputValidationAppName = (value) => {
  let inputLength = (value + "").length;
  let condtion =
    inputLength >= MIN_APP_NAME_LENGTH && inputLength <= MAX_APP_NAME_LENGTH;
  inputValidationById("name", condtion);
};

window.inputValidationAppPrice = (value) => {
  let condtion = !isNaN(value) && `${value}`.length > 0;
  inputValidationById("price", condtion);
};

window.inputValidationAppName = inputValidationAppName;

// data manipulation 
const isDataFormValid = (data) =>{
  let isAppNameValid = data.name.length >= MIN_APP_NAME_LENGTH && data.name.length  <= MAX_APP_NAME_LENGTH;
 
  let isPriceNum = !isNaN(data.price) && `${data.price}`.length > 0;
 
  let isAppDescritionInValidRange = isThingInLengthRange(data.description,0,MAX_DESC_LENGTH);

  let isCompnyNameInValidRange = isThingInLengthRange(data.companyName,0,MAX_COM_NAME_LENGTH);
 
  let IsImgUrlInValidRange  =  isThingInLengthRange(data.imageUrl,0,MAX_IMG_URL_LENGTH);

  return isPriceNum && isAppNameValid && isAppDescritionInValidRange && isCompnyNameInValidRange && IsImgUrlInValidRange;    
} 

const isThingInLengthRange = (thing , min, max ) =>{
  return `${thing}`.length >= min &&  `${thing}`.length < max ;
}

const makeDataApprpriatToInputIntoSys = (data) => {
  let imgUrl;
  let companyName;
  let desc;
  if (data.imageUrl == "") {
    imgUrl = DEFOLT_URL;
  } else {
    imgUrl = data.imageUrl;
  }

  if (data.companyName == "") {
    companyName = DEFOLT_COMPNY_NAME_MSG;
  } else {
    companyName = data.companyName;
  }

  if (data.description == "") {
    desc = DEFOLT_DESC_MSG;
  } else {
    desc = data.description;
  }

  return {
    imageUrl: `${imgUrl}`,
    name: `${data.name}`,
    price: `${data.price}`,
    description: `${desc}`,
    companyName: `${companyName}`,
  };
};

async function addItemToTheList(data) {
  addToServer(data);
} 
