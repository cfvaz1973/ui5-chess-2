sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/HBox",
    "sap/m/Image",
    "ui5/futureview/ui5chess2/model/Chessboard"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, HBox, Image, Chessboard) {
        "use strict";

        return Controller.extend("ui5.futureview.ui5chess2.controller.View1", {

            onInit: function () {

                this.aBoard = [];

                for (let i = 1; i <= 2; i++) {
                    let sBoardId = `board${i}`;
                    var board = new Chessboard(sBoardId, {
                        position: 'start',
                        showNotation: true, orientation: 'white',
                        draggable: true
                    });
                    var obj = {
                        "id": sBoardId,
                        "board": board
                    };
                    this.aBoard.push(obj);
                }

                this.aBoard[0].board.draw(this);
                //this.aBoard[1].board.draw(this);
            },
            onAfterRendering: function () {

                const boardSquares = document.getElementsByClassName("square");
                const pieces = document.querySelectorAll(".square .sapMFlexItem")
                const piecesImages = document.getElementsByClassName("piece");
                //const piecesImages = document.getElementsByTagName("img");

                // Put view reference in the document
                // so data can be acceessed in the 
                document.view = this;

                const aString = "Carlos";
                const that = this;

                setupBoardSquares();
                setupPieces();

                // This function sets up the event listeners and IDs for the squares on the chess board.
                // It loops through an array of boardSquares and for each square, it adds an event listener for the dragover and drop events,
                // calling the allowDrop and deop functions respectively when those events are triggered
                // The function also calculates the row and column for each square and assigns an ID to the square in the format
                // column + row, where column is a letter from 'a' to 'h' and row is a number from 1 to 8.
                function setupBoardSquares() {
                    for (let i = 0; i < boardSquares.length; i++) {
                        // boardSquares[i].addEventListener("dragenter", dragEnter);
                        // boardSquares[i].addEventListener("dragleave", dragLeave);
                        boardSquares[i].addEventListener("dragover", allowDrop);
                        boardSquares[i].addEventListener("drop", drop);
                    }
                }

                // This function loops through an array of pieces and for each piece, it adds an event listener for the
                // dragstart event, calling the frag function when that event is triggered. The function also sets the draggable
                // attribute of each piece tp true, allowing pieces to be dragged.
                function setupPieces() {
                    for (let i = 0; i < pieces.length; i++) {
                        pieces[i].setAttribute("draggable", false);
                    }
                    for (let i = 0; i < pieces.length; i++) {
                        piecesImages[i].addEventListener("dragstart", drag);
                        piecesImages[i].setAttribute("draggable", true);
                        piecesImages[i].id = `${pieces[i].parentNode.id}--${i}`;
                        //piecesImages[i].id = `${piecesImages[i].id}--${i}`;
                    }
                }

                function dragStart(ev) {
                    ev.dataTransfer.setData('text/plain', ev.target.id);
                    //ev.target.classList.add('hide');
                }

                function dragEnter(ev) {
                    ev.preventDefault();
                    //console.log(`dragEnter: ${ev.target.id}`);
                    ev.target.classList.add('drag-over');
                }

                function allowDrop(ev) {
                    ev.preventDefault();
                    console.log(`dragOver: ${ev.target.id}`);
                    ev.target.classList.add('drag-over');
                }

                function dragLeave(ev) {
                    //console.log(`dragLeave: ${ev.target.id}`);
                    ev.target.classList.remove('drag-over');
                }

                function drop(ev) {
                    ev.preventDefault();
                    var data = ev.dataTransfer.getData("text");
                    ev.target.appendChild(document.getElementById(data));
                    ev.target.classList.remove('drag-over');

                    return;

                    ev.preventDefault();
                    let pieceId = ev.dataTransfer.getData("pieceId");
                    return;

                    if (pieceId === "") return;
                    const piece = document.getElementById(data);
                    const destinationSquare = ev.currentTarget;
                    let destinationSquareId = destinationSquare.id;
                    if (isSquareOccupied(destinationSquare) == "blank") {
                        destinationSquare.appendChild(piece);
                        isWhiteTurn = !isWhiteTurn;
                        return;
                    }
                    if (isSquareOccupied(destinationSquare) !== "blank") {
                        while (destinationSquare.firstChild) {
                            destinationSquare.removeChild(destinationSquare.firstChild);
                        }
                        destinationSquare.appendChild(piece);
                        isWhiteTurn = !isWhiteTurn;
                        return;
                    }

                }

                function drag(ev) {

                    ev.dataTransfer.setData("text", ev.target.id)
                    return;




                    const square = ev.target;

                    // Decode id to obtain boardId, Square Coordinates, square index
                    var aRef = square.id.split("--");

                    const [boardId, squareCoords, squareId] = aRef;
                    // simplification of:
                    // var boardId = aRef[0];
                    // var squareCoords = aRef[1];
                    // var squareId = aRef[2];

                    // Get full view data
                    var oView = document.view;

                    // Get correct board
                    var oBoard = getBoardById(oView.aBoard, boardId);

                    // Get data related to board square
                    var oSquare = oBoard.getSquareData(squareId);

                    if ((oSquare.content.piece !== '') &&
                        ((oBoard.isWhiteTurn && oSquare.content.color == "white") ||
                            (!oBoard.isWhiteTurn && oSquare.content.color == "black")))
                        ev.dataTransfer.setData("pieceId", square.id);
                }

                function isSquareOccupied(square) {
                    if (square.querySelector(".piece")) {
                        const color = square.querySelector(".piece").getAttribute("color");
                        return color;
                    } else {
                        return "blank";
                    }
                }

                function getBoardById(arr, id) {
                    return arr.find(function (o) { return o.id === id }).board;
                }

                // alert('onBeforeRendering');
                // console.log('onBeforeRendering');
                // var oChessBoard = new HBox("board",{}).addStyleClass ("chessBoard");                
                // var oSquare = new HBox("a8",{}).addStyleClass("square");
                // oSquare.placeAt(oChessBoard);
                //oChessBoard.placeAt("application-ui5futureviewui5chess2-display-component---View1--page-cont");
            }
        });
    });
