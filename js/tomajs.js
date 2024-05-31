//lOCAL.STORAGE values (HUNGER) (SLEEP) (FUN)
//Mood 
//Neutral, Happy, Sad, Angry, Dead
//Action
//Idle, Eating, Sleeping

//Starts with cutscene with you can X out of

//Main state (Options on the left and right for going to eat state, sleep state or fun state)

//Eating state (Eating food raises hunger stat, different options for food, might also decrease points based on how expensive the food is)

//Sleep state (Sleeping raises sleep stat, hunger stat decreases slower, sleeping stat raises faster during the night)

//Fun state (Raises fun stat, different activaties such as; watch tv, play games, steal data from the pentagon. Doing fun stuff raises score. Gaming greatly increases score, but also lowers hunger faster. Watching TV can be done along side eating a snack)

//Death state (If hunger or sleep is fully depleted a timer will appear counting down to 0, if it reaches 0 it will die.)

let state = "idle"
let alienSprite = document.querySelector("#alien")
alienSprite.src = "content/alienidle.gif"
// const startTime = Math.round(new Date().getTime() / 1000)
// let currentTime
// console.log(startTime)

//Hunger
const eatButton = document.querySelector("#eatButton")
let hunger = 100
let hungerLess = 1
let hungerMore = 5
let hungerStat = document.querySelector("#hungerCount")
let eating = false
let starving = false
let timerDrain = setInterval(drainHunger, 500)
let timerGain
let hungerBar = document.querySelector("#hungerBar")
hungerBar.style.width = 50

//Sleep
const sleepButton = document.querySelector("#sleepButton")
let sleep = 100
let sleepLess = 1
let sleepMore = 1
let sleepStat = document.querySelector("#sleepCount")
let sleeping = false
let tired = false
let timerTire = setInterval(drainSleep, 1000)
let timerSleep

//Fun
const funButton = document.querySelector("#funButton")
let fun = 100
let funLess = 1
let funMore = 1
let funStat = document.querySelector("#funCount")
// let playing = false
let bored = false
let timerBore = setInterval(drainFun, 1000)
let timerPlay

const eatSound = new Audio("content/eat.ogg") //from Minecraft
const burpSound = new Audio("content/burp.ogg") //from Minecraft

// setInterval(checkTime, 1000)
// setInterval(eatingFunction, 500)

//Hunger
function drainHunger(){
    if (state !== "eating" && hunger > 0){
    hunger = hunger - hungerLess
    hungerStat.textContent = hunger
    hungerBar.style.width = 50
    }
    if (hunger == 0){
        starving = true
    }
}

function gainHunger(){
    if (hunger < 100){
        alienSprite.src = "content/alieneat.gif"
        hunger = hunger + hungerMore
        eatSound.play()
        hungerStat.textContent = hunger
        clearInterval(timerDrain)
    }
    if (hunger >= 100){
        burpSound.play()
        eating = false
        alienSprite.src = "content/alienidle.gif"
        clearInterval(timerGain)
        timerDrain = setInterval(drainHunger, 500)
        // clearInterval(timerDrain)
    }
}

function feed(){
    if(hunger != 0 && eating == false){
        sleeping = false
        eating = true
        clearInterval(timerSleep)
        timerTire = setInterval(drainSleep, 500)
        if (hunger < 100){
            timerGain = setInterval(gainHunger, 500)
        } 
        if (hunger == 100){
            clearInterval(gainHunger)
            state = "idle"
        }
        // eating = true
    }
}

//Sleep
function drainSleep(){
    if (state !== "eating" && sleep > 0){
    sleep = sleep - sleepLess
    sleepStat.textContent = sleep
    // hungerBar.style.width = 50
    }
    if (sleep == 0){
        tired = true
    }
}

function gainSleep(){
    if (sleeping == true && sleep < 100){
        sleep = sleep + sleepMore
        // eatSound.play()
        sleepStat.textContent = sleep
        clearInterval(timerTire)
    }
    if (sleep >= 100){
        // burpSound.play()
        // state = "idle"
        alienSprite.src = "content/alienidle.gif"
        clearInterval(timerSleep)
        timerTire = setInterval(drainSleep, 500)
        // clearInterval(timerDrain)
    }
}

function snooze(){
    if(sleep != 0 && sleeping == false){
        eating = false
        sleeping = true
        clearInterval(timerGain)
        timerDrain = setInterval(drainHunger, 500)
        if (sleep < 100){
            timerGain = setInterval(gainSleep, 500)
        } 
        if (sleep == 100){
            clearInterval(gainSleep)
            state = "idle"
        }
        // eating = true
    }
}

//Fun
function drainFun(){
    if (state !== "playing" && fun > 0){
    fun = fun - funLess
    funStat.textContent = fun
    // hungerBar.style.width = 50
    }
    if (fun == 0){
        bored = true
    }
}

function gainFun(){
    if (state ==! "playing"){ss
        state = "playing"
        console.log(state)
        // alienSprite.src = "content/alieneat.gif"
    }
    if (state = "playing" && fun < 100){
        fun = fun + funMore
        funStat.textContent = fun
        clearInterval(timerBore)
    }
    if (fun >= 100){
        state = "idle"
        // alienSprite.src = "content/alienidle.gif"
        clearInterval(timerGain)
        timerBore = setInterval(drainFun, 500)
        // clearInterval(timerDrain)
    }
}

function play(){
    if(fun != 0){
        state = "playing"
        if (state == "playing" && fun < 100){
            timerGain = setInterval(gainFun, 500)
        } 
        if (hunger == 100){
            clearInterval(gainFun)
            state = "idle"
        }
        // eating = true
    }
}

function alive(){
    if (hunger == 0){ 
        state = "dead"
        alienSprite.src = "content/aliendeath.png"
        clearInterval(timerDrain)
        clearInterval(timerGain)
        clearInterval(timerSleep)
        clearInterval(timerTire)
        clearInterval(timerPlay)
        clearInterval(timerBore)
    }
}

setInterval(alive, 500)

sleepStat.textContent
funStat.textContent

eatButton.addEventListener("click", feed)
sleepButton.addEventListener("click", snooze)
// funButton.addEventListener("click", play)


// function checkTime(){
//     currentTime = Math.round(new Date().getTime() / 1000)
//     let elapsedTime = currentTime - startTime
//     console.log(elapsedTime)
// }
