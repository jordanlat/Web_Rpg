console.log("Que la partie commence");
let cnt_click = 0;
let nameList = [];
let intro = true;
let bandit;


// Temporaire - en attendant de résoudre le call_Api => cors Allow-Origin-Access
nameList = [
    "Eli Aiden", "Gideon Khalil", "Devyn Cyril", "Chase Quentin", "Nolan Dermot", "Jayce Payton", "Buster Carl",
    "Manny Fabian", "Damian Audwin", "Louie Ivan", "Reece Denis", "Ade Warren", "Valentino Beck", "Doug Julio",
    "Lewis John", "Zane Aran", "Zeke Atticus", "Dwayne Olly", "Kedrick Finbar", "Mordecai Eric", "Toby Vance",
    "Zain Spike", "Chad Rory", "Les Damon", "Olaf Ali", "Kyan Pete", "Darryl Justice", "Prince Zaiden",
    "Paddy Nicholas", "Delbert Stanley", "Mitchell Chas", "Jadon Castor", "Oswald Harlan", "Rock Aswin",
    "Rock Jake", "Jude Amos", "Sean Stewart", "Maison Braeden", "Adrian Kye", "Willie Dario",
    "Stevie Irwin", "Jasper Anand", "Brent Ford", "Maximilian Duncan", "Frank Arturo", "Braylon Errol",
    "Germain Auden", "Benjy Elwyn", "Darren Finnian", "Elliott Laurence", "Trey Benson", "Rudy Rashan",
    "Alberto Clancy", "Flynn Cesar", "Torin Owain", "Kennedy Lev", "Bowen Zyle", "Alvin Arnold", "Kirk Ozzy",
    "Lloyd Nico", "Ashton Karson", "Cruz Tracey", "Auden Louis", "Winston Gaelan", "Ash Oliver",
    "Mikey Rudolph", "Zander Bernard", "Salvador Edsel", "Jefferson Henley", "Alfie Bryon", "Luciano Leland",
    "Rhydian Tiberius", "Barnaby Colton", "Ziggy Dimitri", "Trey Desmond", "Ty Titus", "Hugo Sandy",
    "Ty Lennon", "Turner Aldric", "Mitchell Calum", "Nasir Dan", "Valentine Ruben", "Castiel Leonard",
    "Finlay Willem", "Timothy Cecil", "Thaddeus Dino", "Elmer Jackson", "Erik Ahmad", "Darrin Callum",
    "Brooks Gabriel", "Ignacio Maison", "Dwayne Dev", "Doyle Kylen", "Jacob Sullivan", "Quentin Weston",
    "Ayaan Danny", "Alejandro Devin", "Patrick Shadrach", "Jarvis Jon", "Van Garman"
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
    setTimeout(() => {

        let type_texte = document.createElement('div');
        let add = document.getElementById('activity');

        type_texte.innerHTML = t;
        type_texte.setAttribute('id', cnt_click);
        add.appendChild(type_texte);
        cnt_click = cnt_click + 1;
        // Supprime l'élément à cnt_click -5
        if (cnt_click >= 6) {
            document.getElementById(cnt_click - 6).remove();
        }
    }, 00);
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
 *  Switch entre le menu Combat et Aventure
 */
function switch_menu() {
    let is_hide_main = document.getElementById('menu_main').getAttribute('hidden');

    if (is_hide_main === null) {
        document.getElementById('menu_main').setAttribute('hidden', "");
        document.getElementById('menu_combat').removeAttribute('hidden');
    } else {
        document.getElementById('menu_combat').setAttribute('hidden', "");
        document.getElementById('menu_main').removeAttribute('hidden');
    }

    // document.getElementById('menu_main').setAttribute('hidden', "");
    // document.getElementById('menu_combat').removeAttribute('hidden');
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
    div_t_name.innerHTML = '</p><b>Nom</b>: ' + e.name + '<p>';
    stat_div.appendChild(div_t_name);

    // stat vie
    let div_t_life = document.createElement('p');
    div_t_life.innerHTML = '</p><b>Vie</b>: ' + e.life + '<p>';
    stat_div.appendChild(div_t_life);

    // stat level
    let div_t_level = document.createElement('p');
    div_t_level.innerHTML = '</p><b>Level</b>: ' + e.level + '<p>';
    stat_div.appendChild(div_t_level);

    // stat exp
    let div_t_exp = document.createElement('p');
    div_t_exp.innerHTML = '</p><b>Expérience</b>: ' + e.exp + '<p>';
    stat_div.appendChild(div_t_exp);

    // stat attaque
    let div_t_atk = document.createElement('p');
    div_t_atk.innerHTML = '</p><b>Force max</b>: ' + e.atk + '<p>';
    stat_div.appendChild(div_t_atk);

    // stat gold
    let div_t_gold = document.createElement('p');
    div_t_gold.innerHTML = '</p><b>Zoublons</b>: ' + e.gold + '<p>';
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
            `
            - <b>${this.name}</b> est level  <b>${this.level}</b>.
            Il a <b>${this.life}</b> points de vie, 
            <b>${this.atk}</b> points de dégat max, et 
            <b>${this.gold}</b> zoublons sur lui. 
            `
        );
    }

    heal() {
        const nbrLife = dice(50);
        this.life = this.life + nbrLife;
        write(`- Tu as regagner <b>${nbrLife}</b> points de vie.`);
        update_hero(hero);
    }

    aventure() {
        let event = dice(5);

        switch (event) {
            case 1:
                write('- Oh! Non un bandit te veut du mal!');
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
                write("- Oh fou tu viens de trouver <b>" + zoublons_earn + "</b> zoublons !");
                hero.gold = hero.gold + zoublons_earn;
                update_hero(hero);

                break;

            case 3:
                const exp_earn = dice(1000);
                write(`- Wow tu viens de trouver un crystal d'exp et tu obtient <b>${exp_earn}</b> exp`);
                hero.exp = hero.exp + exp_earn;
                update_hero(hero);

                break;

            default:
                write("- Wow il ne s'est rien passé, même pas un bandit à l'horizon.");

        }
    }

}


