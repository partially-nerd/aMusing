const here = "./audio/"
const $ = x => document.querySelectorAll(x);

let wave = new CircularAudioWave(document.getElementById('waveDisplay'));
wave.gainNode = wave.context.createGain();
wave.gainNode.gain.setTargetAtTime(0.1, wave.context.currentTime, 0.2);
wave.gainNode.connect(wave.context.destination);
wave.sourceNode.connect(wave.gainNode); 
const currentPosDom = document.querySelector(".ringed-display");

const searchOnline = async(e) => {
    if (e.key == "Enter") {
        that = document.activeElement;
        res = await ytSearch.search(that.value);
        setTimeout(() => {
            res = res.items[0].id;
            child_process.spawn(`cd audio; yt-dlp -x --audio-format mp3 https://www.youtube.com/watch?v=${res}`)
            console.log(`cd audio; yt-dlp -x --audio-format mp3 https://www.youtube.com/watch?v=${res}`);
        }, 2000);
    }
}

const startPlaying = () => {
    that = document.activeElement;
    console.log(that);
    wave.play();
    setInterval(() => {
        curPercent = Math.floor(wave.context.currentTime*100/wave.sourceNode.buffer.duration);
        // console.log(curPercent);
        currentPosDom.style = `--text: '${curPercent}%'; --angle: ${3.6*curPercent}deg; --rad: 100px`;
    }, 1000);
}

const read = path => {
    let contents = fs.readDir(path);
    let fileContents = [];
    let this_here = path.split("/").at("-1");
    contents.forEach(file => {
        fileContents.push(`${this_here}/${file}`);
    });
    return fileContents;
}

function fillExplorer(mainPath) {
    $("#explorer")[0].innerHTML = ""
    read(mainPath).forEach(path => {
        if (fs.isFolder(`${here}/${path}`) === true){
            fillExplorer(`${here}/${path}`);
            console.log(path);
        }
        else {
            var btn = document.createElement("button");
            if (path.length >= 25) {
                btn.innerHTML = path.slice(1, 25) + "...";
            } else{
                btn.innerHTML = path;
            }
            btn.setAttribute("path", path);
            btn.addEventListener("click", openFile);
            btn.classList.add("explorer-item");
            $("#explorer")[0].append(btn);
        }
    });
}

const openFile = e => {
    if ($(".active-song")[0] !== undefined) {
        $(".active-song")[0].classList.remove("active-song");        
    }
    that = document.activeElement;
    that.classList.add("active-song");
    activeSong = that.getAttribute("path");
    wave.loadAudio(`${here}${activeSong}`);
}

fillExplorer(here);

date = new Date(); 
year = date.getFullYear(); 
month = date.getMonth(); 
function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
month = pad(month, 2)
day = date.getDate(); 
const form = $(".signup")[0];

$("#date")[0].value = `${year}-${month}-${day}`; day = date.getDate(); $("#date")[0].value = `${year}-${month}-${day}`

if (localStorage.getItem("AMusername") !== null) {
    form.style.display = "none";
    usrname = localStorage.getItem("AMusername");
    $("#greetings")[0].innerHTML = `Greetings, ${usrname}!`;
    setTimeout(() => {
        $("#greetings")[0].style.opacity = "0";
    }, 1000);
}

function hideForm() {
    localStorage.setItem("AMusername", $("#username")[0].value);
    localStorage.setItem("AMemail", $("#email")[0].value);
    form.style.opacity = 0;
    setTimeout(() => {
        form.style.visibility = "hidden";
        form.style.display = "none";
    }, 800);
    usrname = localStorage.getItem("AMusername");
    $("#greetings")[0].innerHTML = `Greetings, ${usrname}!`;
    setTimeout(() => {
        $("#greetings")[0].style.opacity = "0";
    }, 1000);
}