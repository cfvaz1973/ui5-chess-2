sap.ui.define([
    'ui5/futureview/ui5chess2/model/BaseObject',
    "sap/m/HBox",
    "sap/m/Image"
], function (BaseObject, HBox, Image) {
    'use strict';

    return BaseObject.extend("ui5.futureview.ui5chess2.model.Chessboard",
        {
            constructor: function (id, data) {
                BaseObject.call(this);

                this.id = id;

                this.fen = {
                    'empty': '/8/8/8/8//8/8/8/8/ w KQkq - 0 1',
                    'start': 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
                }

                this.piece_url = {
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
                };

                if (data) {
                    this.position = data.position;
                    this.showNotation = data.showNotation;
                    this.orientation = data.orientation;
                    this.draggable = data.draggable;
                }

                this.aBoard = this.fenToArray(this.fen[this.position]);

                this.isWhiteTurn = true;

            },
            fenToArray: function (fen) {
                let piecesString = fen.split(' ')[0].replace(/\//g, '');
                let piecesArrayNums = piecesString.split('');
                let piecesArray = piecesArrayNums.map(piece => {
                    if (parseInt(piece)) {
                        return [...Array(parseInt(piece)).fill(null)];
                    }
                    return piece;
                }).flat();
                return piecesArray;
            },
            loadPositionFromFen: function (fen) {
                let file = 0;
                let rank = 7;
                let aBoard = [];

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
                            aBoard[rank * 8 + file] = pieceType | pieceColour;
                            file++;
                        }
                    }
                }
                return aBoard;
            },
            draw: function (oView) {
                var boardId = oView.createId(this.id);
                var oBoard = oView.byId(boardId);
                oBoard.data('instance', this);

                // Create Board Squares (all 64)
                for (let i = 0; i < this.aBoard.length; i++) {
                    // get square data (row,col,color,piece)
                    let oSquareData = this.getSquareData(i);
                    // define HTML id of the square
                    let squareId = `${this.id}--${oSquareData.col}${oSquareData.row}`;
                    // create board square
                    // define class for board square
                    let sSquareClass = `square ${oSquareData.color}`;
                    let oSquare = new HBox(squareId, {}).addStyleClass(sSquareClass);

                    // add attributes to the square
                    // oSquare.data('instance', this);
                    // oSquare.data('index', i);
                    // oSquare.data('row', oSquareData.row);
                    // oSquare.data('col', oSquareData.col);
                    // oSquare.data('color', oSquareData.color);
                    // let dataObject = oSquare.data();
                    // console.log(`index:${dataObject.index} row:${dataObject.row} col:${dataObject.col}`);

                    // create piece within square
                    let sPieceImage = this.piece_url[this.aBoard[i]];
                    let sImagePath = '../img/' + sPieceImage;
                    let pieceId = 'piece';
                    let oPiece = new Image({ src: sImagePath }).addStyleClass("piece");
                    oSquare.addItem(oPiece);
                    oBoard.addItem(oSquare);
                }
                return oBoard;
            },
            isUppercase: function (symbol) {
                return symbol == symbol.toUpperCase() ? true : false;
            },
            getSquareData: function (i) {
                // get row and col
                let row = 8 - Math.floor(i / 8);
                let col = String.fromCharCode(97 + (i % 8));

                // get square color
                let mod = i % 2;
                let div = Math.floor(i / 8) % 2;
                let color = mod === div ? "white" : "black";

                var piece = null;
                const content = this.aBoard[i];

                if (content != null) {
                    let pieceColor = this.isUppercase(this.aBoard[i]) ? 'white' : 'black';
                    piece = {
                        piece: this.aBoard[i],
                        color: pieceColor
                    }
                }
                // return full object
                return { "row": row, "col": col, "color": color, "content": piece };
            }
        }
    )
});