import { UnifiedCardData } from "../libs/types";


export const shuffleCards=(dataArray:UnifiedCardData[]):UnifiedCardData[]=>{
    const shuffledData=[...dataArray];
    for (let i = shuffledData.length -1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i+1));
        let k = shuffledData[i];
        shuffledData[i] = shuffledData[j];
        shuffledData[j] = k;
    }
    console.log("Shuffled Data",[...shuffledData])
    return [...shuffledData]
}