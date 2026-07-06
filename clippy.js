import {failed, yourWeather, yourHour} from "./weather.js";

const clippy = document.getElementById("clippy")
const messageBox = document.getElementById("messageBox")
const message = document.getElementById("message");
const path = "assets/images/clippy/"

const windy = yourWeather.windSpeed > 24;
const night = (yourHour > 20 || yourHour < 6);
const sunny = !night && yourWeather.weatherCode <= 3;

const messages = {
    "N/A": "It looks like you don't want to tell me where you live. I will remember that...",
    "discord": "That's my Discord account! Unfortunately you can't add me through link, so you have to do this manually.",
    "windy": "Brrr! It's so windy here!",
    "night": "Yawn... Go get some sleep...",
    "sunny": "It's such a nice day today, isn't it?"
}

let isPlaying = false;

function reset(){
    isPlaying = false;
    clippy.src = path+"0.png";
    messageBox.hidden = true;
    message.innerHTML = "";
}

function playMessage(text, id, time){
    isPlaying = true;
    clippy.src = path + `${id}.gif`
    messageBox.hidden = false;
    message.innerHTML = text;
    setTimeout(reset, time);
}

if (failed && !isPlaying) {
    playMessage(messages["N/A"],1,5500)
} else if (windy) {
    playMessage(messages["windy"],3,4700);
} else if (night) {
    playMessage(messages["night"],5, 11700);
} else if (sunny) {
    playMessage(messages["sunny"],4, 12500);
}

document.getElementById("discord").addEventListener("click", () => {
   if (!isPlaying)
       playMessage(messages["discord"],2,7000);
});

