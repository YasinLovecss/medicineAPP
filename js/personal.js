var userPart = document.getElementById("userpart");
var userUl = document.getElementById("userul");
var doctorUl = document.getElementById("doctorul");
window.onload = fIsDoctor();

function fIsDoctor() {
	if(localStorage.myType === "doctor") {
		fShowDoctorPart();
	} else {
		fShowUserPart();
	}
}

function fShowUserPart() {
	userPart.style.backgroundColor = "#f25949";
	userUl.style.display = "none";
	doctorUl.style.display = "block";
}

function fShowDoctorPart() {
	userPart.style.backgroundColor = "#1abc9c";
	userUl.style.display = "block";
	doctorUl.style.display = "none";
}
