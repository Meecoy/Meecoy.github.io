const URLs = ["An-eye-for-the-moment","Designed-by-a-mortal-machine-for-an-immortal-machine.","That's-it?","Noodles","Everybody's-business-is-nobody's-business"];
const quote = URLs[Math.floor(Math.random() * URLs.length)];
history.replaceState({}, "", `/${quote}`);