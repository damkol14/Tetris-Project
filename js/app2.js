//
// <<<<<<<<<<<<<<<<<<<<<<<<<  3. FUNKCJE GLOWNYCH MECHANIK >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//
//
//
// 
// jezli klocek w danym ruchu jest przytwierdzany do podloza zmienna przyjmuje wartosc false i
//  automatycznie stopuje (w tym ruchu) poruszanie sie tetrimino w dol(uzyte w funkcji game())
let gameContinue;

// zmienna ktora umozliwia zatrzymywanie gry przy pomocy przycisku start/pause
let pause = true;



// ******************** FUNKCJA A
// Funkcja dodaje tetrimino do podloza
// zmienna do ktorej przypisana jest pozycja tetrimino w danym momencie
let tetriminoPosition;

function addTetriminoBottom(tetrimino) {
  gameContinue = true;
  tetriminoPosition = tetrimino.variations[flipTetriminoNum];
  if (
    board[tetriminoPosition[0]].classList.contains("attach") ||
    board[tetriminoPosition[1]].classList.contains("attach") ||
    board[tetriminoPosition[2]].classList.contains("attach") ||
    board[tetriminoPosition[3]].classList.contains("attach")
  ) {
    for (let i = 0; i < 4; i++) {
      board[tetriminoPosition[i]].classList.add("blockGround");
      board[tetriminoPosition[i] - 10].classList.add("attach");
    }
    gameContinue = false;
    newMove();
  }
}

//
// ******************** FUNKCJA B
let chooseTetriminoNum;
let tetriminoArr;
function chooseTetrimino() {
  number = Math.floor(Math.random() * 7);
  tetriminoArr = [
    iTetrimino,
    tTetrimino,
    oTetrimino,
    lTetrimino,
    jTetrimino,
    sTetrimino,
    zTetrimino,
  ];
  return tetriminoArr[number];
}
//
// ******************** FUNKCJA C
function newMove() {
  currentTetrimino = nextTetrimino;
  nextTetrimino = JSON.parse(JSON.stringify(chooseTetrimino()));
  renderNextTetriminoOnScoreBoard(nextTetrimino);
  flipTetriminoNum = 0;
}

function game() {
  setInterval(() => {
    if (gameContinue && !pause) {
      moveDown(currentTetrimino);
    }
  }, 2000);
}
game();
setInterval(() => {
  addTetriminoBottom(currentTetrimino);
  clearCompletedRow();
  tetriminoOnEdge();
  gameOver();
}, 10);
//
//
// ******************** FUNKCJA D
// Sprawdza czy ktorys z rzedow jest caly ulozony jezeli tak usuwa go
//  i przesuwa wszystkie ulozone wyzej tetrimino o jeden poziom nizej
//
// objasnienia zmiennych:
let checkNum;
// jezeli zmienna osiagnie 10 znaczy ze ten rzad jest caly ulozony
// 
let resetNum;
// dzieki tej zmiennej kazdy rzad sprawdzany jest oddzielnie
// 
let blockGroundelements;
// do tej zmiennej przypisane beda wszystkie pola ktore maja klase 'blockGround'(tetrimino zostalo juz w tym miejscu przyczepione)
// 
let fromWhichRow;
// zmienna dzieki ktorej jak np wyczyscimy czwarty rzad to o poziom nizej przesuwaja sie tylko te tetrimino ulozone wyzej

let score = 0;
let lineScore = 0;

