drawBoard();

function drawBoard(firstGame:boolean = true) {
    if (firstGame != true) {
        resetBoard();
    }

    let turn: number = 0;
    let pTurn: number = 0;
    let board = document.createElement('table');
    let bboard = document.createElement('tbody');
    board.appendChild(bboard);



    board.id = 'board';
    board.style.width = board.style.height = '800';
    document.body.appendChild(board);
    
    for (let i = 0; i < 3; i++) {
        let row = board.insertRow(i);
        row.id = ('r' + i);
        for (let j = 0; j < 3; j++) {
            let cell = row.insertCell(j);
            cell.id = i.toString() + j.toString();
        }
    }

    turnCycle();

    function turnCycle() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                let cell = document.getElementById(i.toString() + j.toString());
                if (cell.innerText == '') {
                    cell.onclick = function () { drawAble(this) }
                } else { cell.style.cursor = 'auto'; cell.onclick = null}
            }
        }

        function dispTurn(turn:number) {
            let dispDiv = document.getElementById('currTurn');
            if (turn==1) {
                dispDiv.innerText = 'O';
            } else { dispDiv.innerText = 'X' }
        }
        dispTurn(pTurn);
        turn++;
    }

    function drawAble(cell: HTMLElement) {
        cell.style.cursor = 'pointer';
        if (pTurn == 1) {
            drawO(cell);
        } else { drawX(cell) }

    }

    function drawO(cell: HTMLElement) {
        cell.innerHTML = 'O';
        pTurn = 0;
        checkWin('O');
        turnCycle();
    }

    function drawX(cell: HTMLElement) {
        cell.innerHTML = 'X';
        pTurn = 1;
        checkWin('X');
        turnCycle();
    }
    function checkWin(player: string) {

        var bA: string[] = [];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                bA.push(document.getElementById(i.toString() + j.toString()).innerText);
            }
        }
        if ((bA[0] == bA[1] && bA[1] == bA[2] && bA[0] != '') ||
            (bA[3] == bA[4] && bA[4] == bA[5] && bA[3] != '') ||
            (bA[6] == bA[7] && bA[7] == bA[8] && bA[6] != '') ||
            (bA[0] == bA[3] && bA[3] == bA[6] && bA[0] != '') ||
            (bA[1] == bA[4] && bA[4] == bA[7] && bA[1] != '') ||
            (bA[2] == bA[5] && bA[5] == bA[8] && bA[2] != '') ||
            (bA[0] == bA[4] && bA[4] == bA[8] && bA[0] != '') ||
            (bA[2] == bA[4] && bA[4] == bA[6] && bA[2] != '')) {
            if (player == 'X') {
                endGame(player);
            }
            else if (player == 'O') {
                endGame(player);
            } 
        }
        if (turn == 9) {
            endGame('tie');
        }
            
    }

    function endGame(player: string) {
        if (player == 'tie') {
            (confirm("It's a TIE! Rematch?") == true) ? drawBoard(false) : null;
        }
        else {
            if (confirm(player + ' Wins! Would you like a rematch?') == true) {
                drawBoard(false);
            }
        }
    }

    function resetBoard() {
        let board = document.getElementById('board');
        board.parentNode.removeChild(board);
    }

}


