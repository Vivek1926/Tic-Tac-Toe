let boxes = Array.from(document.getElementsByClassName('box'))
let restartBtn = document.getElementById("restartBtn")

const O="0"
const X="X"

let currentPlayer = X
let spaces=Array(9).fill(null)

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))
}

function boxClicked(e) {
    const box_id=e.target.id
    if(!spaces[box_id] && !isGameWon(currentPlayer)){
        spaces[box_id]=currentPlayer
        e.target.innerText=currentPlayer
        if (isGameWon(currentPlayer)){
            return
        }
        if (isGameDraw()){
            console.log("draw")
        }
        currentPlayer=currentPlayer==X?O:X
    }
}

function isGameWon(player) {
    const winning_combo=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    for (const winning_cond of winning_combo){
        let [a,b,c] = winning_cond
        if(spaces[a] && (spaces[a]==spaces[b] && spaces[a]==spaces[c])){
            return true
        }
    }
    
    return false
}

function isGameDraw() {
    for (const space of spaces){
        if(space==null){
            return false
        }
    }
    return true
}

restartBtn.addEventListener('click', restart)

function restart() {
    spaces.fill(null)

    boxes.forEach(box => {
        box.innerText=""
    })

    currentPlayer=X
}

startGame()