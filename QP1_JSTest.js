//variables
let gameState = 'start';
let paddle_1 = document.querySelector('.paddle_1');
let paddle_2 = document.querySelector('.paddle_2');
let board = document.querySelector('.board');
let initial_ball = document.querySelector('.ball');
let ball = document.querySelector('.ball');
let score = Math.random()*100;
let max = 500;
let min = 1;
let score_1 = document.querySelector('.player_1_score');
let score_2 = document.querySelector('.player_2_score');
let message = document.querySelector('.message');
let victory = document.querySelector('.victory');
let link1 = document.querySelector('.link1');
let link2 = document.querySelector('.link2');
let end = document.querySelector('.end');
let paddle_1_coord = paddle_1.getBoundingClientRect();
let paddle_2_coord = paddle_2.getBoundingClientRect();
let initial_ball_coord = ball.getBoundingClientRect();
let ball_coord = initial_ball_coord;
let board_coord = board.getBoundingClientRect();
let paddle_common = 
    document.querySelector('.paddle').getBoundingClientRect();
let loss = Math.floor(Math.random() * (max - min + 1) ) + min;
//engine  
let dx = Math.floor(Math.random() * 4) + 3;
let dy = Math.floor(Math.random() * 4) + 3;
let dxd = Math.floor(Math.random() * 2);
let dyd = Math.floor(Math.random() * 2);
//user input(s)  
document.addEventListener('keydown', (e) => {
  if (e.key == 'Enter') {
    gameState = gameState == 'start' ? 'play' : 'start';
    if (gameState == 'play') {
      message.innerHTML = 'Game Started';
      message.style.left = 'vw';
      requestAnimationFrame(() => {
        dx = Math.floor(Math.random() * 4) + 3;
        dy = Math.floor(Math.random() * 4) + 3;
        dxd = Math.floor(Math.random() * 2);
        dyd = Math.floor(Math.random() * 2);
        moveBall(dx, dy, dxd, dyd);
      });
    }
  }
  if (gameState == 'play') {
    if (e.key == 'w') {
      paddle_1.style.top =
        Math.max(
          board_coord.top,
          paddle_1_coord.top - window.innerHeight * 0.06
        ) + 'px';
      paddle_1_coord = paddle_1.getBoundingClientRect();
    }
    if (e.key == 's') {
      paddle_1.style.top =
        Math.min(
          board_coord.bottom - paddle_common.height,
          paddle_1_coord.top + window.innerHeight * 0.06
        ) + 'px';
      paddle_1_coord = paddle_1.getBoundingClientRect();
    }
  
    if (e.key == 'ArrowUp') {
      paddle_2.style.top =
        Math.max(
          board_coord.top,
          paddle_2_coord.top - window.innerHeight * 0.1
        ) + 'px';
      paddle_2_coord = paddle_2.getBoundingClientRect();
    }
    if (e.key == 'ArrowDown') {
      paddle_2.style.top =
        Math.min(
          board_coord.bottom - paddle_common.height,
          paddle_2_coord.top + window.innerHeight * 0.1
        ) + 'px';
      paddle_2_coord = paddle_2.getBoundingClientRect();
    }
  }
});
//first ball movement
function moveBall(dx, dy, dxd, dyd) {
  if (ball_coord.top <= board_coord.top) {
    dyd = 1;
  }
  if (ball_coord.bottom >= board_coord.bottom) {
    dyd = 0;
  }
  if (
    ball_coord.left <= paddle_1_coord.right &&
    ball_coord.top >= paddle_1_coord.top &&
    ball_coord.bottom <= paddle_1_coord.bottom
  ) {
    dxd = 1;
    dx = Math.floor(Math.random() * 4) + 3;
    dy = Math.floor(Math.random() * 4) + 3;
  }
  if (
    ball_coord.right >= paddle_2_coord.left &&
    ball_coord.top >= paddle_2_coord.top &&
    ball_coord.bottom <= paddle_2_coord.bottom
  ) {
    dxd = 0;
    dx = Math.floor(Math.random() * 4) + 3;
    dy = Math.floor(Math.random() * 4) + 3;
  }
  if (
    ball_coord.left <= board_coord.left ||
    ball_coord.right >= board_coord.right
  ) {
    if (ball_coord.left <= board_coord.left) {
      let loss = Math.floor(Math.random() * (max - min + 1) ) + min;
        score_1.innerHTML = +score_1.innerHTML - loss;
        if (score_1.innerHTML <= 0){
            end.innerHTML = 'Player 2 Has Won!'
            victory.style.opacity = 1;
            link1.style.pointerEvents = 'visibleFill';
            link2.style.pointerEvents = 'visibleFill';
        }
    } else {
      let loss = Math.floor(Math.random() * (max - min + 1) ) + min;
        score_2.innerHTML = +score_2.innerHTML - loss;
        if (score_2.innerHTML <= 0){
            end.innerHTML = 'Player 1 Has Won!'
            victory.style.opacity = 1;
            link1.style.pointerEvents = 'visibleFill';
            link2.style.pointerEvents = 'visibleFill';
        }
    }

    gameState = 'start';
    
    
    ball_coord = initial_ball_coord;
    ball.style = initial_ball.style;
    initial_ball.style.height = loss/5 + 'px';
    initial_ball.style.width = loss/5 + 'px';
    message.innerHTML = 'Press Enter <br>to Start';
    message.style.left = 'vw';
    return;
  }
  //movement code
  ball.style.top = ball_coord.top + dy * (dyd == 0 ? -1 : 1) + 'px';
  ball.style.left = ball_coord.left + dx * (dxd == 0 ? -1 : 1) + 'px';
  ball_coord = ball.getBoundingClientRect();
  requestAnimationFrame(() => {
    moveBall(dx, dy, dxd, dyd);
  });
}
