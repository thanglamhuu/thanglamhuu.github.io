const bird = document.getElementById('bird');
const pipe1 = document.getElementById('pipe1');
const pipe2 = document.getElementById('pipe2');

let birdTop = 200;
let birdLeft = 50;
let gravity = 2;
let isGameOver = false;

function jump() {
    if (birdTop > 20) {
        birdTop -= 20;
    }
}

function gameLoop() {
    if (!isGameOver) {
        birdTop += gravity;
        bird.style.top = birdTop + 'px';
        checkCollision();
        movePipes();
        requestAnimationFrame(gameLoop);
    }
}

function movePipes() {
    const pipeSpeed = 5;
    let pipeLeft1 = parseInt(window.getComputedStyle(pipe1).getPropertyValue('left'));
    let pipeLeft2 = parseInt(window.getComputedStyle(pipe2).getPropertyValue('left'));

    if (pipeLeft1 <= -60) {
        pipeLeft1 = 400;
    }
    if (pipeLeft2 <= -60) {
        pipeLeft2 = 400;
    }

    pipeLeft1 -= pipeSpeed;
    pipeLeft2 -= pipeSpeed;

    pipe1.style.left = pipeLeft1 + 'px';
    pipe2.style.left = pipeLeft2 + 'px';
}

function checkCollision() {
    const birdRect = bird.getBoundingClientRect();
    const pipe1Rect = pipe1.getBoundingClientRect();
    const pipe2Rect = pipe2.getBoundingClientRect();

    if (
        birdRect.bottom >= window.innerHeight ||
        birdRect.top <= 0 ||
        (birdRect.right >= pipe1Rect.left && birdRect.left <= pipe1Rect.right && birdRect.bottom >= pipe1Rect.top) ||
        (birdRect.right >= pipe2Rect.left && birdRect.left <= pipe2Rect.right && birdRect.bottom >= pipe2Rect.top)
    ) {
        gameOver();
    }
}

function gameOver() {
    isGameOver = true;
    alert('Game Over! Điểm của bạn: ' + birdTop);
    window.location.reload(); // Tạm thời làm mới trang sau khi kết thúc game
}

document.addEventListener('keydown', jump);
gameLoop();
