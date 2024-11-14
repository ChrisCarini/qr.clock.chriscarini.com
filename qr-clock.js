const DEBUG = false;

const sleep = ms => new Promise(r => setTimeout(r, ms));

const changeQrImage = qrImageUrl => {
    // Ensure we have access to the document, i.e. we are in the browser.
    if (typeof window === 'undefined') return

    const img = window.document.querySelector("#qr-clock-canvas")
    img.src = qrImageUrl
}

const currentQrClockTime = () => {
    const time = new Date().toISOString();

    const time_str = `It is currently ${time}.`.replaceAll(" ", "%20");

    return `https://quickchart.io/qr?size=450x450&ecLevel=H&text=${time_str}`;
}

const updateClock = () => {
    const qrImageUrl = currentQrClockTime();
    if (DEBUG) {
        console.log(`Setting image url to: ${qrImageUrl}`);
    }
    changeQrImage(qrImageUrl);
}

function start_canvas() {
    // Entry point
    window.requestAnimationFrame(draw_canvas);
}

async function draw_canvas() {
    let now = new Date();
    if (DEBUG) {
        console.log(`ANIMATE! - ${now.toISOString()}`);
    }
    // Update the favicon
    updateClock();

    // Sleep (otherwise we refresh way too often)
    await sleep(1000);

    // Animate!
    window.requestAnimationFrame(draw_canvas);
}

