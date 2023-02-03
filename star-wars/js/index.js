const starsList = []

const stars_container = document.querySelector(".stars")

console.log(stars_container.clientWidth, stars_container.clientHeight)

window.addEventListener("load", () => {
    for(j = 0; j < 2000; j++){
        const {x, y} = getPositions()

        starsList.push(new Star(x, y))
    }

    for(let star of starsList){
        const starDiv = document.createElement('div')
        starDiv.className = 'star'
        starDiv.style.top = star.y + 'px'
        starDiv.style.left = star.x + 'px'

        stars_container.appendChild(starDiv)
    }
})

const randomRangeInt = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
}

const getPositions = () => {
    let x = randomRangeInt(10, stars_container.clientWidth - 10)
    let y = randomRangeInt(10, stars_container.clientHeight - 10)

    if(starsList.length > 0){
        for(let i = 0; i < starsList.length; i++){

            if( x == starsList[i].x && y == starsList[i].y){
                x = randomRangeInt(10, stars_container.clientWidth - 10)
                y = randomRangeInt(10, stars_container.clientHeight - 10)

                i = -1
            }
        }
    }

    return {x, y}
}

class Star{
    constructor(x, y){
        this.x = x
        this.y = y
    }
}