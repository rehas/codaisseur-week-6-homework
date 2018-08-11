# Codaisseur HomeWork Week 6 
## TicTacToe Game Api
#
# Installation

## After cloning run :

1. `npm i`   to install dependencies
2. `npm run-script compile`   to compile ts into js
3. `npm run-script start`   to get the server started on port 4000 

#

# DB Information

* postgres
* code expects a db name of tictactoe
  * please see db.ts

# Usage

### when using httpie:
- when posting from httpie  use 
  - correct form of array 
  - single quotes for outer 
   - double quotes for inner
   - '[["o", "o", "o"],["o", "o", "o"],["o", "o", "o"]]'

- example:
  - `http put :4000/games/40 board:='[["x", "o", "o"],["o", "o", "o"],["o", "o", "o"]]' color=red name=redGame`

### when using postman:
- when using postman use
  - Use form-data or raw input for body
  - use the array syntax as is
  - example raw:
    - `{
        "board": [["x", "x", "o"],["o", "x", "o"],["o", "x", "x"]]
      }`

