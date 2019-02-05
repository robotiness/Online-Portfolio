<?php
    $to = 'demo@spondonit.com';
    $firstname = $_POST["fname"];
    $email= $_POST["email"];
    $text= $_POST["message"];
    $phone= $_POST["phone"];
    


    $headers = 'MIME-Version: 1.0' . "\r\n";
    $headers .= "From: " . $email . "\r\n"; // Sender's E-mail
    $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

    $message ='<table style="width:100%">
        <tr>
            <td>'.$firstname.'  '.$laststname.'</td>
        </tr>
        <tr><td>Email: '.$email.'</td></tr>
        <tr><td>phone: '.$phone.'</td></tr>
        <tr><td>Text: '.$text.'</td></tr>
        
    </table>';

    if (@mail($to, $email, $message, $headers))
    {
        echo 'The message has been sent.';
    }else{
        echo 'failed';
    }
    <!--<div>
Click a cell when it's your move.<br><br>
<div id="winner"></div>
<div id="move">AI's Move</div>
<table>
    <tr>
        <td><button id="c00"></button></td>
        <td><button id="c01"></button></td>
        <td><button id="c02"></button></td>
    </tr>
    <tr>
        <td><button id="c10"></button></td>
        <td><button id="c11"></button></td>
        <td><button id="c12"></button></td>
    </tr>
    <tr>
        <td><button id="c20"></button></td>
        <td><button id="c21"></button></td>
        <td><button id="c22"></button></td>
    </tr>
</table>

<input type="button" id="restart" value="Restart Game"/>
</div>-->
<!--<style>
table {
    border-collapse: collapse;
    border-spacing: 0;
}

button {
    width: 50px;
    height: 40px;
    background: #fff;
    border: 4px solid #000;
    cursor: pointer;
    margin: 0px;
}

td {
    margin: 0px;
    padding: 0px;
}

div {
    text-align: center;
}

.wrapper, table {
    margin: 20px auto;
}
</style>
<script>
    var board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

var myMove = false;

function getWinner(board) {

    // Check if someone won
    vals = [true, false];
    var allNotNull = true;
    for (var k = 0; k < vals.length; k++) {
        var value = vals[k];

        // Check rows, columns, and diagonals
        var diagonalComplete1 = true;
        var diagonalComplete2 = true;
        for (var i = 0; i < 3; i++) {
            if (board[i][i] != value) {
                diagonalComplete1 = false;
            }
            if (board[2 - i][i] != value) {
                diagonalComplete2 = false;
            }
            var rowComplete = true;
            var colComplete = true;
            for (var j = 0; j < 3; j++) {
                if (board[i][j] != value) {
                    rowComplete = false;
                }
                if (board[j][i] != value) {
                    colComplete = false;
                }
                if (board[i][j] == null) {
                    allNotNull = false;
                }
            }
            if (rowComplete || colComplete) {
                return value ? 1 : 0;
            }
        }
        if (diagonalComplete1 || diagonalComplete2) {
            return value ? 1 : 0;
        }
    }
    if (allNotNull) {
        return -1;
    }
    return null;
}
function restartGame() {
    board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];
    myMove = false;
    updateMove();
}

function updateMove() {
    updateButtons();
    var winner = getWinner(board);
    $("#winner").text(winner == 1 ? "AI Won!" : winner == 0 ? "You Won!" : winner == -1 ? "Tie!" : "");
    $("#move").text(myMove ? "AI's Move" : "Your move");
}

function updateButtons() {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            $("#c" + i + "" + j).text(board[i][j] == false ? "x" : board[i][j] == true ? "o" : "");
        }
    }
}

var numNodes = 0;

function recurseMinimax(board, player) {
    numNodes++;
    var winner = getWinner(board);
    if (winner != null) {
        switch(winner) {
            case 1:
                // AI wins
                return [1, board]
            case 0:
                // opponent wins
                return [-1, board]
            case -1:
                // Tie
                return [0, board];
        }
    } else {
        // Next states
        var nextVal = null;
        var nextBoard = null;

        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if (board[i][j] == null) {
                    board[i][j] = player;
                    var value = recurseMinimax(board, !player)[0];
                    if ((player && (nextVal == null || value > nextVal)) || (!player && (nextVal == null || value < nextVal))) {
                        nextBoard = board.map(function(arr) {
                            return arr.slice();
                        });
                        nextVal = value;
                    }
                    board[i][j] = null;
                }
            }
        }
        return [nextVal, nextBoard];
    }
}

