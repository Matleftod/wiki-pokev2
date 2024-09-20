document.getElementById('menu-button').addEventListener('click', function () {
    const dropdownMenu = document.getElementById('dropdown-menu');
    dropdownMenu.style.display = (dropdownMenu.style.display === 'block') ? 'none' : 'block';
});

// Ajoute un listener pour rendre le menu sticky lorsqu'on scrolle
window.onscroll = function() {
    const menuContainer = document.getElementById('menu-container');
    if (window.pageYOffset > 10) {
        menuContainer.classList.add("sticky");
    } else {
        menuContainer.classList.remove("sticky");
    }
};

//Search bar
document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const pokemonListItems = document.querySelectorAll('.zone ul li');

    searchInput.addEventListener('input', function (e) {
        const searchTerm = e.target.value.toLowerCase();

        pokemonListItems.forEach(function (li) {
        const pokemonName = li.querySelector('.pokemon-name').textContent.toLowerCase();
        if (pokemonName.includes(searchTerm)) {
            li.style.display = '';
        } else {
            li.style.display = 'none';
        }
        });
    });
});

let selectedTypes = []; // Stocke les types sélectionnés
let isAttackMode = true; // Default to Attack mode

const typeEffectiveness = {
    normal: {
        weakTo: ['fighting'],         // Défense : faible contre
        strongAgainst: [],            // Attaque : efficace contre
        immuneTo: ['ghost'],          // Défense : immunisé contre
        resistantTo: [],              // Défense : résistant contre
        weakAgainst: ['rock', 'steel'],  // Attaque : peu efficace contre
        noEffectOn: ['ghost']         // Attaque : inefficace contre
    },
    fire: {
        weakTo: ['water', 'ground', 'rock'],
        strongAgainst: ['grass', 'ice', 'bug', 'steel'],
        immuneTo: [],
        resistantTo: ['fire', 'grass', 'ice', 'bug', 'steel', 'fairy'],
        weakAgainst: ['water', 'rock', 'fire', 'dragon'],
        noEffectOn: []
    },
    water: {
        weakTo: ['electric', 'grass'],
        strongAgainst: ['fire', 'ground', 'rock'],
        immuneTo: [],
        resistantTo: ['fire', 'water', 'ice', 'steel'],
        weakAgainst: ['water', 'grass', 'dragon'],
        noEffectOn: []
    },
    grass: {
        weakTo: ['fire', 'ice', 'poison', 'flying', 'bug'],
        strongAgainst: ['water', 'ground', 'rock'],
        immuneTo: [],
        resistantTo: ['water', 'grass', 'electric', 'ground'],
        weakAgainst: ['fire', 'grass', 'poison', 'flying', 'bug', 'dragon', 'steel'],
        noEffectOn: []
    },
    electric: {
        weakTo: ['ground'],
        strongAgainst: ['water', 'flying'],
        immuneTo: [],
        resistantTo: ['electric', 'flying', 'steel'],
        weakAgainst: ['electric', 'grass', 'dragon'],
        noEffectOn: ['ground']
    },
    ice: {
        weakTo: ['fire', 'fighting', 'rock', 'steel'],
        strongAgainst: ['grass', 'ground', 'flying', 'dragon'],
        immuneTo: [],
        resistantTo: ['ice'],
        weakAgainst: ['fire', 'water', 'ice', 'steel'],
        noEffectOn: []
    },
    fighting: {
        weakTo: ['flying', 'psychic', 'fairy'],
        strongAgainst: ['normal', 'ice', 'rock', 'dark', 'steel'],
        immuneTo: [],
        resistantTo: ['bug', 'rock', 'dark'],
        weakAgainst: ['poison', 'flying', 'psychic', 'bug', 'fairy'],
        noEffectOn: ['ghost']
    },
    poison: {
        weakTo: ['ground', 'psychic'],
        strongAgainst: ['grass', 'fairy'],
        immuneTo: [],
        resistantTo: ['grass', 'fighting', 'poison', 'bug', 'fairy'],
        weakAgainst: ['poison', 'ground', 'rock', 'ghost'],
        noEffectOn: ['steel']
    },
    ground: {
        weakTo: ['water', 'grass', 'ice'],
        strongAgainst: ['fire', 'electric', 'poison', 'rock', 'steel'],
        immuneTo: ['electric'],
        resistantTo: ['poison', 'rock'],
        weakAgainst: ['grass', 'bug'],
        noEffectOn: ['flying']
    },
    flying: {
        weakTo: ['electric', 'ice', 'rock'],
        strongAgainst: ['grass', 'fighting', 'bug'],
        immuneTo: ['ground'],
        resistantTo: ['grass', 'fighting', 'bug'],
        weakAgainst: ['electric', 'rock', 'steel'],
        noEffectOn: []
    },
    psychic: {
        weakTo: ['bug', 'ghost', 'dark'],
        strongAgainst: ['fighting', 'poison'],
        immuneTo: [],
        resistantTo: ['fighting', 'psychic'],
        weakAgainst: ['psychic', 'steel'],
        noEffectOn: ['dark']
    },
    bug: {
        weakTo: ['fire', 'flying', 'rock'],
        strongAgainst: ['grass', 'psychic', 'dark'],
        immuneTo: [],
        resistantTo: ['grass', 'fighting', 'ground'],
        weakAgainst: ['fire', 'fighting', 'poison', 'flying', 'ghost', 'steel', 'fairy'],
        noEffectOn: []
    },
    rock: {
        weakTo: ['water', 'grass', 'fighting', 'ground', 'steel'],
        strongAgainst: ['fire', 'ice', 'flying', 'bug'],
        immuneTo: [],
        resistantTo: ['normal', 'fire', 'poison', 'flying'],
        weakAgainst: ['fighting', 'ground', 'steel'],
        noEffectOn: []
    },
    ghost: {
        weakTo: ['ghost', 'dark'],
        strongAgainst: ['psychic', 'ghost'],
        immuneTo: ['normal', 'fighting'],
        resistantTo: ['poison', 'bug'],
        weakAgainst: ['dark'],
        noEffectOn: ['normal']
    },
    dragon: {
        weakTo: ['ice', 'dragon', 'fairy'],
        strongAgainst: ['dragon'],
        immuneTo: [],
        resistantTo: ['fire', 'water', 'grass', 'electric'],
        weakAgainst: ['steel'],
        noEffectOn: ['fairy']
    },
    dark: {
        weakTo: ['fighting', 'bug', 'fairy'],
        strongAgainst: ['psychic', 'ghost'],
        immuneTo: ['psychic'],
        resistantTo: ['ghost', 'dark'],
        weakAgainst: ['fighting', 'dark', 'fairy'],
        noEffectOn: []
    },
    steel: {
        weakTo: ['fire', 'fighting', 'ground'],
        strongAgainst: ['ice', 'rock', 'fairy'],
        immuneTo: ['poison'],
        resistantTo: ['normal', 'grass', 'ice', 'flying', 'psychic', 'bug', 'rock', 'dragon', 'steel', 'fairy'],
        weakAgainst: ['fire', 'water', 'electric', 'steel'],
        noEffectOn: []
    },
    fairy: {
        weakTo: ['poison', 'steel'],
        strongAgainst: ['fighting', 'dragon', 'dark'],
        immuneTo: ['dragon'],
        resistantTo: ['fighting', 'bug', 'dark'],
        weakAgainst: ['fire', 'poison', 'steel'],
        noEffectOn: []
    }
};

