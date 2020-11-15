
console.log("Que la partie commence");
let cnt_click = 0;

let nameList = [];

/**
 * Get status
 */
document.getElementById('status').addEventListener('click', ()=>{
    cnt_click = cnt_click + 1;
    let perso = new Character(nameList[dice(99)], dice(10), dice(100), dice(100), dice(1000));
    perso.status();

});


/**
 * Ecrit du texte
 */
function write(t){
    let type_texte = document.createElement('H3');
    let add = document.getElementById('activity');

    type_texte.innerText = "- " + t;
    type_texte.setAttribute('id', cnt_click);
    add.appendChild(type_texte);

    // Supprime l'élément à cnt_click -5
    if (cnt_click>5) {
        document.getElementById(cnt_click-5).remove();
    }
}


/**
 *  Randomiser
 */
function dice (max) {
    return Math.floor(Math.random() * Math.floor(max));
}

/**
 * Récupère la valeur du formulaire
 */
function get_input() {
    let value = document.querySelector('#input_text').value;
    return value;
}


/**
 * Personages
 */
class Character {
    constructor(name, level, life, atk, gold) {
        this.name = name;
        this.level = level;
        this.life = life;
        this.atk = atk;
        this.gold = gold;
    }

    // Les différentes actions
    status () {
        write (
            "Tu t'appel " + this.name
            + " , tu es level " + this.level + "."
            + " Tu as " + this.life + " points de vie, "
            + this.atk + " points d'attaques, et "
            + this.gold + " zoublons. "
        )
    }

}


/**
 * API récuperer des noms aléatoires
 */
async function call_Api() {
        let result = await fetch("http://names.drycodes.com/100?separator=space")
        .then(response => response.json())
        .then(result => {
            result.forEach(element => {
                nameList.push(element);
            });
        });
}
call_Api();


/**
 * Main 
 */
let b_heroIsSet = false;

if(b_heroIsSet === false) {
    document.getElementById("choix").setAttribute('hidden',"");
} else {
    document.getElementById("choix").removeAttribute('hidden');
}


// Création du héro
if (b_heroIsSet === false) {
    write("Bonjour voyageur, je m'appel zarvis et je serais votre assistant.");
    write("Avant d'aller plus loin, puis je connaitre votre nom ?");
    document.getElementById("form_input").removeAttribute("hidden");

    document.getElementById('bt_form_validate').addEventListener('submit', (e)=>{
        e.preventDefault();
        console.log(e);
    });

    b_heroIsSet = true;


}
