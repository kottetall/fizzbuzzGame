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
    let shortestTimeElement = document.querySelector(".shortestTime")
    let time = countSeconds()
    let oldTime = parseFloat(shortestTimeElement.textContent)
    if (!oldTime) {
        oldTime = time
    }

    //TODO: Snygga till
    time = time > 9 ? Math.round(time) : time
    shortestTimeElement.textContent = time < oldTime ? time : oldTime

    //visa ikoner
    let showIcon = ".fa-thumbs-down"
    let poang = -1
    if (svar) {
        poang = Math.round(1 + (10 - time))
        if (document.querySelector(".randomButtons").checked) {
            //FIXME: Gör om lösningen, som det är nu kan man trycka på rand-knappen och sedan svaret för att få bonusen!
            poang += 10
        }
        showIcon = ".fa-thumbs-up"
    }

    uppdateraPoang(poang)
    const feedback = document.querySelector(showIcon)
    feedback.classList.add("answer")
    document.querySelector(".answer").addEventListener("transitionend", () => {
        feedback.classList.remove("answer")
    }, "once")
    gameLoop()
}

function andraNummer() {
    document.querySelector(".progressIn").dataset.start = Date.now()
    document.querySelector(".number").textContent = slumpNummer(document.querySelector(".randomLimit").value)
}

function randomizeButtons(boolean) {
    const buttonNames = ["fizz", "buzz", "fizzbuzz", "nothing"]
    const buttons = document.querySelectorAll(".button")

    for (const button of buttons) {
        let index = boolean ? slumpNummer(buttonNames.length) : 0
        button.textContent = buttonNames[index]
        buttonNames.splice(index, 1)
        index++
    }


}

function gameLoop() {
    randomizeButtons(document.querySelector(".randomButtons").checked)

    andraNummer()
    document.querySelectorAll(".button").forEach((button) => {
        button.addEventListener("click", (e) => {
            if (!document.querySelector(".answer")) {
                kontroll(e)
            }
        })
    })
}

function countSeconds() {
    return (Date.now() - document.querySelector(".progressIn").dataset.start) / 1000
}

setInterval(() => {
    const time = Math.floor(countSeconds())
    document.querySelector(".countDown").textContent = `You've been staring for ${time} seconds`
}, 1000)