document.getElementById('attackMode').addEventListener('click', () => {
    isAttackMode = true;
    updateModeDisplay();
    displayCombinedEffectiveness();
});
document.getElementById('defenseMode').addEventListener('click', () => {
    isAttackMode = false;
    updateModeDisplay();
    displayCombinedEffectiveness();
});

function updateModeDisplay() {
    document.getElementById('attackMode').classList.toggle('active', isAttackMode);
    document.getElementById('defenseMode').classList.toggle('active', !isAttackMode);
}

// Fonction pour mettre à jour l'affichage des types sélectionnés
function updateTypeChart(selectedType) {
    const typeIndex = selectedTypes.indexOf(selectedType);
    if (typeIndex > -1) {
        selectedTypes.splice(typeIndex, 1); // Retire le type s'il est déjà sélectionné
    } else {
        if (selectedTypes.length < 2) {
            selectedTypes.push(selectedType); // Ajoute le type si moins de deux sont sélectionnés
        } else {
            selectedTypes[0] = selectedTypes[1]; // Décale le premier type
            selectedTypes[1] = selectedType; // Ajoute le nouveau type
        }
    }
    updateTypeButtonsDisplay();
    displayCombinedEffectiveness();
}

// Met à jour l'affichage des boutons de type
function updateTypeButtonsDisplay() {
    document.querySelectorAll('.type-button').forEach(button => {
        const type = button.getAttribute('data-type');
        button.classList.toggle('active', selectedTypes.includes(type));
    });
}

// Affiche l'efficacité combinée des types sélectionnés
function displayCombinedEffectiveness() {
    if (selectedTypes.length === 0) {
        clearCombinedEffectivenessDisplay();
        return;
    }

    const combinedData = selectedTypes.length === 1
        ? calculateEffectiveness(selectedTypes[0])
        : calculateCombinedEffectiveness(selectedTypes);
    updateEffectivenessDisplay(combinedData);
}

function calculateCombinedEffectiveness(selectedTypes) {
    let weakTo = new Map();
    let strongAgainst = new Map();
    let immuneTo = new Set();
    let resistantTo = new Map();
    let weakAgainst = new Map();
    let noEffectOn = new Set();

    selectedTypes.forEach(type => {
        const data = typeEffectiveness[type];

        if (isAttackMode) {
            data.strongAgainst.forEach(s => strongAgainst.set(s, (strongAgainst.get(s) || 0) + 1));
            data.weakAgainst.forEach(w => weakAgainst.set(w, (weakAgainst.get(w) || 0) + 1));
            data.noEffectOn.forEach(n => noEffectOn.add(n));
        } else {
            data.weakTo.forEach(w => weakTo.set(w, (weakTo.get(w) || 0) + 1));
            data.resistantTo.forEach(r => resistantTo.set(r, (resistantTo.get(r) || 0) + 1));
            data.immuneTo.forEach(i => immuneTo.add(i));
        }
    });

    return {
        weakTo: Array.from(weakTo).map(([type, count]) => count === 2 ? `${type} x4` : type),
        strongAgainst: Array.from(strongAgainst).map(([type, count]) => count === 2 ? `${type} x4` : type),
        immuneTo: Array.from(immuneTo),
        resistantTo: Array.from(resistantTo).map(([type, count]) => count === 2 ? `${type} x4` : type),
        weakAgainst: Array.from(weakAgainst).map(([type, count]) => count === 2 ? `${type} x4` : type),
        noEffectOn: Array.from(noEffectOn)
    };
}

