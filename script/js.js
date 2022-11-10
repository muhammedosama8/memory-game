const animals = ['bird', 'cat', 'deer', 'dog', 'elephant', 'flamingo', 'fox', 'lion', 'monkey', 'rabbit']
const div = document.getElementById('game-block')

animals.map((res)=> {
    for(let i=0; i<2; i++){
        let card = document.createElement('div')
        let front = document.createElement('div')
        let back = document.createElement('div')
        let img = document.createElement('img')
        card.setAttribute('class', 'card')
        card.setAttribute('data-technology', `${res}`)
        front.setAttribute('class', 'face front')
        back.setAttribute('class', 'face back')
        img.setAttribute('src', `./images/${res}.png`)
        img.setAttribute('alt', `${res}`)

        back.append(img)
        card.append(front,back)
        div.append(card)
    }
})

document.getElementById('dark-mode').addEventListener('click', () => {
    document.getElementById('body').classList.toggle('dark-mode')
})

var tries = 0
const duration = 1000
let blocksContainer = document.querySelector('.game-block')
let cardsHasMatch = 0

let blocks = Array.from(blocksContainer.children)
let orderRange = [...blocks.keys()]

shuffle(orderRange);
orderItems();
blocks.forEach((block, index) => {
    block.addEventListener('click', () =>{
        flipped(block)
        checkEndGame()
    })
});

function orderItems() {
    blocks.forEach((block, index) => {
        block.style.order = orderRange[index]
    })
}

function shuffle(array) {
    let current = array.length,
         temp,
         random

    while (current > 0) {
        random = Math.floor(Math.random() * current)
        current--
        // Swap 
        temp = array[current]
        array[current] = array[random]
        array[random] = temp
    }
    
    return array
}
function flipped(selectedBlock){ 
    selectedBlock.classList.add('is-flipped')

    const allFlippedBlocks = blocks.filter(block=> block.classList.contains('is-flipped'))
    if( allFlippedBlocks.length == 2 ){
        stopClick()
        checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1])
    }
    
}
function stopClick(){
    blocksContainer.classList.add('no-click')

    setTimeout(()=>{
        blocksContainer.classList.remove('no-click')
    }, duration)
}
function checkMatchedBlocks(firstBlock, secondBlock){

    if(firstBlock.dataset.technology === secondBlock.dataset.technology ){
        firstBlock.classList.add('match')
        secondBlock.classList.add('match')
        cardsHasMatch+=2
        firstBlock.classList.remove('is-flipped')
        secondBlock.classList.remove('is-flipped')
    }else{
        setTimeout(()=>{
            firstBlock.classList.remove('is-flipped')
            secondBlock.classList.remove('is-flipped')
        },duration)
        tries++
    };
    document.getElementById('tries').innerHTML = tries
}

function checkEndGame() {
    if(cardsHasMatch === blocks.length){
        document.querySelector('.popup').classList.remove('none')
        document.getElementById('numOfTries').textContent ='You Tried ' + tries + ' Times Wrong'
    }
}
const playAgain = ()=> {
    document.querySelector('.popup').classList.add('none')
    blocks.forEach(block => {
        block.classList.remove('match')
        block.classList.remove('is-flipped')
    })
   
    shuffle(orderRange)
    orderItems()

    cardsHasMatch = 0
    tries = 0
    document.getElementById('tries').innerHTML = tries
}

if(blocks.forEach(block => block.className.charAt('card'))){
    console.log('True');
} else{
    console.log('False');
}