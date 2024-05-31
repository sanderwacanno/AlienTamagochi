//Alien
let alienState = "idle"
let gameOver = false
let alienSprite = document.querySelector("#alien")
alienSprite.src = "content/alienidle.gif"

//Buttons
const eatButton = document.querySelector("#eatButton")
const sleepButton = document.querySelector("#sleepButton")
const funButton = document.querySelector("#funButton")
const startButton = document.querySelector("#startButton")
const retryButton1 = document.querySelector("#retryButton1")
const retryButton2 = document.querySelector("#retryButton2")
const retryButton3 = document.querySelector("#retryButton3")

//Stats
let hunger = 50
let sleep = 50
let fun = 50

let power = 0

//Stat increase and decrease values
let hungerIncrease = 5
let sleepIncrease = 1
let funIncrease = 3
let powerIncrease = (100 / 800)

let hungerDecrease = 1
let sleepDecrease = 1
let funDecrease = 1

//Stat counters
let hungerCounter = document.querySelector("#hungerCount")
let sleepCounter = document.querySelector("#sleepCount")
let funCounter = document.querySelector("#funCount")

//Timers
let timerHungry 
let timerTire 
let timerBore 

let timerGain 
let timerPower 
let timerLiving 

let timerTalk 
let timerClear 

//Bars
let hungerBar = document.querySelector("#hungerBar")
let sleepBar = document.querySelector("#sleepBar")
let funBar = document.querySelector("#funBar")
let powerBar = document.querySelector("#powerBar")

//Sound and music
const eatSound = new Audio("content/eat.ogg") //from Minecraft, used the Minecraft Wiki to download them
const burpSound = new Audio("content/burp.ogg") //from Minecraft, used the Minecraft Wiki to download them
const talkSound = new Audio("content/talk.wav")

const introMusic = new Audio("content/music/intromusic.mp3")
const sleepMusic = new Audio("content/music/sleepmusic.mp3")
const gameSounds = new Audio("content/music/gamesounds.mp3")
const gameOverMusic = new Audio("content/music/gameovermusic.mp3")
const winMusic = new Audio("content/music/winmusic.mp3")

//Textbox
let textBox = document.querySelector("#textBox")
let textRandom
let text = ""
let textSpeed = 50
let textP = 0
let i = 0

//Dialogue
let idleDialogue = ["Greetings Earthling", "Gneep gnorp", "What's bleebin'?", "Bababoey"]
let eatDialogue = ["Nom nom nom...", "Tasty...", "Mmmmm..."]
let sleepDialogue = ["Z z z", "Zzz-zeep zoop...", "Z"]
let funDialogue = ["This reminds me of shooting Zleebians with my Gleep Launcher.", "Beep boop beep boop", "So retro....", "Zap zap zap!"]

eatButton.addEventListener("click", feed)
sleepButton.addEventListener("click", snooze)
funButton.addEventListener("click", play)

startButton.addEventListener("click", startGame)
retryButton.addEventListener("click", reload)

const winpopup = document.getElementById("winpopup")
const openpopup = document.getElementById("openpopup")
const closeintropopup = document.getElementById("closeintropopup")
const deadpopup = document.getElementById("deadpopup")
const boredpopup = document.getElementById("boredpopup")
const insomniapopup = document.getElementById("insomniapopup")
const retrypopup = document.getElementsByClassName("retrypopup")

// Bron gebruikt voor het maken van pop-ups: https://www.youtube.com/watch?v=r_PL0K2fGkY&ab_channel=FlorinPop

    window.onload=function(){
        intropopup.classList.add("open")
        // introMusic.play()
    }

function textInitiate(){
    i = 0
    if (alienState == "idle"){
        textRandom = Math.random() * idleDialogue.length
        text = idleDialogue[Math.floor(textRandom)]
        // console.log(Math.floor(textRandom))
    }
    else if (alienState == "eating"){
        textRandom = Math.random() * eatDialogue.length
        text = eatDialogue[Math.floor(textRandom)]
        // console.log(Math.floor(textRandom))
    }
    else if (alienState == "sleeping"){
        textRandom = Math.random() * sleepDialogue.length
        text = sleepDialogue[Math.floor(textRandom)]
        // console.log(Math.floor(textRandom))
    }
    else if (alienState == "playing"){
        textRandom = Math.random() * funDialogue.length
        text = funDialogue[Math.floor(textRandom)]
        // console.log(Math.floor(textRandom))
    }
    textWrite(text)
}

function textClear(){
    textBox.textContent = ""
}

function textWrite(){
    if(i < text.length){
        textBox.innerHTML += text.charAt(i)
        talkSound.play()
        i = i + 1
        setTimeout(textWrite, textSpeed)
    }
}
// Bron die ik probeer te gebruiken hiervoor= https://www.w3schools.com/howto/howto_js_typewriter.asp 


function feed(){
    if (alienState !== "eating" && gameOver == false){
        i = text.length
        textBox.textContent = ""
        alienState = "eating"
        console.log(alienState)
    }
    else{
        if (gameOver == false){ 
            alienState = "idle"
            console.log(alienState)
        }
    }
}

function snooze(){
    if (alienState !== "sleeping" && gameOver == false){
        i = text.length
        textBox.textContent = ""
        alienState = "sleeping"
        console.log(alienState)
    }
    else{
        if (gameOver == false){ 
            alienState = "idle"
            console.log(alienState)
        }
    }
}

function play(){
    if (alienState !== "playing" && gameOver == false){
        i = text.length
        textBox.textContent = ""
        alienState = "playing"
        console.log(alienState)
    }
    else{
        if (gameOver == false){ 
            alienState = "idle"
            console.log(alienState)
        }
    }
}

