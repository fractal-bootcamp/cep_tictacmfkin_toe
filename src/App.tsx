import { useState } from 'react'
import './App.css'
import { io } from "socket.io-client";
import { useEffect } from 'react'

/*      
1: apply either 'X' or 'O' to the area of the grid that the currentPlayer selected 
2: switch players
3: check for winner
4: check for draw
5: if win/draw -> define winner
6: reset board 
*/

export type Board = [0, 1, 2, 3, 4, 5, 6, 7, 8]//fix later

const socket = io("http://localhost:3000")

socket.on("connect", () => {
    console.log("we are logging: ", socket.id)
})



const checkColumn = (board: Board, columnIndex) => { // ******QUESTION****** why do i have to specify what this is every time nonono ____ ALSO: ******* where do i specify what columnIndex is?!?! ******
    // column ONE is [0, 3, 6]
    if (board[columnIndex] !== null && // if the board at 0 has a variable 
        board[columnIndex] === board[columnIndex + 3] && // and = the board at [3] 
        board[columnIndex] === board[columnIndex + 6]) { // andand = the board at [6]
        return board[columnIndex]
    } // return the variable 
    return null; // if not then nothing 
}

/* 
1 - check if the positions at [0] is null 
2 - check and see if 0 is the same as 4- is the same as 8 
3- if all the same we should return the same variable and define a winner 
4- if not a winner - return nothing */
const checkDiagonals = (board) => {
    if (board[0] !== null &&
        board[0] === board[4] &&
        board[0] === board[8]) {
        return board[0];
    }
    if (board[2] !== null &&
        board[2] === board[4] &&
        board[2] === board[6]) {
        return board[2];
    }
    return null;
}

/*
GAME LOGIC SEQUENCING
1 - player moves
2 - check row - column - diagonal - for three matching indexes 
3 - return true if match is found 
4 - if not, do nothing 
5 - check if board is full
6 - if board is full - return a tie
7 - if none are true - return to next players move 
*/

// const checkAll = () => {
// if (checkRow && checkColumn && checkDiagonals ? )
// }
function checkForWinner(board) {
    //check rows 
    for (let c = 0; c < 3; c++) {
        // let result = 
    }

}
/* .every() --> 
a function to exceute for each element in an array --> will return truthy IF all elements pass test --> falsy otherwise
- called with: 
ELEMENT (current piece) ; INDEX (index of current piece being processed); ARRAY (array every() was called upon)
*/
const isBoardFull = (board) => {
    if (board.every(cell => cell !== '')) {
        return
        console.log("its a tie")
    }

}

/*
currentBoard => {
    //create instance of current board 
    const newBoard = [...currentBoard]; // e.g. copy of -> [null, null, null, null, null, null, null, null, null]
    //update clicked square from currentPlayer
    newBoard[index] = currentPlayer; // what piece in the arrary is being selected -> that is the current player 
    //return this new board to update the state 
    //return newBoard;
    */

// ******QUESTION****** i know index should be a string here whatamidoingwronggg?!?

function App() { // change to app. Import/export
    //console.log("RENDERING COMPONENT")
    const [board, setBoard] = useState(['', '', '', '', '', '', '', '', '']);
    //console.log("BOARD", board)
    const [currentPlayer, setCurrentPlayer] = useState("X");
    const [messages, setMessages] = useState<string[]>([]);
    const [inputMessage, setInputMessage] = useState('');


    const handleMove = (index: number) => {
        const updatedBoard = [...board]
        updatedBoard[index] = currentPlayer
        setBoard(
            updatedBoard
        );
        currentPlayer === "X" ? setCurrentPlayer("O") : setCurrentPlayer("X")

        socket.emit('chat-message', 'nice job')
    }

    //Define what a row should consist of
    const row0 = [board[0], board[1], board[2]]
    const row1 = [board[3], board[4], board[5]]
    const row2 = [board[6], board[7], board[8]]

    //Define what a column should consist of
    const col0 = [board[0], board[3], board[6]]
    const col1 = [board[1], board[4], board[7]]
    const col2 = [board[2], board[5], board[8]]

    //Define what a diag should consist of
    const diag0 = [board[0], board[4], board[8]]
    const diag1 = [board[2], board[4], board[6]]

    //Function to check if a row is won. It should take in ?? and return ??
    const rowWinners = (apples) => {
        if (apples[0] !== '' && apples[1] !== '' && apples[2] !== '') {
            return (apples[0] === apples[1] && apples[1] === apples[2] ? true : false)
        }

    }

    //Function to check if a column is won. It should take in ?? and return ??
    const colWinners = (bananas) => {
        if (bananas[0] !== '' && bananas[1] !== '' && bananas[2]) {
            return (bananas[0] === bananas[1] && bananas[1] === bananas[2] ? true : false)
        }
    }

    //Function to check if a diag is won. It should take in ?? and return ??
    const diagWinners = (grapes) => {
        if (grapes[0] !== '' && grapes[1] !== '' && grapes[2] !== '') {
            return (grapes[0] === grapes[1] && grapes[1] === grapes[2] ? true : false)
        }
    }

    //Function to check if row, column, or diag is won. It should take in ??, do ??, and return ??
    const winnerAll = () => {
        return (
            rowWinners(row0) || rowWinners(row1) || rowWinners(row2) ||
            colWinners(col0) || colWinners(col1) || colWinners(col2) ||
            diagWinners(diag0) || diagWinners(diag1)
        )
    }

    // // get starting index for each row by * 3 
    // const startIndex = rowIndex * 3;
    // //check and see if first element is not null and is equal to the second element
    // if (board[startIndex] && //check if the first element in the first row is not empty 
    //     board[startIndex] === board[startIndex + 1] &&  // check if the first element in the first row === the second element in the first row 
    //     board[startIndex] === board[startIndex + 2]) { // check if the first element in the first row === the third element in the first row 
    //     // if we have three non-empty matching elements in a row then this is winner 
    //     return board[startIndex] //return board[startIndex] to return the first character of that row which will point to the winner 
    // }


    return (
        <>

            <div className='bg-gray-600'>
                <h1 >TIC-TAC-TOE</h1>
                <div className='container mx-auto grid grid-cols-3 grid-rows-3 gap-2 w-64 h-64'>
                    {board.map((cell, index) => {
                        return (
                            <div
                                key={index}
                                className='bg-gray-200 flex items-center justify-center text-4xl font-bold cursor-pointer hover:bg-gray-300 transition-colors duration-200 rounded-lg'
                                onClick={() => handleMove(index)}>
                                {cell}
                            </div>
                        )
                    })}
                </div>

                {/* <div>
                    {board.map((cell, index) => {
                        return (
                            <div className="rounded-lg">
                                <button
                                    onClick={() => handleMove(index)}>{cell}</button >
                            </div>
                        )
                    })}
                </div> */}

            </div >

            {/* <button onClick={() => handleMove(0)}> {board[0]} </button >
            <button onClick={() => handleMove(1)}> {board[1]}  </button >
            <button onClick={() => handleMove(2)}> {board[2]}  </button >
            <br />
            <button onClick={() => handleMove(3)}> {board[3]}  </button >
            <button onClick={() => handleMove(4)}> {board[4]}  </button >
            <button onClick={() => handleMove(5)}> {board[5]}  </button >
            <br />
            <button onClick={() => handleMove(6)}> {board[6]}  </button >
            <button onClick={() => handleMove(7)}> {board[7]}  </button >
            <button onClick={() => handleMove(8)}> {board[8]}  </button > */}
        </>
    )
}

export default App
