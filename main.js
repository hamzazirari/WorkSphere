const modal = document.getElementById("modal-employer");
const openBtnModal = document.getElementById("open-modal");
const closeBtnModal = document.getElementById("close-modal");
const expContainer = document.getElementById("exp-container");
const addExpBtn = document.getElementById("add-exp");

const employees = [];

const zones = {
    reception: {
        roles: ["Réceptionniste", "Manager", "Nettoyage"],
        max: 2,
        employees: []
    },
    serveurs: {
        roles: ["Technicien IT", "Manager"],
        max: 2,
        employees: []
    },
    securite: {
        roles: ["Agent de sécurité", "Manager"],
        max: 3,
        employees: []
    },
    personnel: {
        roles: ["*"], // kolchi peut entrer
        max: 5,
        employees: []
    },
    conference: {
        roles: ["*"], //  kolchi peut entrer
        max: 10,
        employees: []
    },
    archives: {
        roles: ["Manager", "Réceptionniste", "Technicien IT", "Agent de sécurité"],
        max: 2,
        employees: []
    }
};





//OUVERTURE MODAL EMPLOYER................
openBtnModal.addEventListener("click", () => {
    modal.classList.remove("hidden");
});

//FERMETURE MODAL EMPLOYER ....................;

closeBtnModal.addEventListener("click", () => {
    modal.classList.add("hidden");
    formEmployer.reset();
});


//BOUTTON DAJOUT DE EXP....................

const addExp = document.getElementById("add-exp");

addExp.addEventListener("click", () => {

    const expDiv = document.createElement("div");
    expDiv.className = " exp-item mt-2 border p-3 rounded-lg flex flex-col gap-2 "

    const inputPost = document.createElement("input");
    inputPost.type = "text";
    inputPost.placeholder = "Poste";
    inputPost.className = "border p-2 rounded-lg";
    expDiv.appendChild(inputPost);

    const inputEntreprise = document.createElement("input");
    inputEntreprise.type = "text";
    inputEntreprise.placeholder = "Entreprise";
    inputEntreprise.className = "border p-2 rounded-lg";
    expDiv.appendChild(inputEntreprise);

    const inputPeriode = document.createElement("input");
    inputPeriode.type = "text";
    inputPeriode.placeholder = "Periode (2022-2023)";
    inputPeriode.className = "border p-2 rounded-lg";
    expDiv.appendChild(inputPeriode);

    const inputDescription = document.createElement("textarea");
    inputDescription.type = "text";
    inputDescription.placeholder = "Description";
    inputDescription.className = "border p-2 rounded-lg";
    expDiv.appendChild(inputDescription);

    const btnDeleteExp = document.createElement("button");
    btnDeleteExp.className = "text-red-500 self-end";
    expDiv.appendChild(btnDeleteExp);

    const iconTrash = document.createElement("i");
    iconTrash.className = "cursor-pointer fa-solid fa-trash";
    btnDeleteExp.appendChild(iconTrash);


    btnDeleteExp.addEventListener("click", () => {
        expDiv.remove();
    });
    expContainer.appendChild(expDiv);

});



//------------------------------------Ajouteer------------
const formEmployer = document.getElementById("form-employer");

formEmployer.addEventListener("submit", (e) => {
    e.preventDefault();

    //------------------------REGEX--------

    const nomComplet = document.getElementById("input-nom");
    const inputEmail = document.getElementById("input-email");
    const inputTele = document.getElementById("input-tele");

    let nomRegex = /^[a-zA-Z ]{2,30}$/;

    if (nomRegex.test(nomComplet.value) === false) {
        alert("Veuiller entrer seulement des caracteres et une espace");
        return;
    }
    //9bal arobass matkonch espace wspecial caractere  mora arobass matkonch espace w ar9am
    let emailRegex = /^[^\s\W]{4,}@[^\d\s]{1,5}\.[a-zA-Z]{1,4}$/;

    if (emailRegex.test(inputEmail.value) === false) {
        alert("Veuiller entrer seulement des caracteres et numero sans espace avant @");
        return;
    }
    //ibda b 06 WLA 05 WLA 07 moraha 8 ar9am
    let teleRegex = /^(06|05|07)\d{8}$/;

    if (teleRegex.test(inputTele.value) === false) {
        alert("Veuiller entrer seulement des numeros sans espaces");
        return;
    }

    const role = document.getElementById("role-empl");
    const photo = document.getElementById("input-photo").value;

    const newEmployer = {
        nom: nomComplet.value,
        role: role.value,
        photo: photo,
        email: inputEmail.value,
        telephone: inputTele.value,
        experiences: []
    };

    const expItems = document.querySelectorAll(".exp-item");

    expItems.forEach((item) => {
        const inputs = item.querySelectorAll("input,textarea");

        // Poste : lettres et espaces ikono 2 à 50 caractères
        let posteRegex = /^[a-zA-Z ]{2,50}$/;
        if (posteRegex.test(inputs[0].value) === false) {
            alert("Le poste doit contenir seulement des lettres et espaces (2 à 50 caractères)");
            return;
        }

        // Entreprise : lettres o chiffre o  espace  2 tel 50 caractères
        let entrepriseRegex = /^[a-zA-Z0-9 ]{2,50}$/;
        if (entrepriseRegex.test(inputs[1].value) === false) {
            alert("L'entreprise doit contenir seulement lettres, chiffres et espaces (2 à 50 caractères)");
            return;
        }

        // Période : chiffres et tirets (ex: 2022-2023)
        let periodeRegex = /^[0-9]{4}-[0-9]{4}$/;
        if (periodeRegex.test(inputs[2].value) === false) {
            alert("La période doit être au format AAAA-AAAA");
            return;
        }

        // Description : texte libre max 200 caractères
        let descRegex = /^.{1,200}$/;
        if (descRegex.test(inputs[3].value) === false) {
            alert("La description doit contenir maximum 200 caractères");
            return;
        }

        const expObjet = {
            poste: inputs[0].value,
            entreprise: inputs[1].value,
            periode: inputs[2].value,
            description: inputs[3].value
        };
        newEmployer.experiences.push(expObjet);
    });




    employees.push(newEmployer);
    console.log("employees", employees);
    afficherEmployer();

    modal.classList.add("hidden");
    formEmployer.reset();
    expContainer.innerHTML = "";

});

