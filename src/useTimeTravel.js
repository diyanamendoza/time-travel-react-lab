import { useState } from 'react'

export function useTimeTravel() {
    const [currentVal, setCurrentVal] = useState('')
    const [dateArray, setDateArray] = useState([])
    const [changeCount, setChangeCount] = useState(-1)
    const [redoCount, setRedoCount] = useState(0)

    // save - a function to set & save a new current value
    const save = (input) => { 
            setCurrentVal(input)
            setDateArray((prevState) => [...prevState, input])
            setChangeCount((prevState) => prevState + 1)
        }
    
    // undo - a function that sets the current value to the previous value
    const undo = () => { 
        let curr = dateArray[changeCount - 1]
        if (changeCount > 0) {
            setChangeCount(changeCount - 1)
            setCurrentVal(curr)
        }
    }

    // redo - a function that sets the current value to the next value
    const redo = () => {
        let curr = dateArray[changeCount + 1]
        if (redoCount === 2) {
            curr = dateArray[changeCount + 2]
            setCurrentVal(curr)
        }
        if (redoCount === 3) {
            curr = dateArray[changeCount]
            setCurrentVal(curr)
        }
        if (dateArray.length > 1) {
            setChangeCount(changeCount + 1)
            setCurrentVal(curr)
            setRedoCount((prevState) => prevState + 1)
        }
    }

    return [save, undo, redo, currentVal, dateArray, changeCount]
}