function makeMove() {
    board = minimaxMove(board);
    console.log(numNodes);
    myMove = false;
    updateMove();
}

function minimaxMove(board) {
    numNodes = 0;
    return recurseMinimax(board, true)[1];
}
if (myMove) {
    makeMove();
}

$(document).ready(function() {
    $(".target").click(function() {
        alert("click");
        var cell = $(this).attr("id")
        var row = parseInt(cell[1])
        var col = parseInt(cell[2])
        if (!myMove) {
            board[row][col] = false;
            myMove = true;
            updateMove();
            makeMove();
        }
    });
    $("#restart").click(restartGame);
});

updateMove();
/*
<tr>
        <td><button id="c00"></button></td>
        <td><button id="c01"></button></td>
        <td><button id="c02"></button></td>
    </tr>
    <tr>
        <td><button id="c10"></button></td>
        <td><button id="c11"></button></td>
        <td><button id="c12"></button></td>
    </tr>
    <tr>
        <td><button id="c20"></button></td>
        <td><button id="c21"></button></td>
        <td><button id="c22"></button></td>*/
</script>

             Start feature Area 
            <section class="feature-area pt-100">
                <div class="container">
                    <div class="row d-flex justify-content-center">
                        <div class="menu-content pb-70 col-lg-8">
                            <div class="title text-center">
                                <h1 class="mb-10">Play Some Tic Tac Toe</h1>
                                <p>Warning: This bot means some serious business.</p>
                            </div>
                        </div>
                    </div>                      
                    <div class="row">
                        <div class="col-lg-4 col-md-6 ">
                            <div class="single-feature mb-30 myTest">
                                <div id="c00" class="title d-flex flex-row pb-20 target2">
                                    <div id="c00" class="target2">
                                    </div>
                                </div>                          
                            </div>                          
                        </div>
                        <div class="col-lg-4 col-md-6 ">
                            <div class="single-feature mb-30 myTest">
                                <div class="title d-flex flex-row pb-20" id="c01">
                                    <div id="c01" class="target">
                                    </div>
                                </div>                          
                            </div>                          
                        </div>
                        <div class="col-lg-4 col-md-6 ">
                            <div class="single-feature mb-30 myTest">
                                <div class="title d-flex flex-row pb-20" id="c02">
                                    <div id="c02" class="target">
                                    </div>
                                </div>                          
                            </div>                          
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-4 col-md-6 ">
                            <div class="single-feature mb-30 myTest">
                                <div class="title d-flex flex-row pb-20" id="c10">
                                    <div id="c10" class="target">
                                    </div>
                                </div>                          
                            </div>                          
                        </div>
                        <div class="col-lg-4 col-md-6 ">
                            <div class="single-feature mb-30 myTest">
                                <div class="title d-flex flex-row pb-20" id="c11">
                                    <div id="c11" class="target">
                                    </div>
                                </div>                          
                            </div>                          
                        </div>
                        <div class="col-lg-4 col-md-6 ">
                            <div class="single-feature mb-30 myTest">
                                <div class="title d-flex flex-row pb-20" id="c12">
                                    <div id="c12" class="target">
                                    </div>
                                </div>                          
                            </div>                          
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-4 col-md-6 ">
                            <div class="single-feature mb-30 myTest">
                                <div class="title d-flex flex-row pb-20" id="c20">
                                    <div id="c20" class="target">
                                    </div>
                                </div>                          
                            </div>                          
                        </div>
                        <div class="col-lg-4 col-md-6 ">
                            <div class="single-feature mb-30 myTest">
                                <div class="title d-flex flex-row pb-20" id="c21">
                                    <div id="c21" class="target">
                                    </div>
                                </div>                          
                            </div>                          
                        </div>
                        <div class="col-lg-4 col-md-6 ">
                            <div class="single-feature mb-30 myTest">
                                <div class="title d-flex flex-row pb-20" id="c22">
                                    <div id="c22" class="target">
                                    </div>
                                </div>                          
                            </div>                          
                        </div>
                    </div>
                        
                </div>  
            </section>
            <End feature Area -->
?>
