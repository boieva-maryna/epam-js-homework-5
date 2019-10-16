let plants;
init();
let basket=[];
if(localStorage.getItem('basket')) basket=JSON.parse(localStorage.getItem('basket'));
else if(plants){
    plants.forEach(el=>el.inChart=false);
    localStorage.setItem('plants',JSON.stringify(plants));
}
let id=1;
const items=document.getElementById('items');
const more =document.getElementById('more');
const toggle=document.getElementById('toggleView');
const toggleAddPlant=document.getElementById('toggleAddPlant');
const toggleFilter=document.getElementById("toggleFilter");
const addPlant=document.getElementById('addPlant');
const addPlantForm=document.forms.addPlant;
const filterForm=document.forms.filter;
const basketIcon=document.getElementsByClassName('basket')[0];
basketIcon.firstChild.innerHTML=basket.length;
addPlant.classList.add('hide');
filterForm.classList.add('hide');
addPlantForm.onsubmit= async(e)=>{
    e.preventDefault();
    let plant_info={};
    plant_info.pot_colors=[];
    let req=checkRequired();
    let opt=checkOptional();
    if(req&&opt||req||opt) alert('you must fill all the required fields');
    else{
        if(!req){
            plant_info.id=plants.length;
            plant_info.name=addPlantForm.elements.addName.value;
            plant_info.price=addPlantForm.elements.addPrice.value+'$';
            //plant_info.img=window.URL.createObjectURL(addPlantForm.elements.addImg.files[0]);
            plant_info.available='true';/*все добавленные вручную доступны к заказу, 
            т.к. мне лень пределывать форму*/
            plant_info.img= await getBase64(addPlantForm.elements.addImg.files[0]);
        }
        if(opt!==null&&opt!==true) {
            const color_names=document.querySelectorAll("[name^=potColorName]");
            const colors=document.querySelectorAll("[name^=potSwatch]");
            const imgs=document.querySelectorAll("[name^=potImg]");
            plant_info.pot_colors.push({
                color:colors[0].value,
                color_name:color_names[0].value,
                img:plant_info.img,
                default:true
            })
            for(let i=1;i<color_names.length;i++){
                let pot={}
                pot.color=colors[i].value;
                pot.color_name=color_names[i].value;
                pot.img=await getBase64(imgs[i-1].files[0]);
                plant_info.pot_colors.push(pot);
            }
        }
        console.log(plant_info);
        plants.push(plant_info);
        localStorage.setItem('plants',JSON.stringify(plants));
        let plant=new Plant(plant_info);
        plant.createToChart();
        plant.element.appendChild(plant.toChart);
        plant.toChart.onclick=(e)=>{e.preventDefault();addPlantToChart(plant)}
        if(items.childNodes.length==plants.length-1) items.appendChild(plant.element);
    }
}
filterForm.onsubmit=(e)=>{
    e.preventDefault();
    let res=checkFilter();
    if(!res) alert("You must fill the form first!");
    console.log(res);
}
toggle.onclick=(e)=>{
    e.target.classList.toggle("icofont-square");
    items.classList.toggle('list-view');
}
toggleAddPlant.onclick=()=>{
    addPlant.classList.toggle('show');
}
toggleFilter.onclick=()=>{
    filterForm.classList.toggle('show');
}
document.getElementById('addPot').onclick= function createPotForm(e){
    e.preventDefault();
    let pot_form=addPlantForm.elements.pot.cloneNode(true);
    pot_form.name+=id;
    for(let i=0;i<pot_form.elements.length;i++){
        let element=pot_form.elements[i];
        if(element.nodeName==="INPUT") {
            element.name+=id;
            element.parentNode.setAttribute('for',element.name);
        }
    }
    pot_form.elements.delImg.onclick=delImg;
    pot_form.elements.delImg.id+=id;
    const delPot=document.createElement('button');
    delPot.id='delPot'+id;
    delPot.innerHTML="-";
    delPot.onclick=deleteSelf;
    pot_form.appendChild(delPot);
    optional.appendChild(pot_form);
    id++;
}
document.getElementById('delImg').onclick=delImg;
document.getElementById('delImg0').onclick=delImg;
function deleteSelf(e) {
    e.preventDefault();
    e.target.parentNode.remove();
}
function delImg(ev){
    ev.preventDefault();
    ev.target.previousSibling.previousSibling.childNodes[1].value="";
}
function checkRequired(){//все обязательные заполнены?
    let isEmpty=false;
    const required=addPlantForm.required.elements;
    for(let i=0;i<required.length;i++){
        if(required[i].value===""&&required[i].nodeName==="INPUT"){
            return isEmpty=true;
        } 
    }
    return isEmpty;
}
function checkOptional(){//если одно заполнено, нужно заполнить остальные
    let isEmpty=false;
    const optional=addPlantForm.optional.elements;
    let countFilledOptional=0;
    for(let i=0;i<optional.length;i++){
        if(optional[i].value!==""&&optional[i].nodeName==="INPUT"&&optional[i].type!=="color") countFilledOptional++;
    }
    if(countFilledOptional>0) {
        for(let i=0;i<optional.length;i++){
            if(optional[i].value===""&&optional[i].nodeName==="INPUT"&&optional[i].type!=="color") return isEmpty=true;
        }   
    }
    else isEmpty=null;
    return isEmpty;
}
function checkFilter(){
    let res={}
    res.isAvailable=filterForm.available.checked;
    res.min=filterForm.priceFrom.value;
    res.max=filterForm.priceTo.value;
    if((res.max!==""&&res.max!=="0")||(res.min!==""&&res.min!=="0")||res.isAvailable!==false) return res;
    else return null;
}
function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
}
async function getPnantsJson(){
    const url='https://raw.githubusercontent.com/boieva-maryna/epam-js-homework-5/classes/plants.json';
        plants= await fetch(url).then(response => response.json());
}
async function init(){
    plants=JSON.parse(localStorage.getItem('plants'));
    if(!plants) await getPnantsJson();
    plants.slice(0,8).forEach(element => {
        let plant= new Plant(element);
        plant.createToChart();
        if(plant.data.inChart==true) {
            plant.toChart.classList.add('plant_chart--green');
            plant.toChart.classList.add("icofont-check-circled");
        };
        plant.element.appendChild(plant.toChart);
        plant.toChart.onclick=(e)=>{e.preventDefault();addPlantToChart(plant)}
        document.getElementById("items").appendChild(plant.element);
    });
}
function addPlantToChart(plant){
    if(plant.data.inChart==true) return;
    basket.push(plant.getData());
    localStorage.setItem('basket',JSON.stringify(basket));
    plants[plant.data.id].inChart=true;
    localStorage.setItem('plants',JSON.stringify(plants));
    plant.toChart.classList.add("icofont-check-circled");
    plant.toChart.classList.add('plant_chart--green');
    basketIcon.firstChild.innerHTML=basket.length;
}
more.onclick=(e)=>{
    let index=items.childNodes.length;
        plants.slice(index,index+8).forEach(element => {
            let plant=new Plant(element);
            plant.createToChart();
            if(plant.data.inChart==true) {
                plant.toChart.classList.add('plant_chart--green');
                plant.toChart.classList.add("icofont-check-circled");
            };
            plant.element.appendChild(plant.toChart);
            plant.toChart.onclick=(e)=>{e.preventDefault();addPlantToChart(plant)}
            items.appendChild(plant.element);
        });
    if(items.childNodes.length>=plants.length) more.style.display="none";
};