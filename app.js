let url1="http://universities.hipolabs.com/search?country=";
let url2="http://universities.hipolabs.com/search?name=";

let btn1=document.querySelector("#btn1");
btn1.addEventListener("click",async()=>{
    let input1=document.querySelector("#search1");
    if(input1.value==""){
        let error=document.querySelector(".error");
        error.innerText="Enter country name";
        return 0;
    }
    let country=input1.value;
    let value=await getCollByCountry(country);
    // console.log(value);
    showCollByCountry(value);
});

let btn2=document.querySelector("#btn2");
btn2.addEventListener("click",async()=>{
    let input1=document.querySelector("#search1");
    let input2=document.querySelector("#search2");
    if(input2.value==""){
        let error=document.querySelector(".error2");
        error.innerText="Enter state name";
        return 0;
    }
    if(input1.value==""){
        let error=document.querySelector(".error");
        error.innerText="Enter country name";
        return 0;
    }else{
        let error=document.querySelector(".error");
        error.innerText="";
        let country=input1.value;
        let result=await getCollByCountry(country);
        showCollByState(result);
    }

})

let btn3=document.querySelector("#btn3");
btn3.addEventListener("click",async()=>{
    let input3=document.querySelector("#search3");
    if(input3.value==""){
        let error=document.querySelector(".error3");
        error.innerText="Enter name";
        return 0;
    }
    let name=input3.value;
    let value=await getCollByName(name);
    showDetails(value);
})

async function getCollByCountry(country) {
    try{
        let res=await axios.get(url1+country);
        // console.log(res);
        return res.data;
    }catch(err){
        console.log(err);
    }
}

async function getCollByName(name) {
    try{
        let res=await axios.get(url2+name);
        // console.log(res.data);
        return res.data;
    }catch(err){
        console.log(err);
    }
}

function showCollByCountry(arr){
    let error=document.querySelector(".error");
    error.innerText="";
    let error2=document.querySelector(".error2");
    error2.innerText="";
    let error3=document.querySelector(".error3");
    error3.innerText="";
    // console.log(arr);
    let list=document.querySelector("ul");
    list.innerText="";
    for(i of arr){
        let li=document.createElement("li");
        li.innerText=i.name;
        list.appendChild(li);
    }
}

function showCollByState(arr){
    let list=document.querySelector("ul");
    list.innerText="";
    let error2=document.querySelector(".error2");
    error2.innerText="";
    let error3=document.querySelector(".error3");
    error3.innerText="";
    let stateName=document.querySelector("#search2");
    let stateValue=stateName.value;
    let found =false;
    for(i of arr){
        console.log(i);
        console.log(i["state-province"]);
        if(i["state-province"] && stateValue.toLowerCase()==i["state-province"].toLowerCase()){

            let li=document.createElement("li");
            li.innerText=i.name;
            list.appendChild(li);
            found=true;
            // console.log(i.name);
        }
    }
    if (!found) {
        let li = document.createElement("li");
        li.innerText = "No results found";
        list.appendChild(li);
    }
}

function showDetails(value){
    let list=document.querySelector("ul");
    list.innerText="";
    let error=document.querySelector(".error");
    error.innerText="";
    let error2=document.querySelector(".error2");
    error2.innerText="";
    let error3=document.querySelector(".error3");
    error3.innerText="";
    let outputBox=document.querySelector(".outputBox");
    console.log(value);
    if(!value){
        outputBox.innerHTML="No results found";
        return 0;
    }
    let country=value[0].country;
    let linkArr=value[0].web_pages;
    let link =linkArr[0];
    let state=value[0]["state-province"];
    outputBox.innerHTML=`<b>Country</b>: ${country} <br> <b>State</b>: ${state} <br> <b>To apply</b> <a href="${link}">click here</a>`;
}
