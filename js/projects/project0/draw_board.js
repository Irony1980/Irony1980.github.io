export function drawBoard(){
    const sudokuBoard = document.getElementById('puzzle');
    const squareNum = 81;

    for(let i = 0; i < squareNum; i++){
        const inputElement = document.createElement('input');

        inputElement.setAttribute('type', 'number');
        inputElement.setAttribute('min', '1');
        inputElement.setAttribute('max', '9');

        sudokuBoard.appendChild(inputElement);
    }
}