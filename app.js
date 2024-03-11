let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector(".reset-btn");
let turnO=true;
let count=0;
let msgContainer=document.querySelector(".msg-container");
let newBtn=document.querySelector("#new-btn");
let msg=document.querySelector("#msg");

//2d array of winning pattrens
let winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

const enableBoxes=() =>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}

const resetGame=() =>{
    turnO=true;
    count=0;
    enableBoxes();
    msgContainer.classList.add("hide");
};

//hr ek box pr loop chlaya taaki eventListener ko hr ek box ke liye apply kiya jaye
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box was clicked");
        if(turnO){
            box.innerText="O";
            box.style.color="green";
            turnO=false;
        }
        else{
            box.innerText="X";
            turnO=true;
        }
        box.disabled=true;
        count++;

        let isWinner=checkWinner();
        if(count===9 && checkWinner!==true){
            gameDraw();
        }
    });
});

const gameDraw=() =>{
    msg.innerText=`Game Is Draw.`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const disableBoxes=() =>{
    for(let box of boxes){
        box.disabled=true;
    }
};

const showWinner=(winner) =>{
    msg.innerText=`Congratulations, Winner is ${winner}.`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner=() =>{
    //ye hr ek win-pattern ko trace krne ke liye loop
    for(let pattern of winPatterns){
        let pos1Val=boxes[pattern[0]].innerText;
        let pos2Val=boxes[pattern[1]].innerText;
        let pos3Val=boxes[pattern[2]].innerText;

        if(pos1Val!="" && pos2Val!="" && pos3Val!=""){
            if(pos1Val===pos2Val && pos2Val===pos3Val){
                console.log("WINNER is",pos1Val);
                showWinner(pos1Val);
            }
        }
    }
};
newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