// Fonction pour calculer l'efficacité d'un seul type
function calculateEffectiveness(type) {
    const data = typeEffectiveness[type];
    if (isAttackMode) {
        return {
            weakTo: [],
            strongAgainst: data.strongAgainst,
            immuneTo: [],
            resistantTo: [],
            weakAgainst: data.weakAgainst,
            noEffectOn: data.noEffectOn
        };
    } else {
        return {
            weakTo: data.weakTo,
            strongAgainst: [],
            immuneTo: data.immuneTo,
            resistantTo: data.resistantTo,
            weakAgainst: [],
            noEffectOn: []
        };
    }
}

// Met à jour le DOM avec les données d'efficacité
function updateEffectivenessDisplay({ weakTo, strongAgainst, immuneTo, resistantTo, weakAgainst, noEffectOn }) {
    clearCombinedEffectivenessDisplay(); // Supprime les anciennes valeurs avant d'afficher les nouvelles

    if (isAttackMode) {
        document.getElementById('strongAgainst').style.display = strongAgainst.length ? 'flex' : 'none';
        document.getElementById('weakAgainst').style.display = weakAgainst.length ? 'flex' : 'none';
        document.getElementById('noEffectOn').style.display = noEffectOn.length ? 'flex' : 'none';

        document.getElementById('strongAgainst').innerHTML = strongAgainst.length ? `<strong>Efficace Contre:</strong> ` + createTypeElements(strongAgainst) : '';
        document.getElementById('weakAgainst').innerHTML = weakAgainst.length ? `<strong>Peu Efficace Contre:</strong> ` + createTypeElements(weakAgainst) : '';
        document.getElementById('noEffectOn').innerHTML = noEffectOn.length ? `<strong>Sans Effet Contre:</strong> ` + createTypeElements(noEffectOn) : '';

        // Cacher les sections inutiles pour l'attaque
        document.getElementById('weakTo').style.display = 'none';
        document.getElementById('resistantTo').style.display = 'none';
        document.getElementById('immuneTo').style.display = 'none';
    } else {
        document.getElementById('weakTo').style.display = weakTo.length ? 'flex' : 'none';
        document.getElementById('resistantTo').style.display = resistantTo.length ? 'flex' : 'none';
        document.getElementById('immuneTo').style.display = immuneTo.length ? 'flex' : 'none';

        document.getElementById('weakTo').innerHTML = weakTo.length ? `<strong>Faible Contre:</strong> ` + createTypeElements(weakTo) : '';
        document.getElementById('resistantTo').innerHTML = resistantTo.length ? `<strong>Résistant Contre:</strong> ` + createTypeElements(resistantTo) : '';
        document.getElementById('immuneTo').innerHTML = immuneTo.length ? `<strong>Immunisé Contre:</strong> ` + createTypeElements(immuneTo) : '';

        // Cacher les sections inutiles pour la défense
        document.getElementById('strongAgainst').style.display = 'none';
        document.getElementById('weakAgainst').style.display = 'none';
        document.getElementById('noEffectOn').style.display = 'none';
    }
}

// Crée des éléments HTML pour chaque type avec les icônes associées
function createTypeElements(types) {
    return types.map(type => {
        let [typeName, multiplier] = type.split(' ');
        multiplier = multiplier ? multiplier : '';

        // Ajout de la classe 'gradient-border' pour les types x4
        const multiplierClass = multiplier === 'x4' ? 'gradient-border' : '';

        // Chemin vers l'icône correspondant au type
        const iconPath = `images/icons/${typeName.toLowerCase()}.svg`;

        return `
            <span class="type-button ${typeName.toLowerCase()} ${multiplierClass}">
                <img src="${iconPath}" alt="${typeName}" style="width: 19px; height: 19px; vertical-align: middle; margin-right: 5px;">
                ${typeName.toUpperCase()}<span class='multiplier'> ${multiplier}</span>
            </span>`;
    }).join('');
}

// Efface l'affichage de l'efficacité combinée
function clearCombinedEffectivenessDisplay() {
    document.getElementById('weakTo').innerHTML = '';
    document.getElementById('strongAgainst').innerHTML = '';
    document.getElementById('immuneTo').innerHTML = '';
    document.getElementById('resistantTo').innerHTML = '';
    document.getElementById('weakAgainst').innerHTML = '';
    document.getElementById('noEffectOn').innerHTML = '';
}