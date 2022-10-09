/**
 * Creates a loading screen to mask the viewport while the function callback runs
 * @param {Function} functionCallBack
 */
export default function loadingScreenSequence(functionCallBack){
    const loadingScreenElement = createLoadingScreen()
    functionCallBack(loadingScreenElement)
}

//I usually hate writing code procedurally, but this is just code for a loading screen animation and isn't going to be used outside of that.
function createLoadingScreen(){

    window.onload = () => {
        window.scroll (0,0);
    };
    window.onscroll = () => {
        window.scroll (0,0);
    };

    let loadingScreenElement = document.createElement('div')
    loadingScreenElement.id = "loading-screen"
    loadingScreenElement.style.cssText = `
    display:flex;
    flex-direction:column;
    justify-content: center;
    align-items:center;
    background-color:#000000;
    position:fixed;
    top:0;
    width:100%;
    height:100%;
    `
    const bufferContainer = loadingScreenElement.appendChild(document.createElement('div'))
    bufferContainer.style.cssText = `
        width:clamp(120px, 20vw, 240px);
        height:clamp(120px, 20vw, 240px);
        position:relative;
        display:flex;
        background-color: #000000;
        
        `
    const wait = 1.25
    for(let i = 0; i < 2; i++){
        let childElement = bufferContainer.appendChild(document.createElement('div'))
        childElement.style.cssText = `
        border-radius: 25%;
        background-color:#ffffff;
        width:20%;
        height:20%;
        position:absolute;
        top:0%;
        left:0%;
        translate:(0%,0%);
        animation: buffer ${wait}s cubic-bezier(1,0,0,0) ${i*wait/2}s infinite forwards;
        `
    }
    bufferContainer.style.animation = `
    loading-buffer-movement 0.5s ease-in 2s forwards
    `
    const loadingText = loadingScreenElement.appendChild(document.createElement('h3'))
    loadingText.innerHTML = "loading..."
    loadingText.style.cssText = `
    color:#ffffff;
    transform: translateY(-80px);
    z-index:-1;
    `
    document.body.appendChild(loadingScreenElement)
    return loadingScreenElement;
}

export function removeLoadingScreen(element, delay = 0.5){
    let colorR = 0
    let colorG = 0
    let colorB = 0
    const iterations = 6
    for(let i = 0; i < iterations; i++){
        colorR += 8/iterations
        colorG += 196/iterations
        colorB += 64/iterations
        let childElementArrow = element.appendChild(document.createElement('div'))
        childElementArrow.style.cssText = `
        z-index:${i+100};
        width:0;
        height:0;
        position:absolute;
        top:0%;
        left:0%;
        border-top: 50vh solid transparent;
        border-right: 75vw solid rgb(${colorR} ${colorG} ${colorB});
        border-bottom: 50vh solid transparent;
        transform:translateX(150vw);
        animation: loading-finish 1s cubic-bezier(1,0,0,0) ${i/iterations/1.5}s forwards;
        `
        let childElementBackground = element.appendChild(document.createElement('div'))
        childElementBackground.style.cssText = `
        z-index:${i+100};
        background-color: rgb(${colorR} ${colorG} ${colorB});
        width:101vw;
        height:100vh;
        position:absolute;
        top:0%;
        left:0%;
        transform:translateX(225vw);
        animation: loading-finish-background 1s cubic-bezier(1,0,0,0) ${i/iterations/1.5}s forwards;
        `
    }
    
    setTimeout(()=>{
        window.onscroll = null;
        window.onload = null;
        element.style.animation = `disappear 1s linear forwards`
    },delay*3000)
    setTimeout(()=>{
        document.body.removeChild(element)
    },delay*5000)
}

    




