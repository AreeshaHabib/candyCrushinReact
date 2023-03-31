import { useEffect, useState } from "react"

const width = 8
const candyColor = [
  'blue',
  'green',
  'red',
  'orange',
  'purple',
  'yellow'
]

const App = () => {
  const [currentColor, setCurrentColor] = useState([]);
  const [squareBeingDrag, setSquareBeingDrag] = useState(null);
  const [squareBeingreplaced, setSquareBeingReplaced] = useState(null);


  //Chwck for column of three
  const checkForColumnOfThree = () => {
    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + width * 2]
      const decidedColor = currentColor[i]

      if (columnOfThree.every(square => currentColor[square] === decidedColor)) {
        columnOfThree.forEach(square => currentColor[square] = '')
      }
    }
  }
  const checkForRowOfThree = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2]
      const decidedColor = currentColor[i]
      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39.46, 47, 54, 55, 63, 64]

      if (notValid.includes(i)) continue

      if (rowOfThree.every(square => currentColor[square] === decidedColor)) {
        rowOfThree.forEach(square => currentColor[square] = '')
      }
    }
  }
  const checkForRowOfFour = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3]
      const decidedColor = currentColor[i]
      const notValid = [5, 6, 7, 14, 13, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64]

      if (notValid.includes(i)) continue

      if (rowOfFour.every(square => currentColor[square] === decidedColor)) {
        rowOfFour.forEach(square => currentColor[square] = '')
      }
    }
  }
  //Chwck for column of four
  const checkForColumnOfFour = () => {
    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i + width * 2, i + width * 3]
      const decidedColor = currentColor[i]

      if (columnOfFour.every(square => currentColor[square] === decidedColor)) {
        columnOfFour.forEach(square => currentColor[square] = '')
      }
    }
  }
  //This function is for swaping and new random color generating
  const moveIntoSquareBelow = () => {
    for (let i = 0; i <= 55; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
      const isFirstRow = firstRow.includes(i)

      if (isFirstRow && currentColor[i] === "") {
        let randomNumber = Math.floor(Math.random() * candyColor.length)
        candyColor[i] = candyColor[randomNumber]
      }
      if ((currentColor[i] + width) === '') {
        currentColor[i + width] = currentColor[i]
        currentColor[i] = ''
      }
    }
  }
  const dragStart = (e) => {
    console.log(e.target)
    console.log("drag start")
    setSquareBeingDrag(e.target)
  }
  const dragDrop = (e) => {
    console.log(e.target)
    console.log("drag drop")
    setSquareBeingReplaced(e.target)
  }
  const dragEnd = (e) => {
    console.log("drag end")

    const squareBeingReplacedId = parseInt(squareBeingreplaced.getAttribute('data-id'))
    const squareBeingDragId = parseInt(squareBeingDrag.getAttribute('data-id'))
  }
  //This Function is for creating board of 64 boxes 
  const createBoard = () => {
    const randomColorArrangement = []
    for (let i = 0; i < width * width; i++) {
      const randomColor = candyColor[Math.floor(Math.random() * candyColor.length)]
      randomColorArrangement.push(randomColor)
    }
    setCurrentColor(randomColorArrangement)
    //console.log(randomColorArrangement)
  }
  //createBoard();
  useEffect(() => {
    createBoard();
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfFour()
      checkForRowOfFour()
      checkForColumnOfThree()
      checkForRowOfThree()
      moveIntoSquareBelow()
      setCurrentColor([...currentColor])
    }, 100)
    return () => clearInterval(timer)

  }, [checkForColumnOfFour, checkForRowOfFour, checkForColumnOfThree, checkForRowOfThree, moveIntoSquareBelow, currentColor])

  //console.log(currentColor)
  return (
    <div className="app">
      <div className="game">
        {currentColor.map((candyColor, index) => (
          <img
            key={index}
            style={{ backgroundColor: candyColor }}
            alt={candyColor}
            data-id={index}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