// --------------------------afiicheeer l carte 
function afficherEmployer() {

    const employerList = document.getElementById("employe-list");
    employerList.innerHTML = "";

    employees.forEach((emp) => {
        const card = document.createElement("div");

        card.className = "border-2 border-black p-2 rounded-lg flex  items-center gap-1 bg-gray-300";

        //ancree l les element li aykono f card li at afficha

        const img = document.createElement("img");
        img.src = emp.photo;
        img.className = "w-12 h-12 rounded-full";

        const nom = document.createElement("p");
        nom.className = "font-bold";
        nom.textContent = emp.nom;

        const role = document.createElement("p");
        role.className = "text-sm";
        role.textContent = emp.role;

        // an ajouti dkchi l carte 

        card.appendChild(img);
        card.appendChild(nom);
        card.appendChild(role);

        employerList.appendChild(card);


        //modal employe info
        card.addEventListener("click", () => {
            const modalInfo = document.getElementById("modal-info");
            modalInfo.classList.remove("hidden");


            const divInfo = document.getElementById("info-content");
            divInfo.innerHTML = "";

            const img = document.createElement("img");
            img.src = emp.photo;
            img.className = "w-15 h-15 rounded-full";

            const nom = document.createElement("p");
            nom.className = "font-bold";
            nom.textContent = emp.nom;

            const role = document.createElement("p");
            role.textContent = emp.role;

            const emailInfo = document.createElement("p");
            emailInfo.textContent = emp.email;

            const teleINFO = document.createElement("p");
            teleINFO.textContent = emp.telephone;

            const titreExp = document.createElement("h2");
            titreExp.textContent = "Expériences:"
            titreExp.className = "text-green-400 font-bold";

            divInfo.appendChild(img);
            divInfo.appendChild(nom);
            divInfo.appendChild(role);
            divInfo.appendChild(emailInfo);
            divInfo.appendChild(teleINFO);
            divInfo.appendChild(titreExp);

            const divExp = document.createElement("div");
            emp.experiences.forEach((exp) => {
                const entrepriseInfo = document.createElement("p");
                entrepriseInfo.textContent = exp.entreprise;

                const posteInfo = document.createElement("p");
                posteInfo.textContent = exp.poste;

                const periodeInfo = document.createElement("p");
                periodeInfo.textContent = exp.periode;

                const descInfo = document.createElement("p");
                descInfo.textContent = exp.description;

                const tireExp = document.createElement("p");
                tireExp.textContent = ("=====================");


                divExp.appendChild(posteInfo);
                divExp.appendChild(entrepriseInfo);
                divExp.appendChild(periodeInfo);
                divExp.appendChild(descInfo);
                divExp.appendChild(tireExp);

            });

            divInfo.appendChild(divExp);


        });

    });
    //close had modal info
    const closeInfo = document.getElementById("close-info");
    closeInfo.addEventListener("click", () => {
        const modalInfo = document.getElementById("modal-info");
        modalInfo.classList.add("hidden");
    });


};

//fonction des chambre

function peutEntrerZone(employee, zoneName) {
    const zone = zones[zoneName];

    //verifier wch zone 3amra
    if (zone.employees.lenght >= zone.max) {
        return false;
    }

    //verifier wch chambre est pour tout le monde

    if (zone.roles.includes("*")) {
        return true;
    }

    //verifier wch le role dial employer est autorise

    return zone.roles.includes(employee.role);
}

//les boutton des chambres 
const btnConference = document.getElementById("conference-button");
const btnReception = document.getElementById("reception-button");
const btnServeur = document.getElementById("serveurs-button");
const btnSecurite = document.getElementById("securite-button");
const btnPersonnele = document.getElementById("personnel-button");
const btnarchives = document.getElementById("archives-button");

btnConference.addEventListener("click",()=>{
    ouvrireModalChambre("conference");
});

btnReception.addEventListener("click",()=>{
    ouvrireModalChambre("reception");
});

btnSecurite.addEventListener("click",()=>{
    ouvrireModalChambre("securite");
});

btnServeur.addEventListener("click",()=>{
    ouvrireModalChambre("serveurs");
});

btnarchives.addEventListener("click",()=>{
    ouvrireModalChambre("archives");
});

btnPersonnele.addEventListener("click",()=>{
    ouvrireModalChambre("personnel");
});

//fonction ouvrir modal

function ouvrireModalChambre(zoneId){
    const modalChambre = document.getElementById("modal-chambre");
    modalChambre.classList.remove("hidden");

    currentZone = zoneId;

    afficherEmployerEligible(zoneId);
}

function afficherEmployerEligible(zoneId){
    
}