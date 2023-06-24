document.getElementById("start").addEventListener("click", () => startVideo());

document.getElementById("stop").addEventListener("click", () => player.stopVideo());

document.getElementById("pause").addEventListener("click", () => player.pauseVideo());

document.getElementById("previous").addEventListener("click", () => getPrevVideo());

document.getElementById("next").addEventListener("click", () => getNextVideo());