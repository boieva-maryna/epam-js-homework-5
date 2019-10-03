const plants=[{
        'id':'0',
        'name':'Aloe Vera In Mini Dolores Planter',
        'img':'img/Aloe-Vera_1.jpg',
        'pot_colors':[
            {
                'color':'#FDF4EC',
                'color_name':'cream',
                'img':'img/Aloe-Vera_1.jpg',
                'default':'true'
            },
            {
                'color':'#EE6656',
                'color_name':'pale red',
                'img':'img/Aloe-Vera_2.jpg'
            },
            {
                'color':'#8E9C72',
                'color_name':'sage',
                'img':'img/Aloe-Vera_3.jpg'
            }
        ],
        'price':'22$'
    },
    {
        'id':'1',
        'name':'Air Plant Trio In Tillandz Stand Planter',
        'img':'img/Airplants.jpg',
        'pot_colors':[],
        'price':'50$'
    },
    {
        'id':'2',
        'name':'Hoya Heart In Ezra Planter',
        'img':'img/Hoya-Kerrii_3.jpg',
        'pot_colors':[
            {
                'color':'#B3C4BE',
                'color_name':'light blue',
                'img':'img/Hoya-Kerrii_1.jpg'
            },
            {
                'color':'#e5ad93',
                'color_name':'blush',
                'img':'img/Hoya-Kerrii_2.jpg'
            },
            {
                'color':'#CC6A4B',
                'color_name':'sonora',
                'img':'img/Hoya-Kerrii_3.jpg',
                'default':'true'
            },
            {
                'color':'#4c4746',
                'color_name':'black',
                'img':'img/Hoya-Kerrii_4.jpg'
            },
            {
                'color':'#FDF4EC',
                'color_name':'cream',
                'img':'img/Hoya-Kerrii_5.jpg'
            }
        ],
        'price':'21$'
    },
    {
        'id':'3',
        'name':'Monstera In Medium Grant Planter',
        'img':'img/Monstera.jpg',
        'pot_colors':[],
        'price':'55$'
    },
    {
        'id':'4',
        'name':'Philodendron Green In Grant Ceramic Planter',
        'img':'img/Wax-plant.jpg',
        'pot_colors':[],
        'price':'32$'
    },
    {
        'id':'5',
        'name':'Snake Laurentii Fiberglass Floor Planter',
        'img':'img/Snake_1.jpg',
        'pot_colors':[
            {
                'color':'#e5ad93',
                'color_name':'blush',
                'img':'img/Snake_1.jpg',
                'default':'true'
            },
            {
                'color':'#ffffff',
                'color_name':'white',
                'img':'img/Snake_2.jpg',
            }
        ],
        'price':'130$'
    },
    {
        'id':'6',
        'name':'ZZ Plant-6',
        'img':'img/Zamioculcas.jpg',
        'pot_colors':[],
        'price':'25$'
    },
    {
        'id':'7',
        'name':'Pothos Neon',
        'img':'img/Pothos.jpg',
        'pot_colors':[],
        'price':'15$'
    },
    {
        'id':'8',
        'name':'Pilea Peperomioides',
        'img':'img/Pilea.jpg',
        'pot_colors':[],
        'price':'20$'
    },
    {
        'id':'9',
        'name':'Calathea Pinstripe In Mini Hyde Planter',
        'img':'img/Calathea Pinstripe_2.jpg',
        'pot_colors':[
            {
                'color':'#e2b641',
                'color_name':'mustard',
                'img':'img/Calathea Pinstripe_2.jpg',
                'default':'true'
            },
            {
                'color':'#EE6656',
                'color_name':'pale red',
                'img':'img/Calathea Pinstripe_1.jpg'
            },
            {
                'color':'#8E9C72',
                'color_name':'sage',
                'img':'img/Calathea Pinstripe_3.jpg'
            }
        ],
        'price':'43$'
    },
    {
        'id':'10',
        'name':'Parlor Palm',
        'img':'img/Parlor Palm.jpg',
        'pot_colors':[],
        'price':'14$'
    },
    {
        'id':'11',
        'name':'Air Plant Trio in Andes Stands',
        'img':'img/Air Plant Trio.jpg',
        'pot_colors':[],
        'price':'50$'
    },
    {
        'id':'12',
        'name':'Money Tree In Olmsted Planter',
        'img':'img/Money Tree_1.jpg',
        'pot_colors':[
            {
                'color':'#B3C4BE',
                'color_name':'light blue',
                'img':'img/Money Tree_1.jpg',
                'default':'true'
            },
            {
                'color':'#e5ad93',
                'color_name':'blush',
                'img':'img/Money Tree_2.jpg'
            },
            {
                'color':'#4c4746',
                'color_name':'black',
                'img':'img/Money Tree_3.jpg'
            },
            {
                'color':'#FDF4EC',
                'color_name':'cream',
                'img':'img/Money Tree_4.jpg'
            }
        ],
        'price':'42$'
    },
    {
        'id':'13',
        'name':'Alocasia Polly',
        'img':'img/Alocasia Polly.jpg',
        'pot_colors':[],
        'price':'16$'
    },
    {
        'id':'14',
        'name':'Bird’s Nest Fern',
        'img':'img/Bird Nest.jpg',
        'pot_colors':[],
        'price':'25$'
    },
];
function createPlantElement(plant_info){
    let {name,price,img,pot_colors,id}=plant_info;
        const article=document.createElement('article');
        article.classList.add('plant');
        const header=document.createElement('h3');
        header.innerHTML= name;
        const figure=document.createElement('figure');
        const imgEl=document.createElement('img');
        figure.appendChild(imgEl);
        imgEl.src= img;
        imgEl.setAttribute('alt',name);
        const p=document.createElement('p');
        p.innerHTML= price;
        article.appendChild(figure);
        article.appendChild(header);
        article.appendChild(p);
        if( pot_colors.length>0){
            const form=document.createElement('form');
            form.classList.add('color-choice');
            const span=document.createElement('span');
            span.innerHTML=pot_colors.length+" pot colors: ";
            pot_colors.forEach((el,index)=>{
                const radio=document.createElement('input');
                radio.type='radio';
                radio.id=el.color_name+id;
                radio.name= id;
                if(el.default) radio.checked='true';
                const label=document.createElement('label');
                label.setAttribute('for',el.color_name+id);
                radio.dataset.img=el.img;
                label.style.background=el.color;
                form.appendChild(radio);
                form.appendChild(label);
                radio.onchange=(e)=>{
                    imgEl.src=e.target.dataset.img;
                }
                span.append(el.color_name);
                if(index!==pot_colors.length-1) span.append(", ");
            });
            article.appendChild(span);
            article.appendChild(form);
        }
        return article;
}
const items=document.getElementById('items');
const more =document.getElementById('more');
const toggle=document.getElementById('toggleView');
plants.slice(0,8).forEach(element => {
    items.appendChild(createPlantElement(element));
});
more.onclick=(e)=>{
    let index=items.childNodes.length;
        plants.slice(index,index+7).forEach(element => {
            items.appendChild(createPlantElement(element));
        });
    if(items.childNodes.length>=plants.length) more.style.display="none";
};
toggle.onclick=(e)=>{
    items.classList.toggle('list-view');
}
