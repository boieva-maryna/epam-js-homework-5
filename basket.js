const items=document.getElementById('items');
        let plants=JSON.parse(localStorage.getItem('basket'));
        if(plants){
            plants.forEach(element => {
                let plant= new Plant(element);
                items.appendChild(plant.element);
            });
        }
        else items.innerHTML="Basket is empty"