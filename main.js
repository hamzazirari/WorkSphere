const modal = document.getElementById("modal-employer");
const openBtnModal = document.getElementById("open-modal");
const closeBtnModal = document.getElementById("close-modal");
const expContainer = document.getElementById("exp-container");
const addExpBtn = document.getElementById("add-exp");

const employees = [];


//OUVERTURE MODAL EMPLOYER................
openBtnModal.addEventListener("click", () => {
    modal.classList.remove("hidden");
});

//FERMETURE MODAL EMPLOYER ....................;

closeBtnModal.addEventListener("click", () => {
    modal.classList.add("hidden");
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
    inputPeriode.placeholder = "Entreprise";
    inputPeriode.className = "border p-2 rounded-lg";
    expDiv.appendChild(inputPeriode);

    const inputDescription = document.createElement("textarea");
    inputDescription.type = "text";
    inputDescription.placeholder = "Entreprise";
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

    let emailRegex = /^[^\s\W]{4,}@[^\d\s]{1,5}\.[a-zA-Z]{1,4}$/;

    if (emailRegex.test(inputEmail.value) === false) {
        alert("Veuiller entrer seulement des caracteres et numero sans espace avant @");
        return;
    }

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

});

function afficherEmployer(){

    const div = document.getElementById("employe-list");
    div.innerHTML ="";

    employees.forEach((emp)=>{
        const card = document.createElement("div");


    });

};
