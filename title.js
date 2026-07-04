const text = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
function appendRandomLetter(){
    return text[Math.floor(Math.random() * text.length)];
}

function generateTitle(){
    let title = ""
    for(let i = 0; i < 5; i++){
        title += appendRandomLetter(title);
    }

    title += " - Meecoy - ";

    for(let i = 0; i < 5; i++){
        title += appendRandomLetter(title);
    }

    return title;
}

setInterval(() => {
    document.title = generateTitle();
}, 200)