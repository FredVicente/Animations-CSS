import { useEffect, useState } from "react"

import '../styles/DoomFire.css'

export const DoomFire = (props) => {

    const fireColorsPalette = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}]

    const firePixelsArray = []

    const totalFirePixels = props.width * props.height

    const [pixelsTable, setPixelsTable] = useState([])

    const  calculateFirePropagation = () => {
        for (let column = 0; column < props.width; column++) {
          for (let row = 0; row < props.height; row++) {
            const pixelIndex = column + ( props.width * row )
      
            updateFireIntensityPerPixel(pixelIndex)
          }
        }

        const table = filterArray(firePixelsArray, props.width)
        setPixelsTable(table) 
    }

    const updateFireIntensityPerPixel = (currentPixelIndex) => {
        const belowPixelIndex = currentPixelIndex + props.width
      
        // below pixel index overflows canvas
        if (belowPixelIndex >= props.width * props.height) {
          return
        }

        const decay = Math.floor(Math.random() * 3)
        const belowPixelFireIntensity = firePixelsArray[belowPixelIndex]
        const newFireIntensity = belowPixelFireIntensity - decay >= 0 ? belowPixelFireIntensity - decay : 0
    
        firePixelsArray[currentPixelIndex - decay] = newFireIntensity
    }

    useEffect(() => {
        for(let i = 0; i < totalFirePixels; i++){
            if(i + props.width >= totalFirePixels){
                firePixelsArray[i] = 36
            } else {
                firePixelsArray[i] = 0
            }
        }

        const table = filterArray(firePixelsArray, props.width)
        setPixelsTable(table)

        setInterval(calculateFirePropagation, 25)
    }, [])

    return(
        <table className="fire-table">
            {pixelsTable.map( row => {
                return(
                    <tr>
                        {row.map(firePixel => {
                            return(
                                <td style={{
                                    backgroundColor:`rgb(${fireColorsPalette[firePixel].r}, ${fireColorsPalette[firePixel].g}, ${fireColorsPalette[firePixel].b})`
                                }}>
                                </td>
                            )
                        })}
                    </tr>
                )
            })}
        </table>
    )
}

const filterArray = (arr, itemsPerRow) => {
    let startIndex = 0

    const separatedArray = []

    for(let i = 0; i < Math.ceil(arr.length/itemsPerRow); i++){
        separatedArray.push(arr.slice(startIndex, startIndex + itemsPerRow))
        startIndex += itemsPerRow
    }

    return separatedArray
}