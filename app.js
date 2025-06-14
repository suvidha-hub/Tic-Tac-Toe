let boxes =document.querySelectorAll(".box");
let reset =document.querySelector(".reset");
let msgcontainer =document.querySelector(".msgcontainer");
let msg =document.querySelector(".msg");
let newgame=document.querySelector(".new");
// let moveSound = document.getElementById("move-sound");
const moveSound = new Audio("sounds/click.wav");
const winSound = new Audio("sounds/win.wav");
const drawSound = new Audio("sounds/draw.wav");


let turnX= true;
let count=0;

const winPatterns=[ 
[0,1,2],
[0,3,6],
[0,4,8],
[1,4,7],
[2,5,8],
[2,4,6],
[3,4,5],
[6,7,8]
];

function resetGame(){
    turnX= true;
    count=0;
    enableBox();
    msgcontainer.classList.add("hide");
};

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
            if (box.innerText !== "") return;

  moveSound.currentTime = 0;
  moveSound.play();


        if(turnX){
            box.innerHTML="X";
            turnX=false;
            // box.style.color="red";
        }else{
            box.innerText="O";
            turnX=true;
        }
        box.disabled=true;
           count++;
         let isWinner=checkWinner();
        
         if(count==9 && !isWinner){
             drawSound.currentTime = 0;
               drawSound.play();
            msg.innerText="Draw!";
             msgcontainer.classList.remove("hide");
             disableBox();
         }
    });
});

function disableBox(){
    for(let box of boxes){
        box.disabled=true;
    }
};

function enableBox(){
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
};

function  showWinner(winner){
       winSound.currentTime = 0;
       winSound.play();
    msg.innerText=` ${winner} wins!`;
    msgcontainer.classList.remove("hide");
     
    disableBox();
    
}

const checkWinner = ()=>{
    for( let pattern of winPatterns){
         let pos1Val=boxes[pattern[0]].innerText;
         let pos2Val=boxes[pattern[1]].innerText;
         let pos3Val=boxes[pattern[2]].innerText;

        if(pos1Val !="" && pos2Val!="" && pos3Val !=""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                console.log("winner",pos1Val);
                showWinner(pos1Val);
            }
        }  

    }
};

reset.addEventListener("click",resetGame);
// newgame.addEventListener("click",resetGame);