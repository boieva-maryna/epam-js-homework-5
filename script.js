const plants=[{
        'name':'Aloe-Vera',
        'img':'img/Aloe-Vera_white.jpg',
        'pot_colors':[
            {
                'color':'red',
                'img':'img/Aloe-Vera_red.jpg'
            },
            {
                'color':'green',
                'img':'img/Aloe-Vera_green.jpg'
            }
        ],
        'price':'28$'
    },
    {
        'name':'Airplants trio',
        'img':'img/Airplants.jpg',
        'pot_colors':[],
        'price':'50$'
    },
    {
        'name':'Hoya Kerrii',
        'img':'img/Hoya-Kerrii.jpg',
        'pot_colors':[],
        'price':'25$'
    },
    {
        'name':'Monstera',
        'img':'img/Monstera.jpg',
        'pot_colors':[],
        'price':'60$'
    },
    {
        'name':'Wax-plant',
        'img':'img/Wax-plant.jpg',
        'pot_colors':[],
        'price':'45$'
    }
];
function createPlantElement(plant_info){
    let {name,img,price,pot_colors}=plant_info;
    const article=document.createElement('article');
    article.classList.add('plant');
    const header=document.createElement('h3');
    header.innerHTML=name;
    const figure=document.createElement('figure');
    const imgEl=document.createElement('img');
    figure.appendChild(imgEl);
    imgEl.src=img;
    const span=document.createElement('span');
    span.innerHTML=price;
    article.appendChild(figure);
    article.appendChild(header);
    article.appendChild(span);
    return article;
}
const items=document.getElementById('items');
const more =document.getElementById('more');
const toggle=document.getElementById('toggleView');
plants.slice(0,2).forEach(element => {
    items.appendChild(createPlantElement(element));
});
more.onclick=(e)=>{
    let index=items.childNodes.length;
        plants.slice(index,index+2).forEach(element => {
            items.appendChild(createPlantElement(element));
        });
    if(items.childNodes.length>=plants.length) more.style.display="none";
};
toggle.onclick=(e)=>{
    items.classList.toggle('list-view');
}