function drainHunger(){
    if (hunger !=0){
        hunger = hunger - hungerDecrease
    }
    hungerCounter.textContent = hunger
    hungerBar.style.width = hunger + '%'
}

function drainSleep(){
    if (sleep != 0){
        sleep = sleep - sleepDecrease
    }
    sleepCounter.textContent = sleep
    sleepBar.style.width = sleep + '%'
}

function drainFun(){
    if (fun != 0){
        fun = fun - funDecrease
    }
    funCounter.textContent = fun
    funBar.style.width = fun + '%'
}

function gainStat(){
    if (alienState == "idle"){ 
        hungerDecrease = 1
        sleepDecrease = 1
        funDecrease = 1
        alienSprite.src = "content/alienidle.gif"
    }
    else if (alienState == "eating"){
        if (hunger != 100){
            hunger = Math.min(Math.max(hunger + hungerIncrease, 0), 100)
            eatSound.play()
        }
        sleepMusic.pause()
        gameSounds.pause()
        alienSprite.src = "content/alieneat.gif"
        // music.src = "content/music/eatmusic.mp3"
        hungerCounter.textContent = hunger
        hungerBar.style.width = hunger + '%'
        hungerDecrease = 0
        sleepDecrease = 1
        funDecrease = 1
        if (hunger == 100){
            burpSound.play()
            alienState = "idle"
        }
    }
    else if (alienState == "sleeping"){
        if (sleep != 100){
            sleep = Math.min(Math.max(sleep + sleepIncrease, 0), 100)
            sleepMusic.play()
        }
        alienSprite.src = "content/aliensleep.gif"
        gameSounds.pause()
        // music.src = "content/music/sleepmusic.mp3"
        sleepCounter.textContent = sleep
        sleepBar.style.width = sleep + '%'
        hungerDecrease = 1
        sleepDecrease = 0
        funDecrease = 1
        if (sleep == 100){
            hungerDecrease = 4
            sleepDecrease = 0
            funDecrease = 1
            // alienState = "idle"
            // music.pause()
        }
    }
    else if (alienState == "playing"){
        if (fun != 100){
            fun = Math.min(Math.max(fun + funIncrease, 0), 100)
            gameSounds.play()
        }
        alienSprite.src = "content/alienplay.gif"
        sleepMusic.pause()
        // music.src = "content/music/playmusic.mp3"
        funCounter.textContent = fun
        funBar.style.width = fun + '%'
        hungerDecrease = 1
        sleepDecrease = 1
        funDecrease = 0
        if (fun == 100){
            // alienState = "idle"
            hungerDecrease = 4
            sleepDecrease = 1
            funDecrease = 0
        }
    }
}

function gainPower(){
    power = Math.min(Math.max(power + powerIncrease, 0), 100)
    powerBar.style.width = power + '%'
}

function livingStatus(){
    if(power >= 100){
        winpopup.classList.add("open")
        winMusic.play()
        clearTimer()
    }
    else if(hunger <= 0 ){
        alienState = "dead"
        gameOver = true
        alienSprite.src = "content/aliendeath.png"
        deadpopup.classList.add("open")
        gameOverMusic.play()
        clearTimer()
    }
    else if (sleep <= 0){
        alienState = "insomnia"
        gameOver = true
        alienSprite.src = "content/aliendeath.png"
        insomniapopup.classList.add("open")
        gameOverMusic.play()
        clearTimer()
    }
    else if (fun <= 0){
        alienState = "bored"
        gameOver = true
        alienSprite.src = "content/aliendeath.png"
        boredpopup.classList.add("open")
        gameOverMusic.play()
        clearTimer()
    }
}

function clearTimer(){
    clearInterval(timerHungry)
    clearInterval(timerBore)
    clearInterval(timerTire)
    clearInterval(gainStat)
    clearInterval(gainPower)
    clearInterval(timerLiving)
    clearInterval(timerTalk)
    textClear()
    talkSound.pause()
    sleepMusic.pause()
    gameSounds.pause()
}

function reload(){
    location.reload()
}

// retrypopup.addEventListener("click", reload)

function startGame(){
    introMusic.pause()
    intropopup.classList.remove("open")
    timerHungry = setInterval(drainHunger, 1000)
    timerTire = setInterval(drainSleep, 1000)
    timerBore = setInterval(drainFun, 1000)

    timerGain = setInterval(gainStat, 500)
    timerPower = setInterval(gainPower, 500)
    timerLiving = setInterval(livingStatus, 500)

    timerTalk = setInterval(textInitiate, 5000)
    timerClear = setInterval(textClear, 4900)
}

retryButton1.addEventListener("click", reload)
retryButton2.addEventListener("click", reload)
retryButton3.addEventListener("click", reload)

sleepMusic.addEventListener("ended", function(){
    this.currentTime = 0;
    this.play();
})

gameSounds.addEventListener("ended", function(){
    this.currentTime = 0;
    this.play();
})

// Bronnen:
// Gamesounds: Super Mario Land https://www.youtube.com/watch?v=_ZvlayzJHdY&ab_channel=xRavenXP.
// Sleep Music: Super Mario 64.
// Death music: Earthbound.
// Win music: Nunca Me Faltes.
// Eat sounds: Minecraft.
// Talk sound: Animal Crossing New Horizons.
// Pictures assets: Mr Bean, Mother 1 Encyclopedia, Voices of the Void, Earthbound.
// Background texture: https://opengameart.org/content/arcade-carpet-textures