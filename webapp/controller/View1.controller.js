sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/HBox",
    "sap/m/Image"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, HBox, Image) {
        "use strict";

        return Controller.extend("ui5.futureview.ui5chess2.controller.View1", {

            onInit: function () {

                console.log('View1.controller.js init');

                const piece = {
                    none: 0,
                    king: 1,
                    pawn: 2,
                    knight: 3,
                    bishop: 4,
                    rook: 5,
                    queen: 6,
                    white: 8,
                    black: 16
                };

                const map_piece = {
                    'k': piece.king,
                    'p': piece.pawn,
                    'n': piece.knight,
                    'b': piece.bishop,
                    'r': piece.rook,
                    'q': piece.queen
                }

                const piece_url = {
                    'k': 'Black_King.png',
                    'p': 'Black_Pawn.png',
                    'n': 'Black_Knight.png',
                    'b': 'Black_Bishop.png',
                    'r': 'Black_Rook.png',
                    'q': 'Black_Queen.png',
                    'K': 'White_King.png',
                    'P': 'White_Pawn.png',
                    'N': 'White_Knight.png',
                    'B': 'White_Bishop.png',
                    'R': 'White_Rook.png',
                    'Q': 'White_Queen.png',
                }

                const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
                const board = fenToArray(fen);
                const board_2 = loadPositionFromFen(fen);
                console.log("Board", board);
                console.log("Board_2", board_2);
                //console.log("attribute", attribute);


                var that = this;

                var board1 = createBoard('board1');
                var board2 = createBoard('board2');
                var board3 = createBoard('board3');

                function createBoard(id) {
                    var boardId = that.createId(id);
                    var oBoard = that.byId(boardId);
                    for (let i = 0; i < board.length; i++) {
                        let oCoords = getPositionCoords(i);
                        let squareId = boardId + oCoords.col + oCoords.row;
                        // create square
                        let sSquareClass = 'square' + ' ' + oCoords.color;
                        let oSquare = new HBox(squareId, {}).addStyleClass(sSquareClass);
                        // create piece within square
                        let sPieceImage = piece_url[board[i]];
                        let sImagePath = '../img/' + sPieceImage;
                        let pieceId = 'piece';
                        let oPiece = new Image({ src: sImagePath }).addStyleClass("piece");
                        oSquare.addItem(oPiece);
                        oBoard.addItem(oSquare);
                    }
                    return oBoard;
                }



                // var boardId = this.createId('board1');

                // var oBoard = this.byId(boardId);

                // for (let i = 0; i < board.length; i++) {
                //     let oCoords = getPositionCoords(i);
                //     let squareId = boardId + oCoords.col + oCoords.row;
                //     // create square
                //     let sSquareClass = 'square' + ' ' + oCoords.color;
                //     let oSquare = new HBox(squareId, {}).addStyleClass(sSquareClass);
                //     // create piece within square
                //     let sPieceImage = piece_url[board[i]];
                //     let sImagePath = '../img/' + sPieceImage;
                //     let pieceId = 'piece';
                //     let oPiece = new Image({ src: sImagePath }).addStyleClass("piece");
                //     oSquare.addItem(oPiece);
                //     oBoard.addItem(oSquare);
                // }

                // boardId = this.createId('board2');

                // oBoard = this.byId(boardId);

                // for (let i = 0; i < board.length; i++) {
                //     let oCoords = getPositionCoords(i);
                //     let squareId = boardId + oCoords.col + oCoords.row;
                //     // create square
                //     let sSquareClass = 'square' + ' ' + oCoords.color;
                //     let oSquare = new HBox(squareId, {}).addStyleClass(sSquareClass);
                //     // create piece within square
                //     let sPieceImage = piece_url[board[i]];
                //     let sImagePath = '../img/' + sPieceImage;
                //     let pieceId = 'piece';
                //     let oPiece = new Image({ src: sImagePath }).addStyleClass("piece");
                //     oSquare.addItem(oPiece);
                //     oBoard.addItem(oSquare);
                // }



                function getPositionCoords(i) {
                    // get row and col
                    let row = Math.floor(i / 8) + 1;
                    let col = String.fromCharCode(97 + (i % 8));

                    // get square color
                    let mod = i % 2;
                    let div = Math.floor(i / 8) % 2;
                    let color = mod === div ? "white" : "black";

                    // return full object
                    return { "row": row, "col": col, "color": color };
                }

                function fenToArray(fen) {
                    const piecesString = fen.split(' ')[0].replace(/\//g, '');
                    const piecesArrayNums = piecesString.split('');
                    const piecesArray = piecesArrayNums.map(piece => {
                        if (parseInt(piece)) {
                            return [...Array(parseInt(piece)).fill(null)];
                        }
                        return piece;
                    }).flat();
                    return piecesArray;
                }

                function loadPositionFromFen(fen) {
                    let file = 0;
                    let rank = 7;
                    let board = [];

                    for (let symbol of fen) {
                        if (symbol == '/') {
                            file = 0;
                            rank--;
                        } else {
                            if (parseInt(symbol)) {
                                file += parseInt(symbol);
                            } else {
                                let pieceColour = isUppercase(symbol) ? piece.white : piece.black;
                                let pieceType = map_piece[symbol.toLowerCase()];
                                board[rank * 8 + file] = pieceType | pieceColour;
                                file++;
                            }
                        }
                    }
                    return board;
                }

                function isUppercase(char) {
                    return char == char.toUpperCase();
                }

            },
            onAfterRendering: function () {

                const boardSquares = document.getElementsByClassName("square");
                const pieces = document.querySelectorAll(".square .sapMFlexItem")
                const piecesImages = document.getElementsByClassName("piece");
                //const piecesImages = document.getElementsByTagName("img");

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
                        pieces[i].id = pieces[i].className.split(" ")[1] + pieces[i].parentElement.id;
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
