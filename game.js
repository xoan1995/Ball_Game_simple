let canvas = document.getElementById('game');

let context = canvas.getContext('2d');
function drawScore(){
    context.beginPath();
    context.font = "30px Arial";
    context.fillStyle="White";
    context.fillText("Score: "+myScore, 100, 50);
    context.closePath();
}

function drawBackGround(){
    let img=document.getElementById("img");
    context.beginPath();
    context.drawImage(img,0,0,canvas.width,canvas.height);
    context.closePath();
}

let ball = {
    x: 100,//100
    y: 400,//400
    dx: 3,
    dy: 2,
    radius: 10,
};
let thanhChan = {
    width: 100,
    height: 10,
    x: 100,
    y: canvas.height - 10,
    speed: 7,

    diChuyenSangTrai: false,
    diChuyenSangPhai: false
};
let gameOver = false;
let luuGiaTriCacVienGach = {
    offsetX: 1,
    offsetY: 1,
    margin: 0.2,
    width: 50,
    height: 20,
    totalRow: 17,
    totalCol: 20
};
let array = [];
for (let i = 0; i < luuGiaTriCacVienGach.totalRow; i++) {
    for (let j = 0; j < luuGiaTriCacVienGach.totalCol; j++) {
        array.push({
            x: luuGiaTriCacVienGach.offsetX + j * (luuGiaTriCacVienGach.width + luuGiaTriCacVienGach.margin),

            y: luuGiaTriCacVienGach.offsetY + i * (luuGiaTriCacVienGach.height + luuGiaTriCacVienGach.margin),
            isBroken: false
        });
    }
}


document.addEventListener('keyup', function (event) {
    if (event.keyCode == 37) {
        thanhChan.diChuyenSangTrai = false;
    } else if (event.keyCode == 39) {
        thanhChan.diChuyenSangPhai = false;
    }
});
document.addEventListener('keydown', function (event) {
    if (event.keyCode == 37) {
        thanhChan.diChuyenSangTrai = true;
    } else if (event.keyCode == 39) {
        thanhChan.diChuyenSangPhai = true;
    }
});

function veNhieuGach() {
    array.forEach(function (b) {
        if(!b.isBroken){
            context.beginPath();
            context.rect(b.x, b.y, luuGiaTriCacVienGach.width, luuGiaTriCacVienGach.height);
            context.fillStyle = "#ff3805";
            context.fill();
            context.closePath();
        }


    });
}

function drawBall() {
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    context.fillStyle = "green";
    context.fill();
    context.closePath();
}


function veThanhChan() {
    context.beginPath();
    context.rect(thanhChan.x, thanhChan.y, thanhChan.width, thanhChan.height);
    context.fill();
    context.closePath();
}

function xuLyVaCham() {
    if (ball.x < ball.radius || ball.x > canvas.width - ball.radius) {
        ball.dx = -ball.dx;
    }
    if (ball.y < ball.radius || ball.y > canvas.height - ball.radius) {
        ball.dy = -ball.dy;
    }
}


function bongVaChamVoiThanhChan() {
    if (ball.x + ball.radius >= thanhChan.x && ball.x + ball.radius <= thanhChan.x + thanhChan.width &&
        ball.y + ball.radius >= canvas.height - thanhChan.height) {
        ball.dy = -ball.dy;
    }
}
let myScore=0;
function bongVaChamGach() {
    array.forEach(function (b) {
        if (!b.isBroken) {
            if (ball.x >= b.x && ball.x <= b.x + luuGiaTriCacVienGach.width &&
                ball.y + ball.radius >= b.y && ball.y - ball.radius <= b.y + luuGiaTriCacVienGach.height) {
                ball.dy = -ball.dy;
                ball.dy+1;
                b.isBroken = true;
                let sound = new Audio();
                sound.src = "bricks-drop.mp3";
                sound.volume=1;
                sound.play();
                myScore++;
            }
        }
    });
}

function toaDoBong() {
    ball.x += ball.dx;
    ball.y += ball.dy;
}
// function clearmove() {
//   thanhChan.speedX = 0;
//     thanhChan.speedY = 0;
// }
function moveleft() {
        thanhChan.diChuyenSangTrai = true;
}
function clearMoveLeft() {
    thanhChan.diChuyenSangTrai = false;
}
function moveright() {
    thanhChan.diChuyenSangPhai = true;
}
function clearMoveRight() {
    thanhChan.diChuyenSangPhai = false;
}
function updateThanhChan() {
    if (thanhChan.diChuyenSangTrai) {
        thanhChan.x -= thanhChan.speed;
    } else if (thanhChan.diChuyenSangPhai) {
        thanhChan.x += thanhChan.speed;
    }
    if (thanhChan.x < 0) {
        thanhChan.x = 0;
    } else if (thanhChan.x > canvas.width - thanhChan.width) {
        thanhChan.x = canvas.width - thanhChan.width;
    }

}

function checkGameOver() {
    if (ball.y > canvas.height - ball.radius) {
        gameOver = true;
    }
}

function showGameOver() {
    alert("GAME OVER");
}
function showWin() {
    if(myScore>=630){
        alert("YOU WIN");
    }
}
drawBackGround();
veNhieuGach();
drawBall();
veThanhChan();
drawScore();
function draw() {
    if (!gameOver) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        //ve bong
        drawBackGround();
        veNhieuGach();
        drawBall();
        veThanhChan();
        updateThanhChan();
        xuLyVaCham();
        toaDoBong();
        bongVaChamGach();
        drawScore();
        showWin();
        bongVaChamVoiThanhChan();
        checkGameOver();
        requestAnimationFrame(draw);

    } else {
        showGameOver();
    }
}


