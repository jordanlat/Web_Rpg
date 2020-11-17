
console.log("Que la partie commence");
let cnt_click = 0;
let nameList = [];
let intro = true;

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
 * Get status
 */
document.getElementById('status').addEventListener('click', () => {
    // let perso = new Character(nameList[dice(99)], dice(10), dice(100), dice(100), dice(1000));
    hero.status();
});


/**
 * Ecrit du texte
 */
function write(t) {
    let type_texte = document.createElement('H3');
    let add = document.getElementById('activity');

    type_texte.innerText = "- " + t;
    type_texte.setAttribute('id', cnt_click);
    add.appendChild(type_texte);
    cnt_click = cnt_click + 1;
    // Supprime l'élément à cnt_click -5
    if (cnt_click >= 5) {
        console.log("more five" + cnt_click);
        document.getElementById(cnt_click - 5).remove();
    }

}


/**
 *  Randomiser
 */
function dice(max) {
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
    status() {
        write(
            "Tu t'appel " + this.name
            + " , tu es level " + this.level + "."
            + " Tu as " + this.life + " points de vie, "
            + this.atk + " points d'attaques, et "
            + this.gold + " zoublons. "
        )
    }

    heal() {
        const nbrLife = dice(50);
        this.life = this.life + nbrLife;
        write("Tu as regagner " + nbrLife + " points de vie.");
    }

}


/**
 * Start 
 */
let d_name = prompt("Bonjour aventurier, comment te nommes tu ?: ");

let hero = new Character(d_name, 0, dice(100), dice(100), 0);

// Création du héro
write("Bonjour " + d_name + ", je m'appel zarvis et je serais votre assistant.");

/**
 * Action à l'enregistrement
 */
document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault();

    document.getElementById('choix').removeAttribute('hidden');
    document.getElementById('form_input').setAttribute('hidden', true);
    Main_game(get_input());

});

/**
 * Action Se reposer
 */

document.getElementById('heal').addEventListener('click', () => {
    hero.heal();
});
