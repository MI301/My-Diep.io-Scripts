// ==UserScript==
// @name         Auto Respawn
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Mi300
// @match        https://*.diep.io/*
// @icon         https://www.google.com/s2/favicons?domain=diep.io
// @grant        none
// @run-at       document-start
// ==/UserScript==

const KEY = "t";
let isActive = false;
let last_attempted_spawn = Date.now();
setInterval(function(){
  if(!isActive){
    return;
  }
  const usernameInput = document.getElementById("spawn-nickname")
  if(window.extern && !extern.doesHaveTank()){
    if(Date.now() - last_attempted_spawn > 1000){
      last_attempted_spawn = Date.now();
      window.extern.try_spawn(
        (usernameInput && usernameInput.value)
     || window.localStorage.getItem("name")
     || window.ui.__username
     || ""
      );
    }
  };
}, 10);
document.addEventListener("keydown", function(e){
  if(e.key == KEY){
    isActive ^= true;
  }
});
