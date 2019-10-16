class Plant{
    constructor(plant_info){
        this.data=plant_info;
        this.element;
        this.imgWr=document.createElement('div');
        this.slider;
        this.controls;
        this.textColors;
        this.title;
        this.price;
        this.isAvailable;
        this.createElement();
    }
    createElement(){
        this.element=document.createElement('article');
        this.element.dataset.isAvailable=this.data.available;
        this.element.dataset.price=Number.parseInt(this.data.price);
        this.element.classList.add('plant');
        this.imgWr.classList.add("plant_img");
        this.element.appendChild(this.imgWr);
        this.createTitle();
        this.element.appendChild(this.title);
        this.createPrice();
        this.element.appendChild(this.price);
        if(this.data.pot_colors.length>0) {
            this.createSlider();
            this.createControls();
            this.creteTextColors();
            this.element.appendChild(this.controls);
            this.element.appendChild(this.textColors);
        }
        else {
            this.createImg();
            this.slider=null;
            this.controls=null;
            this.textColors=null;
        }
        this.createIsAvailable();
        this.element.appendChild(this.isAvailable);
    }
    createTitle(){
        this.title=document.createElement('h3');
        this.title.innerHTML= this.data.name;
    }
    createPrice(){
        this.price=document.createElement('p');
        this.price.classList.add('plant_price');
        this.price.innerHTML=this.data.price;
    }
    createImg(){
        const imgEl=document.createElement('img');
        imgEl.src= this.data.img;
        imgEl.setAttribute('alt',name);
        this.imgWr.appendChild(imgEl);
    }
    createSlider(){
        let pot_colors=this.data.pot_colors;
        this.slider=document.createElement('div');
        this.slider.classList.add("plant_slider");
        this.slider.style.width=100*pot_colors.length+'%';
        pot_colors.forEach((el,index)=>{
            const img=document.createElement('img');
            img.src=el.img;
            img.style.width=100/pot_colors.length+"%";
            this.slider.appendChild(img);
            if(el.default) {
                this.slider.style.marginLeft='-'+index*100+'%';
            }
        });
        this.imgWr.appendChild(this.slider);
    }
    createControls(){
        let pot_colors=this.data.pot_colors;
        let id=this.data.id;
        this.controls=document.createElement('form');
        this.controls.classList.add('color-choice');
        pot_colors.forEach((el,index)=>{
            const radio=document.createElement('input');
            radio.type='radio';
            radio.id=el.color_name+id;
            radio.name= id;
            radio.onchange=this.setSlider.bind(this);
            if(el.default) radio.checked='true';
            const label=document.createElement('label');
            label.setAttribute('for',el.color_name+id);
            radio.dataset.number=index;
            label.style.background=el.color;
            this.controls.appendChild(radio);
            this.controls.appendChild(label);
        });
    }
    creteTextColors(){
        let pot_colors=this.data.pot_colors;
        this.textColors=document.createElement('span');
        this.textColors.classList.add('plant_pots');
        this.textColors.innerHTML=pot_colors.length+" pot colors: ";
        pot_colors.forEach((el,index)=>{
            this.textColors.append(el.color_name);
            if(index!==pot_colors.length-1) this.textColors.append(", ");
        });
    }
    createIsAvailable(){
        this.isAvailable=document.createElement('span');
        this.isAvailable.classList.add('available');
        if(this.data.available==='true') {
            this.isAvailable.innerHTML="Available!";
            this.isAvailable.classList.add("available--true");
        }
        else {
            this.isAvailable.innerHTML="Sold out!";
            this.isAvailable.classList.add("available--false");
        }
    }
    setSlider(e){
        this.slider.style.marginLeft='-'+e.target.dataset.number*100+"%";
    }
}