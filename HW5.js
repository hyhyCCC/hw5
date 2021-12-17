/*yicheng_huang@student.uml.edu
  yicheng huang
12/16/2021

In the part, I am trying to finish most of the requires

first, there are 7 tiles in the holder from 100 in total.

Then user can move the tiles in the right place.

if not, those tiles will go back to the star place.

if the user finish the move.

It will check for all the sorce.

do not have a good idea  to finish the extra part.

Also check a lot of webs to help finish this homework.

the most crazy part is about move those tile and check for the right place.

more details in the write up too.
*/



//from the professor pdf

pieces = [
    { "letter": "A", "value": 1, "amount": 9 },
    { "letter": "B", "value": 3, "amount": 2 },
    { "letter": "C", "value": 3, "amount": 2 },
    { "letter": "D", "value": 2, "amount": 4 },
    { "letter": "E", "value": 1, "amount": 12 },
    { "letter": "F", "value": 4, "amount": 2 },
    { "letter": "G", "value": 2, "amount": 3 },
    { "letter": "H", "value": 4, "amount": 2 },
    { "letter": "I", "value": 1, "amount": 9 },
    { "letter": "J", "value": 8, "amount": 1 },
    { "letter": "K", "value": 5, "amount": 1 },
    { "letter": "L", "value": 1, "amount": 4 },
    { "letter": "M", "value": 3, "amount": 2 },
    { "letter": "N", "value": 1, "amount": 6 },
    { "letter": "O", "value": 1, "amount": 8 },
    { "letter": "P", "value": 3, "amount": 2 },
    { "letter": "Q", "value": 10, "amount": 1 },
    { "letter": "R", "value": 1, "amount": 6 },
    { "letter": "S", "value": 1, "amount": 4 },
    { "letter": "T", "value": 1, "amount": 6 },
    { "letter": "U", "value": 1, "amount": 4 },
    { "letter": "V", "value": 4, "amount": 2 },
    { "letter": "W", "value": 4, "amount": 2 },
    { "letter": "X", "value": 8, "amount": 1 },
    { "letter": "Y", "value": 4, "amount": 2 },
    { "letter": "Z", "value": 10, "amount": 1 },
    { "letter": "_", "value": 2, "amount": 2 }
]//"creator":"Ramon Meza" Thanks to Ramon Meza helps the hard part.

var dtitles = [];
var totalscore = 0;

//Start for the ready
//load some function when is ready.
$(document).ready(function () {
    $("#Tile_holder").droppable();
    Boxes();
    Holder();
});

//Submit button and then get the total score
$("#next").click(function () {
    next()
    total_score()
});
//Reset button. and then clean everything
$("#reset").click(function () {
    reset()

});

//Most crazt part for Boxes
function Boxes() {
    //in the .jpn
    //the boxes we have 15 in to put tile, so we should check for the boxes
    for (var i = 0; i < 15; i++) {
        $('div#line').append("<div id=empty_space" + i + "></div");
    }

    //this is for the size of Boexes, and make it dropable
    var square = $("[id^='empty_space']");
    square.width(64);
    square.height(100);
    //auto drop in the middle
    square.droppable({
        drop: function (event, ui) {
            box_postition = $(this).position();
            $("#" + ui.draggable.attr("id")).draggable("disable").css({ top: box_postition.top + 20, left: box_postition.left + 7, position: 'absolute' });
        },
    });

}

//Let's get 7 lucky tile in the Holder by random for the fair.
function Holder() {
    var pieces;
    for (var i = 0; i < 7; i++) {
        pieces = get_piece();
        dtitles.push(pieces);
        //Add image with pieces in the Holder
        tile_img(pieces, i);
    }
}

// by random for the fair from 100 in the bag
function get_piece() {
    var count = count_tile();
    var rand = Math.floor(Math.random() * count) + 1;
     //check we have enough tiles in the bags
    if (count > 0) {
        for (var x in pieces) {
            rand = rand - pieces[x].amount;
            if (rand <= 0) {
                pieces[x].amount = pieces[x].amount - 1;
                //  tile remaining
                count = count - 1;
                $("#tile_left").text(count);
                return pieces[x];
            }
        }
    }
    // or we should not have enough tile in the bags
    else {
        alert("There is no more tile in the bag.");
        location.reload();
    }
}

//Count the tile
function count_tile() {
    var t = 0;
    for (var x in pieces) {
        t = t + pieces[x].amount;
    }
    return t;
}

//This one is for tile with those img.
function tile_img(tile_info, tile_number) {
    if (tile_info.letter == "_") {
        img_letter_name = "Blank";
        $('div#Tile_holder').append("<div class=tile id=\"tile" + tile_number + "\"> <img src=\"Scrabble_Tiles/Scrabble_Tile_" + img_letter_name + ".jpg\" style=\"width:" + 50 + "px;height:" + 50 + "\"></div>");
    }
    else {
        $('div#Tile_holder').append("<div class=tile id=\"tile" + tile_number + "\"> <img src=\"Scrabble_Tiles/Scrabble_Tile_" + tile_info.letter + ".jpg\" style=\"width:" + 50 + "px;height:" + 50 + "\"></div>");
    }
    //draggable.
    $('#tile' + tile_number).draggable({
        snap: "[id ='line']",
        snapTolerance: 5,
        revert: "invalid",
        stop: function (event, ui) {
            //Calculate score
            calculate_score();
        }
    })
}

//Calculate the score
function calculate_score() {
    var score = 0;

    //double in the right place
    var doublescore = false;
    for (var i in dtitles) {
        var tile = $("#tile" + i);

        for (var j = 0; j < 15; j++) {
            var box = $("#empty_space" + j);
            if (check_tile(tile.position(), box.position())) {
                //Double_word_score
                if (j == 2 || j == 12) {
                    //double whole word
                    doublescore = true;
                    score = score + dtitles[i].value;
                    //Double_letter_score
                } else if (j == 6 || j == 8) {
                    score = score + (dtitles[i].value * 2);
                } else {
                    score = score + dtitles[i].value;
                }
            }
        }
    }
    //double double double double double
    if (doublescore) {
        score = score * 2;
    }
    $("#score").text(score);
}

// check the tile is in the box
//get two var so that make sure the tile in the box
function check_tile(tile_pos, box_postition) {
    var top_dif = tile_pos.top - box_postition.top;
    var left_dif = tile_pos.left - box_postition.left;
    if (top_dif >= -20 && top_dif <= 20 && left_dif >= -20 && left_dif <= 20) {
        return true;
    } else {
        return false;
    }
}

//Totle Score almost win.
function total_score() {
    $("#score").text();
    totalscore = totalscore + parseInt($("#score").text());
    //Total 
    $("#total_score").text(totalscore);
    //Reset score
    $("#score").text(0);
}

//Next button
function next() {
    for (var i in dtitles) {
        var tile = $("#tile" + i);
        for (var j = 0; j < 15; j++) {
            var box = $("#empty_space" + j);
            //Remove the tile that is in board box
            if (check_tile(tile.position(), box.position())) {
                $("#tile" + i).remove();
                //Replace the tile
                piece = get_piece();
                dtitles[i] = piece;
                tile_img(piece, i);
            }
        }
    }
}

//Reset button at the end
function reset() {
    window.location.reload(false);
}