/**
 * Start 
 */
let d_name = prompt("- Bonjour aventurier, comment te nommes tu ?");
if (d_name == null | d_name == "") {
    d_name = "Jhone Deau";
}

let hero = new Character(d_name, 0, dice(100), dice(100), 0, 0);
update_hero(hero);

// Création du héro
write(`- Bonjour <b>${d_name}</b>! Je m'appel zarvis et je serais votre assistant !`);



/**
 * Reset
 */
function reset() {
    console.log("hero avant", hero);
    hero = "";
    console.log("hero après", hero);
    let d_r_name = prompt("- Bonjour aventurier, comment te nommes tu ?");
    if (d_name == null | d_name == "") {
        d_name = "Jhone Deau";
    }
    hero = new Character(d_r_name, 0, dice(100), dice(100), 0, 0);
    update_hero(hero);
    write(`- Bonjour <b>${d_r_name}</b>! Je m'appel zarvis et je serais votre assistant !`);
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
    switch_menu();
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
    write(`- Le bandit à perdu <b>${dgt_hero}</b> points de vie.`);

    // résolution hero vie
    hero.life = hero.life - dgt_bandit;
    write(`- Tu a perdu <b>${dgt_bandit}</b> points de vie.`);

    // Condition de défaite
    if (hero.life <= 0 && bandit.life > 0) {
        alert("You DIED Bitch");
        switch_menu();
        reset();
    }
    // condition de victoire
    if (hero.life > 0 && bandit.life <= 0) {
        write(
            `
                - <b>${bandit.name}</b> a pris une sacrée branlet. Bien joué !
                Vous gagnez <b>${bandit.exp}</b> exp et <b>${bandit.gold}</b> zoublons. 
            `
        );

        alert("Héhé Bien jouer tu l'as battus.");

        hero.exp = hero.exp + bandit.exp;
        hero.gold = hero.gold + bandit.gold;
        switch_menu();
    }
    // Condition égalité
    if (hero.life <= 0 && bandit.life <= 0) {
        alert("Wow imposible... C'est une égalité.");
        write(
            `
                J'y crois pas....
            `
        );
        switch_menu();
        reset();
    }


    update_hero(hero);
});

// Super Attaque /Temporaire doublons de code
document.getElementById('super').addEventListener('click', () => {
    let chance_hero = dice(9);
    let dgt_hero = dice(hero.atk);
    if(chance_hero>=7) {
        dgt_hero = dgt_hero * 3;
        write(`- Wow coup critque !`);
    } else {
        dgt_hero = 0;
        write(`- Oh non .. tu as raté ton coup.`);
    }

    let chance_bandit = dice(9);
    let dgt_bandit = dice(bandit.atk);
    if(chance_bandit>=7) {
        dgt_bandit = dgt_bandit * 3;
        write(`- Oh non ...<b>${bandit.name}</b> t'as mis un coup critque !`);
    } else {
        dgt_bandit = 0;
        write(`- Super tu as échappé son coup critique.`);
    }

    // résolution bandit vie
    bandit.life = bandit.life - dgt_hero;
    write(`- Le bandit à perdu <b>${dgt_hero}</b> points de vie.`);

    // résolution hero vie
    hero.life = hero.life - dgt_bandit;
    write(`- Tu a perdu <b>${dgt_bandit}</b> points de vie.`);

    // Condition de défaite
    if (hero.life <= 0 && bandit.life > 0) {
        alert("You DIED Bitch");
        switch_menu();
        reset();
    }
    // condition de victoire
    if (hero.life > 0 && bandit.life <= 0) {
        write(
            `
                - <b>${bandit.name}</b> a pris une sacrée branlet. Bien joué !
                Vous gagnez <b>${bandit.exp}</b> exp et <b>${bandit.gold}</b> zoublons. 
            `
        );

        alert("Héhé Bien jouer tu l'as battus");

        hero.exp = hero.exp + bandit.exp;
        hero.gold = hero.gold + bandit.gold;
        switch_menu();
    }
    // Condition égalité
    if (hero.life <= 0 && bandit.life <= 0) {
        alert("Wow imposible... C'est une égalité");
        write(
            `
                    J'y crois pas....
                `
        );
        switch_menu();
        reset();
    }


    update_hero(hero);
});

/**
 * Action Se heal
 */
document.getElementById('soin').addEventListener('click', () => {
    hero.heal();
    update_hero(hero);
});