function clearCompletedRow() {
  blockGroundelements = [];
  checkNum = 0;
  resetNum = 0;
  // glowny opis funkcji:
  // iteruje po wszystkich polach planszy(20 rzedow po 10 elementow) poza ostatnim rzedem(rzad 21 dol planszy niezmienny(board.length -10))
  // sprawdza kazdy rzad odzielnie(dzieki zmiennej resetNum, ktora zeruje siebie i checkNum, jezeli sama osiagnie 10)
  // jezeli checkNum w danym rzedzie osiagnie 10 znaczy ze caly rzad jest ulozony (kazdy element zawiera klase "blockGround")
  // wtedy uruchamiana jest glowna funkcjonalnosc
  for (let i = 0; i < board.length - 10; i++) {
    if (resetNum == 10) {
      checkNum = 0;
      resetNum = 0;
    }
    resetNum++;
    if (board[i].classList.contains("blockGround")) {
      checkNum++;
      // *** glowna funkcjonalnosc
      if (checkNum == 10) {
        // jezeli ktorys rzad jest ulozony dodaje i wystwietla punkty
        score += 10;
        lineScore += 1;
        document.querySelector(".score-display").textContent = score;
        document.querySelector(".lines-score").textContent = lineScore;
        // "i" przypisane do zmiennej oznacza ostatni element ulozonego rzedu
        // dzieki temu bedziemy mogli przesunac tylko rzedy znajdujace sie nad
        fromWhichRow = i;
        // czysci ulozony rzad ze wszystkich klas(glownie chodzi o blockGround)(w rzedzie znajduje sie 10 elementow)
        for (let j = 0; j < 10; j++) {
          board[i - j].classList = "";
        }
        // iteruje po calej planszy (poza ostatnim rzedem dol planszy)
        // dodaje do tablicy nr pozycji(na planszy) elementu jezeli zawiera klase blockGround
        // tworzy tablice z pozycjami wszystkich przytwierdzonych tetrimino
        for (let k = 0; k < board.length - 10; k++) {
          if (board[k].classList.contains("blockGround")) {
            blockGroundelements.push(k);
          }
          // usuwa klase ze wszystkich elementow powyzej rzedu ktory zostal ulozony w calosci
          if (k <= fromWhichRow - 10) {
            board[k].classList = "";
          }
        }
        // przesuwa bloki przytwierdzone o jeden rzad nizej
        // i dodaje klase attach powyzej nich (klasa attach uzyta jest w funkcji addTetriminoBottom )
        for (let l = 0; l < blockGroundelements.length; l++) {
          board[blockGroundelements[l] + 10].classList.add("blockGround");
          board[blockGroundelements[l]].classList.add("attach");
        }
        // dodaje klase attach do najnizszego rzedu planszy jezeli poprzednia petla go nie dodala
        for (let m = 190; m < 200; m++) {
          if (!board[m].classList.contains("attach")) {
            board[m].classList.add("attach");
          }
        }
        // dodaje klase attach w miejscu usunietego rzedu  jezeli jej tam nie ma
        // klasa attach musi byc dodana w miejscach do ktorych maja sie przyczepiac kolejne tetrimino
        for (let n = 0; n < 10; n++) {
          if (!board[n].classList.contains("attach")) {
            board[i - n].classList.add("attach");
          }
        }
      }
    }
  }
}

// ******************** FUNKCJA E
// uniemozliwa wyjscie poza krawedz planszy 
// przy krawedzi nie dziala przycisk lewo, prawo, obroc tetrimino
let currentTetriminospace;
let leftKey = true;
let rightKey = true;
let flipKey = true;
function tetriminoOnEdge() {
  for (let i = 0; i < 4; i++) {
    if (
      board[currentTetrimino.variations[flipTetriminoNum][i]].id == "leftEdge"
    ) {
      leftKey = false;
      flipKey = false;
      return;
    }
    if (
      board[currentTetrimino.variations[flipTetriminoNum][i]].id == "rightEdge"
    ) {
      rightKey = false;
      flipKey = false;
      return;
    } else {
      leftKey = true;
      rightKey = true;
      flipKey = true;
    }
  }
}

// ******************** FUNKCJA F
function gameOver() {
  for (let i = 10; i < 20; i++) {
    if (board[i].classList.contains("blockGround")) {
      alert("GAMEOVER!");
      window.location.reload();
    }
  }
}


// Pause button
const pauseBtn = document.querySelector('.pause');

pauseBtn.addEventListener('click', () => {
 !pause ? pause = true : pause = false;
})