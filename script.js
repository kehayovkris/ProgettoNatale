var character = document.getElementById("character");
var game = document.getElementById("game");
var interval;
var both = 0;
var counter = 0; //conta il numero dei rettangoli
var currentBlocks = []; //indica i rettangoli presenti nell'area di gioco


function moveLeft(){
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left")); 
    if(left>0){//se non supera il bordo sinistro
        character.style.left = left - 2 + "px"; //fa spostare la palla a sinistra
    }
}

function moveRight(){
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if(left<380){ //se non supera il bordo destro
        character.style.left = left + 2 + "px";//fa spostare la palla a destra
    }
}
document.addEventListener("keydown", event => { 
    if(both==0){
        both++;
        if(event.key==="ArrowLeft"){ //se il pulsante freccia sinistra viene premuta richiami la funzione con intervallo di 1
            interval  = setInterval(moveLeft, 1);
        }
        if(event.key==="ArrowRight"){//se il pulsante freccia destra viene premuta richiami la funzione con intervallo di 1
            interval = setInterval(moveRight, 1);
        }
    }
});
document.addEventListener("keyup", event => { //Se i pulsanti vengono rilasciati la pallina si ferma 
    clearInterval(interval);
    both=0;
});

function generaBlocchi(){
    var blockLast = document.getElementById("block"+(counter-1)); //è l'ultimo rettangolo
    var holeLast = document.getElementById("hole"+(counter-1)); // è l'ultimo buco
    if(counter>0){ // se viene creato un rettangolo
        var blockLastTop = parseInt(window.getComputedStyle(blockLast).getPropertyValue("top")); //posizione su  dell'ultimo rettangolo
        var holeLastTop = parseInt(window.getComputedStyle(holeLast).getPropertyValue("top"));  //posizione  su dell'ultimo buco
    }
    if(blockLastTop<400||counter==0){ // evita che si creino rettangoli sotto l'area di gioco
        var block = document.createElement("div");
        var hole = document.createElement("div");
       //serve a far si che si possa modificare con css
        block.setAttribute("class", "block");
        hole.setAttribute("class", "hole");
        //serve a far si che si possa modificare con JavaScript
        block.setAttribute("id", "block"+counter);
        hole.setAttribute("id", "hole"+counter);
        block.style.top = blockLastTop + 100 + "px";
        hole.style.top = holeLastTop + 100 + "px";
        var random = Math.floor(Math.random() * 360); //variabile che gestisce la posizione casuale dei buchi
        hole.style.left = random + "px"; // genera il buco 
        game.appendChild(block);
        game.appendChild(hole);
        currentBlocks.push(counter); //aggiungi il contatore all'interno dell'array
        counter++; //
    }
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    var characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    var drop = 0;
    
    if(characterTop <= 0){ // se la palla è sopra 
        alert("Game over");
        clearInterval(blocks); 
        location.reload(); //riaggiorni la pagina
    }

    for(var i = 0; i < currentBlocks.length;i++){
        let current = currentBlocks[i];  //indica i rettangoli presenti nell'area di gioco
        let iblock = document.getElementById("block"+current);  //indica il rettangolo attuuale 
        let ihole = document.getElementById("hole"+current); // indica il buco attuale
        let iblockTop = parseFloat(window.getComputedStyle(iblock).getPropertyValue("top")); //indica la posizione su dell'rettangolo attuale
        let iholeLeft = parseFloat(window.getComputedStyle(ihole).getPropertyValue("left")); // indica la posizione a sinistra del buco attuale
        iblock.style.top = iblockTop - 0.5 + "px";  //sposta il 
        ihole.style.top = iblockTop - 0.5 + "px";
        if(iblockTop < -20){// se il rettangolo attuale è uscito dall'area di gioco
            currentBlocks.shift();
            iblock.remove(); 
            ihole.remove();
            //viene rimosso dall'array e dall'html
        }
       
        if(iblockTop-20<characterTop && iblockTop>characterTop){ // se la palla è su di un rettangolo
            drop++; 
            if(iholeLeft<=characterLeft && iholeLeft+20>=characterLeft){ // se la palla è su un buco
                drop = 0;
            }
        }
    }
    if(drop==0){ // se e su un buco
        if(characterTop < 480){ 
            character.style.top = characterTop + 2 + "px"; //cade
        }
    }else{
        character.style.top = characterTop - 0.5 + "px"; //la fa salire
    }

}
var blocks = setInterval(generaBlocchi,1);
