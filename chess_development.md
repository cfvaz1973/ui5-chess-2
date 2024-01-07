# Chess UI5 development goals

- Create a ChessBoard component
    - Follow model [chessboardjs.com](https://chessboardjs.com)

- Basic configuration to allow:
```javascript
{
    position: 'start',
    showNotation: true | false,
    orientation: 'black' | 'white',
    draggable: true | false
}
```
- JS
```javascript
var board = ChessBoard('myBoard','start');
```
- HTML
```HTML
<div id="myBoard" style="width=400px"></div>
```



