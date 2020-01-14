// window.onload = andraNummer()
gameLoop()

function uppdateraPoang(nytt) {
    //TODO: kolla smidigare sätt att hämta poäng som int istället för sträng
    document.querySelector(".score").textContent = parseInt(document.querySelector(".score").textContent) + nytt
}

function slumpNummer(max = 100) {
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
    const result = e.target.textContent.toLowerCase() == fizzBuzzKoll(parseInt(document.querySelector(".number").textContent)) ? true : false

    feedbackSvar(result)
}

function feedbackSvar(svar) {
    // Tidtagning
    let time = Date.now() - document.querySelector(".progressIn").dataset.start
    document.querySelector(".countDown").textContent = "Det tog dig " + time / 1000 + " sec" //FIXME: Gör riktig lösning

    //visa ikoner
    let showIcon = ".fa-thumbs-down"
    let poang = -1
    if (svar) {
        poang = 1
        showIcon = ".fa-thumbs-up"
    }

    uppdateraPoang(poang)
    const feedback = document.querySelector(showIcon)
    feedback.classList.add("answer")
    document.querySelector(".answer").addEventListener("transitionend", function update() {
        feedback.classList.remove("answer")
    }, "once")
    gameLoop()
}

function andraNummer() {
    document.querySelector(".progressIn").dataset.start = Date.now()
    document.querySelector(".number").textContent = slumpNummer(document.querySelector(".randomLimit").value)
}

function gameLoop() {
    andraNummer()
    document.querySelectorAll(".button").forEach((button) => {
        button.addEventListener("click", (e) => {
            if (!document.querySelector(".answer")) {
                kontroll(e)
            }
        })
    })
}