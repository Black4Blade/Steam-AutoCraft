// ==UserScript==
// @name         Steam-AutoCraft
// @namespace    http://10101000.redirectme.net/
// @version      1.0
// @description  AutoCraft Badges inside Steam
// @author       10101000 aka Ryan Steed
// @match        *://steamcommunity.com/*/gamecards/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @copyright    2015 10101000 (Ryan Steed)
// @grant        none
// ==/UserScript==

var craftBadgeState = 0;
var invLinks = $('div.gamecards_inventorylink');

$(document).ready(function(){
    checkBadge();
    
    if (craftBadgeState == 1){
        addButton();
    }
    
    if (window.sessionStorage.autoCraftState){
        autoCraft();
    }
});

function addButton(){
    if (invLinks){
        invLinks.append('<a><button type="button" class="btn_grey_grey btn_small_thin" id="autocraft"><span>AutoCraft remaining badges</span></button></a>');
        $('#autocraft').click(function(){ autoCraft(); });
    }
}

function checkBadge(){
    if ($('div.badge_craft_button').length == 1){
        if (document.getElementsByClassName('badge_craft_button')[0].innerHTML.indexOf('Craft Badge') != -1){
            craftBadgeState = 1;
        } else {
            craftBadgeState = 0;
        }
    } else {
        delete window.sessionStorage.autoCraftState;
    }
}

function craftBadge(){
    $(document).ready(function(){
        $('.badge_craft_button').click();
    });
}
                      
function autoCraft(){
    craftBadge();
    setTimeout(function(){ checkBadge(); window.location.reload(true); }, 10000);
    window.sessionStorage.autoCraftState = 1;
}
