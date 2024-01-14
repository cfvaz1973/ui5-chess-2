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

                this.boards = [];

                for (let i = 1; i <= 2; i++) {
                    let sBoardId = `board${i}`;
                    var board = new Chessboard(sBoardId, {
                        position: 'start',
                        showNotation: true, orientation: 'white',
                        draggable: true
                    });
                    var obj = { "id": sBoardId,
                                "board": board };
                    this.boards.push(obj);
                }

                // //this.boards[0].sBoardId.draw(this);
                this.boards[0].board.draw(this);
                this.boards[1].board.draw(this);

                // this.board1 = new Chessboard('board1', {
                //     position: 'start',
                //     showNotation: true, orientation: 'white',
                //     draggable: true
                // });

                // this.board1.draw(this);

                // this.board2 = new Chessboard('board2', {
                //     position: 'start',
                //     showNotation: true, orientation: 'white',
                //     draggable: true
                // });

                //this.board2.draw(this);
            },
            onAfterRendering: function () {

                const boardSquares = document.getElementsByClassName("square");
                const pieces = document.querySelectorAll(".square .sapMFlexItem")
                const piecesImages = document.getElementsByClassName("piece");
                //const piecesImages = document.getElementsByTagName("img");

                // Put view reference in the document
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
                        boardSquares[i].addEventListener("dragover", allowDrop);
                        boardSquares[i].addEventListener("drop", drop);
                        // let row = 8 - Math.floor(i / 8);
                        // let column = String.fromCharCode(97 + (i % 8));
                        // let square = boardSquares[i];
                        // square.id = column + row;
                    }
                }

                // This function loops through an array of pieces and for each piece, it adds an event listener for the
                // dragstart event, calling the frag function when that event is triggered. The function also sets the draggable
                // attribute of each piece tp true, allowing pieces to be dragged.
                function setupPieces() {
                    for (let i = 0; i < pieces.length; i++) {
                        pieces[i].addEventListener("dragstart", drag);
                        pieces[i].setAttribute("draggable", true);
                        pieces[i].id = `${pieces[i].parentNode.id}--${i}`;
                        //pieces[i].id = pieces[i].className.split(" ")[1] + pieces[i].parentElement.id;
                    }
                    for (let i = 0; i < pieces.length; i++) {
                        piecesImages[i].setAttribute("draggable", false);
                    }
                }

                function allowDrop(ev) {
                    ev.preventDefault();
                }

                function drag(ev) {
                    const piece = ev.target;
                    const pieceColor = piece.getAttribute("color");
                    if ((isWhiteTurn && pieceColor == "white") || (!isWhiteTurn && pieceColor == "black"))
                        ev.dataTransfer.setData("text", piece.id);
                }

                function drop(ev) {
                    ev.preventDefault();
                    let data = ev.dataTransfer.getData("text");
                    if (data === "") return;
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

                function isSquareOccupied(square) {
                    if (square.querySelector(".piece")) {
                        const color = square.querySelector(".piece").getAttribute("color");
                        return color;
                    } else {
                        return "blank";
                    }
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
