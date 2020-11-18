



console.log("Que la partie commence");
let cnt_click = 0;
let nameList = [];
let intro = true;
let bandit;


// Temporaire - en attendant de résoudre le call_Api => cors Allow-Origin-Access
nameList = [
    "Trees Puppy","Male Shelf","Floppy Disk Floppy Disk","Running Horse","Settings Mail","Breakfast Allergies",
    "Shoe Water","Clock Horse","BBQ Drugs","Dog YouTube","Mail Soda","Laptop Toilet","Clock Leash","Puppy Breakfast",
    "Prints Male","Dislike Soda","Kitty Ice cream","Poop Running","Hnads Shelf","Video games Comics","Dog Puppy",
    "Floppy Disk Shoes","Robot Post office","Hnads Dislike","System Monster","Whale Plants","Fence Fence",
    "Prints Floppy Disk","Elevator Fusion","Cone Cone","YouTube Shoe","Video games Shoes","Shoe Dislike",
    "Toilet Cat","Male Cat","Comics Video games","Bird Boat","Running Prints","Dog Dislike","Boat Towel",
    "Breakfast Rollers","Male Trees","Toolbox Cat","Soap Prints","Website Kitty","System Allergies","Poop Solar",
    "BBQ Hnads","Rollers BBQ","Toolbox Leash","Comics Shower","Dog Book","Plants Book","Crab Kitty","Nuclear Boat",
    "Post office Allergies","Prints Ring","Comics Nuclear","Towel Clock","Leash Cat","BBQ Settings","Drugs Shelf",
    "Urine Clock","Soda Flowers","YouTube Cone","System Post office","Hnads Laptop","Websites Leash","Ice cream cone Comics",
    "Puppy Websites","Flowers Robot","Toolbox Plants","Kitty Floppy Disk","Comics BBQ","Crab Cat","System Sink","Floppy Disk Clock",
    "Puppy Android","Solar Post office","Sink Shower","Printer Sink","Toilet Ice cream","Settings Laptop","Shoes Post office",
    "Trees Light saber","Male Ring","Towel Monster","Leash Settings","Plants Male","Settings Trees","Ring Solar","Solar YouTube",
    "Poop Ring","Male Plus","Monster Puppy","Flowers Allergies","Breakfast Soda","Drugs Cat","Dog Robot","Shelf Rollers"
];

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
            console.log(nameList);
        });
}
// call_Api();



/**
 * Ecrit du texte
 */
function write(t) {
    let type_texte = document.createElement('p');
    let add = document.getElementById('activity');

    type_texte.innerHTML = "- " + t;
    type_texte.setAttribute('id', cnt_click);
    add.appendChild(type_texte);
    cnt_click = cnt_click + 1;
    // Supprime l'élément à cnt_click -5
    if (cnt_click >= 5) {
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
 * Actualise l'affichage des stats
 */
function update_hero(e) {
    let stat_div = document.getElementById('hero_stats');

    if (stat_div.childElementCount > 0) {
        stat_div.innerHTML = "";
    };

    // stat Nom
    let div_t_name = document.createElement('p');
    div_t_name.innerText = 'Nom: ' + e.name;
    stat_div.appendChild(div_t_name);

    // stat vie
    let div_t_life = document.createElement('p');
    div_t_life.innerText = 'Vie: ' + e.life;
    stat_div.appendChild(div_t_life);

    // stat level
    let div_t_level = document.createElement('p');
    div_t_level.innerText = 'Level: ' + e.level;
    stat_div.appendChild(div_t_level);

    // stat exp
    let div_t_exp = document.createElement('p');
    div_t_exp.innerText = 'Expérience: ' + e.exp;
    stat_div.appendChild(div_t_exp);

    // stat attaque
    let div_t_atk = document.createElement('p');
    div_t_atk.innerText = 'Force max: ' + e.atk;
    stat_div.appendChild(div_t_atk);

    // stat gold
    let div_t_gold = document.createElement('p');
    div_t_gold.innerText = 'Zoublons: ' + e.gold;
    stat_div.appendChild(div_t_gold);
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
            "<b>" + this.name + "</b>" +
            " , tu es level " + "<b>" + this.level + "</b>" + "." +
            " Tu as " + "<b>" + this.life + "</b>" + " points de vie, " +
            "<b>" + this.atk + "</b>" + " points d'attaques, et " +
            "<b>" + this.gold + "</b>" + " zoublons. "
        )
    }

    update_hero_stats() {

    }

    heal() {
        const nbrLife = dice(50);
        this.life = this.life + nbrLife;
        write("Tu as regagner <b>" + nbrLife + "</b> points de vie.");
        update_hero(hero);
    }

    aventure() {
        let event = dice(5);

        switch (event) {
            case 1:
                write('Oh! Non un bandit te veut du mal!');
                document.getElementById('menu_main').setAttribute('hidden', "");
                document.getElementById('menu_combat').removeAttribute('hidden');
                let newBandit = new Character(
                    nameList[dice(99)],
                    dice(100),
                    dice(100),
                    dice(100),
                    dice(1000),
                    dice(100)
                );
                newBandit.status();
                bandit = newBandit;
                break;

            case 2:
                const zoublons_earn = dice(100000);
                write("Oh fou tu viens de trouver <b>" + zoublons_earn + "</b> zoublons !");
                hero.gold = hero.gold + zoublons_earn;
                update_hero(hero);

                break;

            case 3:
                const exp_earn = dice(1000);
                write("Wow tu viens de trouver un crystal d'exp et tu obtient <b>" + exp_earn + "</b> exp");
                hero.exp = hero.exp + exp_earn;
                update_hero(hero);

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

let hero = new Character(d_name, 0, dice(100), dice(100), 0, 0);
update_hero(hero);

// Création du héro
write("Bonjour <b>" + d_name + "</b> !" + " Je m'appel zarvis et je serais votre assistant !");



/**
 * Reset
 */
function reset() {
    let d_r_name = prompt("Bonjour aventurier, comment te nommes tu ?");
    let hero = new Character(d_r_name, 0, dice(100), dice(100), 0, 0);
    update_hero(hero);
    write("Bonjour <b>" + d_r_name + "</b> !" + " Je m'appel zarvis et je serais votre assistant !");
}

/************
 * MENU MAIN
 ************/

/**
 * Action Se reposer
 */
document.getElementById('heal').addEventListener('click', () => {
    hero.heal();
    update_hero(hero);
});

/**
 * Action status
 */
document.getElementById('status').addEventListener('click', () => {
    hero.status();
    update_hero(hero);
});

/**
 * Action aventure
 */
document.getElementById('aventure').addEventListener('click', () => {
    hero.aventure();
    update_hero(hero);
});



/**************
 * MENU COMBAT
 **************/

// Si on attaque
document.getElementById('attaquer').addEventListener('click', () => {
    let dgt_hero = dice(hero.atk);
    let dgt_bandit = dice(bandit.atk);

    // résolution bandit vie
    bandit.life = bandit.life - dgt_hero;
    write("Le bandit à perdu <b>" + dgt_hero + "</b> points de vie");

    // résolution hero vie
    hero.life = hero.life - dgt_bandit;
    write("Tu a perdu <b>" + dgt_bandit + "</b> points de vie");


    if (hero.life <= 0) {
        alert("DAMN you is dead");
        reset();
    }
    update_hero(hero);
});