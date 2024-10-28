let gameseq = [];
let userseq = [];

let started = false;
let level = 0;
let maxlevel = 0;

let colors = ["red", "yellow", "green", "purple"];

let h3 = document.createElement('h3');
h3.innerText = `Your score is: ${level}`;
document.body.appendChild(h3);

// Max score feature
let maxlvl = document.createElement("h3");
maxlvl.innerText = `You max score is : ${maxlevel}`;
document.body.appendChild(maxlvl);

document.addEventListener("keydown", function () {
    if (!started) {
        console.log("game started");
        started = true;
        h3.innerText = `Your score is: ${level}`
        levelUp();
    }
});

let h2 = document.querySelector("h2");

function btnflash(btn){
    btn.classList.add("flash");
    setTimeout(()=>{
        btn.classList.remove("flash");
    },500);
}

function userflash(btn){
    btn.classList.add("userflash");
    setTimeout(()=>{
        btn.classList.remove("userflash");
    },500);
}

function levelUp(btn){
    userseq = [];
    level++;
    maxlevel = Math.max(level,maxlevel);
    // if(level==5){
    //     h2.innerText = "Congrats you completed the game!"
    //     return;
    // }
    h2.innerText = `Level ${level}`;
    let randidx = Math.floor(Math.random()*3);
    let randcolor = colors[randidx];
    let randbtn = document.querySelector(`.${randcolor}`);
    gameseq.push(randcolor)
    btnflash(randbtn);
}

function resetgame(){
    started = false;
    
    gameseq = [];
    userseq = [];
    
    
    h3.innerText = `Your score is: ${level}`;
    maxlvl.innerText = `Your max score is : ${maxlevel}`;
    document.body.style.backgroundColor = 'Red';
    setTimeout(() => {
        document.body.style.backgroundColor = "white";
    }, 200);
    // Append the h3 to the existing body of the document
    level = 0;
}
function checkans(userseq, gameseq){
    let idx = userseq.length-1;
    
    if(userseq[idx]!=gameseq[idx]){
        h2.innerText = "Game over boss, press any key to start again";
        resetgame();
        return;
    }
    else{
        if(gameseq.length==userseq.length){
            for(let i=0;i<=idx;i++){
                if(gameseq[i]!=userseq[i]){
                    h2.innerText = "Game over boss, press any key to start again";
                    resetgame();
                    return;
                }
            }
            setTimeout(levelUp,1000);
        }
    }
}
function btnpress(){
    console.log('button was pressed')
    let btn = this;
    userflash(btn);

    console.log(btn.id)
    userseq.push(btn.id)
    checkans(userseq,gameseq)
}

let btns = document.querySelectorAll(".btn");
for(btn of btns){
    btn.addEventListener("click", btnpress);
}
