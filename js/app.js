// WSTEPNY SZKIC PROJEKTU
// gra renderuje losowo jeden z 5 klockow i wyswietla go na gorze planszy(na planszy wynikow pokazuje jaki bedzie kolejny klocek)
// na poczatku gry renderowany jest spod planszy
// klocki moga poruszac sie horyzontalnie po wisnieciu strzalek w prawo i w lewo
// za pomoca strzalki w gore klocki moga sie obracac(uwaga na bokach moga wychodzic za plansze)
// klocki samoistnie poruszaja sie w dol
// po wcisnieciu strzalki w dol klocki poruszaja sie w dol szybciej
//
// po dotknieciu zapelnionego pola klocek staje i pojawia sie nastepny
// po wypelnieniu obojetnie ktorego pola horyzontalnie to pole znika,
// klocki z gory przesuwaja sie o jedno pole w dol dodawane sa punkty
// jezeli klocki beda tak wysoko na planszy ze kolejny klocek od razu w nie wejdzie gameover
//
//
//
// <<<<<<<<<<<<<<<<<<<<<<<<<       1. PODSTAWOWE ZMIENNE       >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//
//
// ********************  obiekty tetrimino z ich wszystkimi wariacjami oraz kolor w jakim beda wyswietlane
//
// Tetrimino „I” – cztery elementy w jednym szeregu
// Tetrimino „T” – trzy elementy w rzędzie i jeden dołączony do środkowego elementu
// Tetrimino „O” – cztery elementy połączone w kwadrat
// Tetrimino „L” – trzy elementy w rzędzie i jeden dołączony do lewego elementu od spodu
// Tetrimino „J” – trzy elementy w rzędzie i jeden dołączony do prawego elementu od spodu
// Tetrimino „S” – tetrimino „O” po przesunięciu dwóch górnych elementów w prawo
// Tetrimino „Z” – tetrimino „O” po przesunięciu dwóch górnych elementów w lewo

const iTetrimino = {
  variations: [
    [5, 15, 25, 35],
    [5, 6, 7, 8],
  ],
  blockColor: "block",
  scoreBoardVariation: [1, 5, 9, 13],
};
const tTetrimino = {
  variations: [
    [14, 15, 16, 25],
    [5, 15, 25, 14],
    [14, 15, 16, 5],
    [5, 15, 25, 16],
  ],
  blockColor: "block2",
  scoreBoardVariation: [4, 5, 6, 9],

};
const oTetrimino = {
  variations: [[5, 6, 15, 16]],
  blockColor: "block3",
  scoreBoardVariation: [4, 5, 8, 9],

};
const lTetrimino = {
  variations: [
    [24, 25, 26, 34],
    [14, 15, 25, 35],
    [24, 25, 26, 16],
    [15, 25, 35, 36],
  ],
  blockColor: "block4",
  scoreBoardVariation: [4, 5, 6, 8],
};
const jTetrimino = {
  variations: [
    [24, 25, 26, 36],
    [15, 25, 35, 34],
    [26, 25, 24, 14],
    [35, 25, 15, 16],
  ],
  blockColor: "block5",
  scoreBoardVariation: [4, 5, 6, 10],
};
const sTetrimino = {
  variations: [
    [16, 15, 25, 24],
    [15, 25, 26, 36],
  ],
  blockColor: "block6",
  scoreBoardVariation: [5, 6, 8, 9],

};
const zTetrimino = {
  variations: [
    [14, 15, 25, 26],
    [16, 26, 25, 35],
  ],
  blockColor: "block7",
  scoreBoardVariation: [4, 5, 9, 10],

};
// ******************** KONIEC obiektow tetrimino
//
// 
// ******************** zmienne dotyczace okienka z zasadami wyskakujacego na poczatku gry
const closeBtn = document.querySelector(".close");
const rulesOfGame = document.querySelector(".menu");
//
// zmienna mowiaca ktory klocek jest w grze
let currentTetrimino = JSON.parse(JSON.stringify(chooseTetrimino()));
// 
// zmienna mowiaca ktory klocek pojawi sie przy nastepnym ruchu
let nextTetrimino = JSON.parse(JSON.stringify(chooseTetrimino()));
// 
// zmienna mowiaca ktora wariacja danego tetrimino jest uzyta
let flipTetriminoNum = 0;

