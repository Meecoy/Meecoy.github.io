const text = "Á̷̢B̴̿ͅC̷̟͒D̶̲͆È̷̦F̸͔̄Ḡ̵̭H̸̨̿Ȉ̷̱Ĵ̵̬K̶͍̈́L̵̯̋M̴̙͝N̶̥̆Ó̵̳P̷͎̏Q̶̗̊Ṟ̸͆S̵̯̕Ţ̶̈Ȕ̸̥V̸͈̉Ẁ̸͍X̶̼̄Y̶͚̚Z̸̭͋a̴̧̛b̶͙̐c̷̗̎d̷̞͠ė̷̱f̴̲͂g̸̥̒h̵͙̔i̵͕̋j̴̼̇k̸̪͊l̵͚͠m̷̭̀n̴̹͛ǒ̷͈p̷͎͝q̸͙̒r̷͚̀s̷̞̀t̴̝̑ṳ̶̐v̴͖̊w̶̭̽x̷̰͂y̷͈̎z̴̲͛0̶̤̕1̶͇̚2̶̟̽3̷͙̾4̴͉̎5̸̟̍6̷̪̋7̸̪͝8̸̫͐9̶̲̈";
function appendRandomLetter(){
    return text[Math.floor(Math.random() * text.length)];
}

function generateTitle(){
    let title = ""
    for(let i = 0; i < 5; i++){
        title += appendRandomLetter(title);
    }

    title += "  Meecoy  ";

    for(let i = 0; i < 5; i++){
        title += appendRandomLetter(title);
    }

    return title;
}

setInterval(() => {
    document.title = generateTitle();
}, 200)