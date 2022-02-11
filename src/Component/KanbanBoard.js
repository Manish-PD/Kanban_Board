import React, { useState } from "react";
import Board, { moveCard } from "@lourenci/react-kanban";
import "@lourenci/react-kanban/dist/styles.css";

const initialBoard = {
    columns: [
        {
            id: 1,
            title: "To-Do",
            cards: [
                {
                    id: 1,
                    title: "Write post",
                    description: "Write a new post for blog."
                },
                {
                    id: 2,
                    title: "Cook dinner",
                    description: "Cook an awesome dinner."
                }
            ]
        },
        {
            id: 2,
            title: "In Progress",
            cards: [
                {
                    id: 3,
                    title: "Fix car",
                    description: "Fix my car problem"
                }
            ]
        },
        {
            id: 3,
            title: "Blocked",
            cards: [
                {
                    id: 4,
                    title: "Fix car",
                    description: "Fix my car problem"
                }
            ]
        },
        {
            id: 4,
            title: "Done",
            cards: [
                {
                    id: 5,
                    title: "Fix car",
                    description: "Fix my car problem"
                }
            ]
        }
    ]
};

function MyBoard() {

    const [board, setBoard] = useState(initialBoard);

    function onCardMove(card, source, destination) {
        const updatedBoard = moveCard(board, source, destination);
        setBoard(updatedBoard);

        // console.log("----------");
        // console.log(card);
        // console.log(source);
        // console.log(destination);
        console.log(updatedBoard);
    }

    return (
        <>
            <Board
                onCardDragEnd={onCardMove}
                disableColumnDrag
            >
                {board}
            </Board>
        </>
    );
};

export default MyBoard;