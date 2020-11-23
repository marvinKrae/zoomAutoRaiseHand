// ==UserScript==
// @name     Zoom Auto raise Hand
// @version  1
// @author       You
// @match        https://*.zoom.us/wc/*
// @grant        none
// ==/UserScript==

var n = "no time";
var d;
try {
	d = new Date();
	n = d.toLocaleTimeString();
} catch (e) {
	// Fehler entdeckt
  console.log("Date error");
	console.log(e);
}

console.log("--------------Auto Raise Hand loaded! - "+n);

(function() {
    'use strict';
    var bar = document.getElementsByClassName("footer__inner")[0];
    var tray = document.createElement("div");
    tray.innerHTML = '<span>Raise hand if </span> <input id="hands" style="width: 30px; background-color: black;border: solid 1px white;"></input> hands are raising <button id="handBtn" style="background-color: black; border: solid 1px white;">Set</button> <button id="stopBtn" style="background-color: black; border: solid 1px white;">Stop</button><br><span id="pluginText">The plugin will only work when opening the participant list.</span>';
    tray.setAttribute ('id', 'mask');
    tray.style.position = "absolute";
    tray.style.color = "white";
    tray.style.backgroundColor = "rgba(0,0,0,0)";
    tray.style.left = "250px";
    tray.style.top = "5px";
    tray.style.zIndex = "999999";
    bar.insertBefore(tray, bar.childNodes[1]);
    var interval2;
    var hands;
    var text23 = document.getElementById("pluginText");

    function startHang(){
        clearInterval("interval2");
        interval2 = setInterval(function(){
            var array = document.getElementsByClassName("participants-icon__participants-raisehand");
            if(typeof(document.getElementsByClassName("nonverbal-icon raisehand-icon")[0]) == "undefined"){
                text23.innerHTML = "Please open the participant list in order to run the code.";
                text23.style.color = "red";
            }else{
                text23.innerHTML = "Plugin is running.";
                text23.style.color = "white";
            }
            var handStatus = document.getElementsByClassName("nonverbal-icon raisehand-icon")[0].className;

            if((hands <= array.length && handStatus.indexOf("selected") == -1)||(hands > array.length && handStatus.indexOf("selected") != -1)){
                document.getElementsByClassName("button-without-style")[0].click();
              	try {
                  d = new Date();
                  n = d.toLocaleTimeString();
                } catch (e) {
                  // Fehler entdeckt
                  console.log("Date error");
                  console.log(e);
                  n = "no time";
                }
              	console.log("----------Raising Hand ("+ n +")");
            }
        }, 2000);
    }

    var handBtn = document.getElementById("handBtn");
    handBtn.onclick = function(){
        hands = Number(document.getElementById("hands").value);
        startHang();
        if(typeof(document.getElementsByClassName("nonverbal-icon raisehand-icon")[0]) == "undefined"){
                text23.innerHTML = "Please open the participant list in order to run the code.";
                text23.style.color = "red";
            }else{
                text23.innerHTML = "Plugin is running.";
                text23.style.color = "white";
            }
    }

    var stopBtn = document.getElementById("stopBtn");
    stopBtn.onclick = function(){
        clearInterval(interval2);
        text23.innerHTML = "Plugin is stoped.";
    }
		console.log("go");
    // Your code here...
})();
