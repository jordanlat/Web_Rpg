
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


/*
async function call_Api() {
    const init = {
        method: 'get',
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    }
    let result = await fetch("http://names.drycodes.com/100?separator=space", init)
        .then(response => response.json())
        .then(result => {
            result.forEach(element => {
                nameList.push(element);
            });
        });
}
call_Api();
*/

/*
const url = "http://names.drycodes.com/100?separator=space";
let h = new Headers();
h.append('Content-Type', 'application/json');

let req = new Request(url, {
    method: 'GET',
    headers: h,
    mode: 'no-cors'
});
async function call_api () {
    await fetch(req)
    .then((response)=>{
        console.log(response);
        if(response.ok) {
            return response.json();
        } else {
            throw new Error('reponse not ok')
        }
    })
    .then((result) => {
        console.log(result);
    })
    .catch((err) => {
        console.log('error: ', err.message)
    });
}
call_api();

*/



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
    constructor(name, level, life, atk, gold, exp) {
        this.name = name;
        this.level = level;
        this.life = life;
        this.atk = atk;
        this.gold = gold;
        this.exp = exp;
    }

    // Les différentes actions
    status() {
        write(
            this.name
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

    aventure() {
        let event = dice(5);
        console.log(event);

        switch (event) {
            case 1:
                write('Oh! Non un bandit te veut du mal!');
                document.getElementById('menu_main').setAttribute('hidden', "");
                document.getElementById('menu_combat').removeAttribute('hidden');
                let bandit = new Character(
                    nameList[dice(99)],
                    dice(100),
                    dice(100),
                    dice(100),
                    dice(1000),
                    dice(100)
                );
                bandit.status();

                break;

            case 2:
                const zoublons_earn = dice(100000);
                write("Oh fou tu viens de trouver " + zoublons_earn + " zoublons !");
                hero.gold = hero.gold + zoublons_earn;

                break;

            case 3:
                const exp_earn = dice(1000);
                write("Wow tu viens de trouver un crystal d'exp et tu obtient " + exp_earn + " exp");
                hero.exp = hero.exp + exp_earn;

                break;

            default:
                write("Wow il ne s'est rien passé, même pas un bandit à l'horizon.");

        }
    }

}


/**
 * Start 
 */
let d_name = prompt("Bonjour aventurier, comment te nommes tu ?");

let hero = new Character(d_name, 0, dice(100), dice(100), 0);

// Création du héro
write("Bonjour " + d_name + " !" + " Je m'appel zarvis et je serais votre assistant !");


/************
 * MENU MAIN
 ************/

/**
 * Action Se reposer
 */
document.getElementById('heal').addEventListener('click', () => {
    hero.heal();
});

/**
 * Action status
 */
document.getElementById('status').addEventListener('click', () => {
    hero.status();
});

/**
 * Action aventure
 */
document.getElementById('aventure').addEventListener('click', () => {
    hero.aventure();
});



/**************
 * MENU COMBAT
 **************/
document.getElementById('attaquer'.addEventListener('clicl',() => {
    hero.attaque();
}))