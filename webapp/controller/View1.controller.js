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

                const boardId = this.createId('board');

                const oBoard = this.byId(boardId);

                for (let i = 0; i < board.length; i++) {
                    let oCoords = getPositionCoords(i);
                    let squareId = oCoords.col + oCoords.row;
                    // create square
                    let sSquareClass = 'square' + ' ' + oCoords.color;
                    let oSquare = new HBox(squareId, {}).addStyleClass(sSquareClass);
                    // create piece within square
                    let sPieceImage = piece_url[board[i]]; 
                    let sImagePath = '../img/' + sPieceImage;
                    let pieceId = 'piece';
                    let oPiece = new Image({ src: sImagePath, width:"50px", height:"50px" }).addStyleClass("piece");
                    oSquare.addItem(oPiece);
                    oBoard.addItem(oSquare);
                }

                function getPositionCoords(i) {
                    // get row and col
                    let row = Math.floor(i / 8) + 1;
                    let col = String.fromCharCode(97 + (i % 8));

                    // get square color
                    let mod = i % 2;
                    let div = Math.floor(i / 8) % 2;
                    let color = mod === div ? "white" : "black";

                    // return full object
                    return { "row": row, "col": col, "color": color};
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
                const pieces = document.getElementsByClassName("piece");
                for (let i = 0; i < pieces.length; i++) {
                    //pieces[i].addEventListener("dragstart", drag);
                    pieces[i].setAttribute("draggable", true);
                    //pieces[i].id = pieces[i].className.split(" ")[1] + pieces[i].parentElement.id;
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
