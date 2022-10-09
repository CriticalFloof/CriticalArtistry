//The main file

import loadingScreenSequence, {removeLoadingScreen} from './loadingScreen.js'
import {triggerOnView} from './intersectionHandler.js'

const loadingScreenRemoved = new Event('onloadingScreenRemoved')

const dropinTargets = document.querySelectorAll('.dropin')
const lazyimageTargets = document.querySelectorAll('img');

dropinTargets.forEach(target => {
    target.classList.add('dropin-inactive')
    target.classList.remove('dropin')
})
lazyimageTargets.forEach(target => {
    const src = target.getAttribute('data-lazy');
    if(src === null) return;
    target.classList.add('fadein-inactive')
})

loadingScreenSequence((loadingScreenElement)=>{
    //loading functions go here
    
    
    setTimeout(()=>{document.dispatchEvent(loadingScreenRemoved)},1500)

    removeLoadingScreen(loadingScreenElement)
});


document.addEventListener('onloadingScreenRemoved', ()=>{
    triggerOnView(dropinTargets, (element)=>{
        element.classList.add('dropin')
        element.classList.remove('dropin-inactive')
    })
    triggerOnView(lazyimageTargets, (element)=>{
        const src = element.getAttribute('data-lazy');
        if(src === null) return;
        element.setAttribute('src', src);
        element.classList.add('fadein')
        element.classList.remove('fadein-inactive')
    })

},false)


