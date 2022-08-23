const MAX_SIZE  = {
    id: 50 ,
    imageUrl :300,
    name: 255,
    price: 255,
    descriptions : 500,
    companyName: 255,
}


function isDataValid(data){
    return Object.entries(MAX_SIZE).every(([key,value])=>{
        return value > `${data[key]}`.length;
    })
}

module.exports = {isDataValid}