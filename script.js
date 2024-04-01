document.addEventListener("DOMContentLoaded", function() {
    
    const generateButton = document.getElementById("generate");

    const board = document.getElementById("board");

    generateButton.addEventListener("click", generatePuzzle);

    function generatePuzzle() {

        const rowSize = getRowSize();
        const tiles = generateTiles(rowSize);

        displayBoard(board, tiles, rowSize);
    }

    function getRowSize() {
        const selectedRadio = document.querySelector('input[name="selectedRow"]:checked');
        return parseInt(selectedRadio.value);
    }

    function generateTiles(rowSize) {
        const tiles = [];

        for (let i = 0; i < rowSize * rowSize - 1; i++) {
            tiles.push(i + 1);
        }

        tiles.push(""); 
        shuffle(tiles);
        return tiles;
    }

    function displayBoard(board, tiles, rowSize) {
        board.innerHTML = "";
    
        for (let index = 0; index < tiles.length; index++) {
            const tileElement = document.createElement("div");
            tileElement.classList.add("tile");

            if (tiles[index] === "") {
                tileElement.textContent = "";
            } else {
                tileElement.textContent = tiles[index].toString();
            }

            tileElement.addEventListener("click", () => moveTile(index, tiles, rowSize));
            board.appendChild(tileElement);
        }
    
        board.style.gridTemplateColumns = `repeat(${rowSize}, 1fr)`;
    }

    function moveTile(index, tiles, rowSize) {
        const emptyIndex = tiles.indexOf("");
        if (isAdjacent(index, emptyIndex, rowSize)) {
            tiles[emptyIndex] = tiles[index];
            tiles[index] = "";
            displayBoard(board, tiles, rowSize);

            checkSolved(tiles, rowSize);
        }
    }

    function isAdjacent(index1, index2, rowSize) {
        let a=index1 / rowSize;
        let b=index1 % rowSize;
        let a1=index2 / rowSize;
        let b1= index2 % rowSize;

        const [row1, col1] = [Math.floor(a),b];
        const [row2, col2] = [Math.floor(a1),b1];
        return Math.abs(row1 - row2) + Math.abs(col1 - col2) === 1;
    }

    function checkSolved(tiles, rowSize) {
        const sortedTiles = [];
        for (let i = 1; i < rowSize * rowSize; i++) {
            sortedTiles.push(i);
        }

        sortedTiles.push(""); 

       // console.log(sortedTiles);
        if (tiles.join() === sortedTiles.join()) {
            alert("Congratulations! You have solved the Puzzle!");
        }
    }
    

   function shuffle(array) {

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

});