const canvas = document.querySelector(".canvasBoard");
const video = document.querySelector(".videoPlayer");
const ctx = canvas.getContext('2d');
const commandsInput = document.querySelector("#commands");
const reproductorItems = document.querySelectorAll(".reproductor--item");

let animationId;
let isPlaying = false;
const basePath = "./Assets/Videos/";
const moviesList = ["akira", "kaguya", "roronoa", "mirai", "shingeki", "dxd"];

class Cell {
    constructor(x, y, symbol, color) {
        this.x = x; this.y = y;
        this.symbol = symbol; this.color = color;
    }
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillText(this.symbol, this.x, this.y);
    }
}

class AsciiEffect {
    #imageCellArray = [];
    #pixels = [];
    #ctx; #width; #height;

    constructor(ctx, width, height) {
        this.#ctx = ctx;
        this.#width = width;
        this.#height = height;
        this.#ctx.drawImage(video, 0, 0, this.#width, this.#height);
        this.#pixels = this.#ctx.getImageData(0, 0, this.#width, this.#height);
    }

    #convertToSymbol(g) {
        if (g > 200) return "@";
        if (g > 150) return "#";
        if (g > 100) return "*";
        if (g > 50) return ":";
        return ".";
    }

    #scanImage(cellSize) {
        this.#imageCellArray = [];
        for (let y = 0; y < this.#pixels.height; y += cellSize) {
            for (let x = 0; x < this.#pixels.width; x += cellSize) {
                const pos = (y * 4 * this.#pixels.width) + (x * 4);
                if (this.#pixels.data[pos + 3] > 128) {
                    const avg = (this.#pixels.data[pos] + this.#pixels.data[pos + 1] + this.#pixels.data[pos + 2]) / 3;
                    this.#imageCellArray.push(new Cell(x, y, this.#convertToSymbol(avg), `rgb(${avg},${avg},${avg})`));
                }
            }
        }
    }

    draw(cellSize) {
        this.#scanImage(cellSize);
        this.#ctx.clearRect(0, 0, this.#width, this.#height);
        this.#ctx.font = cellSize + "px monospace";
        this.#imageCellArray.forEach(cell => cell.draw(this.#ctx));
    }
}

// EFECTO NO SIGNAL (Estática)
const drawNoSignal = () => {
    if (!isPlaying) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#333";
        ctx.font = "20px monospace";
        ctx.fillText("NO SIGNAL", canvas.width / 2 - 50, canvas.height / 2);
        
        for (let i = 0; i < 600; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const gray = Math.random() * 255;
            ctx.fillStyle = `rgb(${gray},${gray},${gray})`;
            ctx.fillRect(x, y, 1.5, 1.5);
        }
        animationId = requestAnimationFrame(drawNoSignal);
    }
};

const renderFrame = () => {
    if (isPlaying && !video.paused && !video.ended) {
        const effect = new AsciiEffect(ctx, canvas.width, canvas.height);
        effect.draw(7);
        animationId = requestAnimationFrame(renderFrame);
    }
};

const stopVideo = () => {
    isPlaying = false;
    video.pause();
    video.src = "";
    cancelAnimationFrame(animationId);
    drawNoSignal();
};

function videoLoaded() {
    const file = document.querySelector("#fileChooser").files[0];
    if (file) {
        isPlaying = true;
        video.src = URL.createObjectURL(file);
        video.load();
        video.oncanplay = () => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            video.play();
        };
    }
}

// Inicialización
canvas.width = 800; canvas.height = 450;
drawNoSignal();

reproductorItems.forEach(item => {
    item.addEventListener('click', () => {
        isPlaying = true;
        const name = item.getAttribute('data-video');
        video.src = `${basePath}${name}.mp4`;
        video.play();
    });
});

video.addEventListener('play', () => {
    isPlaying = true;
    cancelAnimationFrame(animationId);
    renderFrame();
});

commandsInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        const parts = commandsInput.value.toLowerCase().trim().split(" ");
        const cmd = parts[0];
        const arg = parts[1];

        if (cmd === "play") {
            if (arg && moviesList.includes(arg)) {
                isPlaying = true;
                video.src = `${basePath}${arg}.mp4`;
                video.play();
            } else {
                video.play();
            }
        } else if (cmd === "pause") {
            video.pause();
        } else if (cmd === "stop") {
            stopVideo();
        }
        commandsInput.value = "";
    }
});