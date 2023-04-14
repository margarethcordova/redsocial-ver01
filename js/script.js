const btnSignUp = document.querySelector("#btnSignUp");
const btnSignIn = document.querySelector("#btnSignIn");
const container = document.querySelector(".container");
const signInBtn2 = document.querySelector("#signIn-btn2");
const signUpBtn2 = document.querySelector("#signUp-btn2");

btnSignUp.addEventListener("click", () => {
    container.classList.add("signUpModal");
});

btnSignIn.addEventListener("click", () => {
    container.classList.remove("signUpModal");
});

// RESPONSIVE - LOGIN V.CELL

signUpBtn2.addEventListener("click", () => {
    container.classList.add("signUpModal2");
});

signInBtn2.addEventListener("click", () => {
    container.classList.remove("signUpModal2");
});

// const reportModal = document.querySelector('#modal-help');
// const openModalHelp = document.querySelector('#openReportModal');

//open ModalPopUpReport
// const openModalTema = () => {
//     reportModal.style.display = 'grid';
// };

// //close ModalPopUpReport
// const closeModalTema = (e) => {
//     if (e.target.classList.contains('modal-help')) {
//         reportModal.style.display = 'none';
//     }
// };


// reportModal.addEventListener('click', closeModalTema);

// openModalHelp.addEventListener('click', openModalTema);