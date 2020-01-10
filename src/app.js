window.onload = andraNummer()

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
    e.target.textContent.toLowerCase() == fizzBuzzKoll(parseInt(document.querySelector(".number").textContent)) ? rattSvar() : felSvar()
}

function rattSvar() {
    uppdateraPoang(1)
    // andraNummer()
    alert("rätt") //FIXME: Ta bort alerter! TILLFÄLLIG LÖSNING
    // raknaNed()
    gameLoop()
}

function felSvar() {
    // uppdateraPoang(-1)
    alert("fel") //FIXME: Ta bort alerter! TILLFÄLLIG LÖSNING
    gameLoop()
}

function andraNummer() {
    document.querySelector(".number").textContent = slumpNummer(document.querySelector(".randomLimit").value)
}

document.querySelectorAll(".button").forEach((button) => {
    button.addEventListener("click", kontroll)
})



function raknaNed() {
    //TODO: gör mer flytande - ex intervall för 100ms och var 10de cykel ändras sekundvisaren
    //FIXME: räknaren ökar när man trycker på en gissning - pga att man aldrig tar bort den ursprungliga intervallen. Ev lösa genom att knapptryck lägger till data-pressed=true och lägger det som ett vilkor som hämtas varje gång.
    counter = startCount = document.querySelector(".timeLimit").value
    document.querySelector(".countDown").textContent = counter + "sec"
    document.querySelector(".progressIn").style.width = "100%"
    counting = setInterval(() => {
        if (counter === 0) {
            clearInterval(counting)
            felSvar()
        } else {
            counter--
            document.querySelector(".countDown").textContent = counter + "sec"
            document.querySelector(".progressIn").style.width = Math.round((counter / startCount) * 100) + "%"

            document.querySelectorAll(".button").forEach((button) => {
                button.addEventListener("click", kontroll)
            })
        }
    }, 1000)
}

function gameLoop() {
    andraNummer()
    raknaNed()
}