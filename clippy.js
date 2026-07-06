import { failed } from "./weather.js";

const clippy = document.getElementById("clippy")
const messageBox = document.getElementById("messageBox")
const message = document.getElementById("message");
const path = "assets/images/clippy/"

let isPlaying = false;

function reset(){
    isPlaying = false;
    clippy.src = path+"0.png";
    messageBox.hidden = true;
    message.innerHTML = "";
}

if (failed && !isPlaying) {
    isPlaying = true;
    clippy.src = path + "1.gif"
    messageBox.hidden = false;
    message.innerHTML = "It looks like you don't want to tell me where you live. I will remember that...";
    setTimeout(reset, 5500);
}

document.getElementById("discord").addEventListener("click", () => {
   if (!isPlaying){
       isPlaying = true;
       clippy.src = path + "2.gif";
       messageBox.hidden = false;
       message.innerHTML = "That's my discord! Unfortunately you can't add me through link, so you have to do this manually.";
       setTimeout(reset,7000);
   }
});

