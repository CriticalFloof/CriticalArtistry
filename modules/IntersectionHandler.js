export function triggerOnView(targets, callbackFn){
    const triggerOnTarget = target => {
        const observer = new IntersectionObserver((entries, observer)=>{
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    const element = entry.target
                    callbackFn(element)
                    observer.disconnect()
                }
            })
        })  
        observer.observe(target)
    }
    targets.forEach(triggerOnTarget)
}
