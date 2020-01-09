function gameLoop() {
    //
}

function uppdateraPoang(nytt) {
    //TODO: kolla smidigare sätt att hämta poäng som int istället för sträng
    document.querySelector(".score").textContent = parseInt(document.querySelector(".score").textContent) + nytt
}

function slumpNummer(max = 10) {
    //max - maxtaket som spelaren väljer, ex 5 ger siffror mellan 0-5
    return Math.floor(Math.random() * max)
}

function fizzBuzzKoll(nummer) {
    // fss
    let svar = ""
    if (nummer % 3 === 0) {
        svar += "fizz"
    }
    if (nummer % 5 === 0) {
        svar += "buzz"
    }

    return svar !== "" ? svar : "nothing"
}

function kontroll(e) {
    e.target.textContent.toLowerCase() == fizzBuzzKoll(parseInt(document.querySelector(".number").textContent)) ? rattSvar() : felSvar()
}

function rattSvar() {
    uppdateraPoang(1)
    alert("rätt") //FIXME: Ta bort alerter! TILLFÄLLIG LÖSNING
}

function felSvar() {
    uppdateraPoang(-1)
    alert("fel") //FIXME: Ta bort alerter! TILLFÄLLIG LÖSNING
}

document.querySelectorAll(".button").forEach((button) => {
    button.addEventListener("click", kontroll)
})

document.querySelector(".slumpNummer").addEventListener("click", () => {
    document.querySelector(".number").textContent = slumpNummer()
})