// przycisk zamykania zasad gry
closeBtn.addEventListener("click", () => {
    rulesOfGame.style.display = 'none';
    pause = false;
});
// 
// 
// 21 X 10 wielkosc planszy (2x2rem) 
// zmienna zaznaczajaca wszyskie elementy planszy
let board = document.querySelectorAll(".grid div");
//
//
//
// <<<<<<<<<<<<<<<<<<<<<<<<<  2. FUNKCJE PORUSZANIA TETRIMINO >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//
//
//
// ******************** FUNKCJA A
// zbiera informacje w ktorym miejscu na planszy
// jest dany tetrimino i dodaje w tym miescu 
// klase z kolorem bloku renderujac w ten sposob tetrimino
function renderTetrimino(tetrimino) {
  board.forEach((element) => {
    if (
      !element.classList.contains("blockGround") &&
      !element.classList.contains("attach")
    ) {
      element.classList = "";
    }
  });
  for (let j = 0; j < 4; j++) {
    board[tetrimino.variations[flipTetriminoNum][j]].classList.add(
      tetrimino.blockColor
    );
  }
}
//
// ******************** FUNKCJA B
// Funkcja poruszajaca klocki w dol
// dodaje do pozycji tetrimino 10 [liczby okreslaja miejsce na planszy],
// dzieki temu przesuwa tetrimino w dol
// nastepnie renderuje klocek w nowej pozycji
function moveDown(tetrimino) {
  for (let i = 0; i < tetrimino.variations.length; i++) {
    for (let j = 0; j < 4; j++) {
      tetrimino.variations[i][j] += 10;
    }
  }
  renderTetrimino(currentTetrimino);
}
//
// ******************** FUNKCJA C
// Funkcja przewracajaca klocki
// kazdy tetrimino ma kilka 'variations'
// funkcja zmienia wariacje na kolejna(wariacje sa wyzej w stalych tetrimino) i renderuje tetrimino w nowej wariacji
function flipTetrimino(tetrimino) {
  flipTetriminoNum++;
  if (flipTetriminoNum == tetrimino.variations.length) {
    flipTetriminoNum = 0;
  }
  board.forEach((element) => {
    if (
      !element.classList.contains("blockGround") &&
      !element.classList.contains("attach")
    ) {
      element.classList = "";
    }
  });
  renderTetrimino(tetrimino);
}
//
// ******************** FUNKCJA D
// Funkcja poruszajaca tetrimino w prawo i w lewo
// dodaje do pozycji tetrimino[liczby okreslaja miejsce na planszy] 1 lub -1,
// dzieki temu przesuwa tetrimino w prawo lub w lewo w zaleznosci od wcisnietej strzalki
// nastepnie renderuje klocek w nowej pozycji
function moveHorizontal(tetrimino, wayNum) {
  for (let i = 0; i < tetrimino.variations.length; i++) {
    for (let j = 0; j < 4; j++) {
      tetrimino.variations[i][j] += wayNum;
    }
  }
  renderTetrimino(currentTetrimino);
}
//
// ******************** FUNKCJA E
// case 38 arrow up
// case 40 arrow down
// case 37 arrow left
// case 39 arrow right

document.onkeydown = (e) => {
  switch (e.keyCode) {
    case 38: {
      if (flipKey) {
        flipTetrimino(currentTetrimino);
      }
      break;
    }
    case 40: {
      moveDown(currentTetrimino);
      break;
    }
    case 37: {
      if (leftKey) {
        moveHorizontal(currentTetrimino, -1);
      }
      break;
    }
    case 39: {
      if (rightKey) {
        moveHorizontal(currentTetrimino, 1);
        break;
      }
    }
  }
};


// ******************** FUNKCJA F
// funkcja renderująca nastepne w kolejenosci tetrimino na 
// tablicy wynikow
const scoreBoard = document.querySelectorAll('.previous-grid div');
console.log(scoreBoard)

function renderNextTetriminoOnScoreBoard(nextTetrimino) {
  scoreBoard.forEach((element) => {
    element.classList = "";
    })

  for (let j = 0; j < 4; j++) {
    scoreBoard[nextTetrimino.scoreBoardVariation[j]].classList.add(
      nextTetrimino.blockColor
    );
  }
}

renderNextTetriminoOnScoreBoard(nextTetrimino);


