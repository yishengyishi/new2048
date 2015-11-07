/**
 * Created by airing on 15/10/19.
 */
function startGame(cxt) {
    init(cxt);     //初始化游戏界面UI
    score = 0;
    updateScore(score);
    newBox(cxt);
    newBox(cxt);
}

function newBox(cxt) {

    if (noSpace()){
        return false;
    }
    //随机生成一个位置
    var randx =
        parseInt(Math.floor(Math.random() * 4));
    var randy =
        parseInt(Math.floor(Math.random() * 4));

    var times = 0;
    while (times < 50) {
        if (nums[randx][randy] == 0) {
            break;
        }

        randx =
            parseInt(Math.floor(Math.random() * 4));
        randy =
            parseInt(Math.floor(Math.random() * 4));

        times++
    }

    if (times == 50) {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (nums[i][j] == 0) {
                    randx = i;
                    randy = j;
                }
            }
        }
    }

    var randNumber = Math.random() < 0.5 ? 2 : 4;

    nums[randx][randy] = randNumber;
    drawBox(cxt, randx, randy, randNumber);
    return true;
}

function moveKeyDown() {
    event.preventDefault();
    switch (event.keyCode) {
        case 37: //left
            if (moveLeft()) { //为空或者相等
                newBox(context);
                isGameOver();
            }
            break;
        case 38://up
            if (moveUp()) {
                newBox(context);
                isGameOver();
            }
            break;
        case 39://right
            if (moveRight()) {
                newBox(context);
                isGameOver();
            }
            break;
        case 40://down
            if (moveDown()) {
                newBox(context);
                isGameOver();
            }
            break;
        default :
            break;
    }

}

document.addEventListener('touchstart',function(event){
    startX = event.touches[0].pageX;
    startY = event.touches[0].pageY;
});

document.addEventListener('touchend',function(event){
    endX = event.changedTouches[0].pageX;
    endY = event.changedTouches[0].pageY;

    var daltaX = endX - startX;
    var daltaY = endY - startY;


    if(Math.abs(daltaX) < 0.2 * documentWidth && Math.abs(daltaY) < 0.2 * documentWidth)
        return false;
    else
    {
        if (daltaY<0) {
            if (daltaX > 0) {
                if (moveUp()) {
                    newBox(context);
                    isGameOver();
                }
            }
            if(daltaX < 0){
                if (moveLeft()) {
                    newBox(context);
                    isGameOver();
                }
            }
        }
        if (daltaY>0) {
            if (daltaX > 0) {
                if (moveRight()) {
                    newBox(context);
                    isGameOver();
                }
            }
            if(daltaX < 0){
                if (moveDown()) {
                    newBox(context);
                    isGameOver();
                }
            }
        }
    }
    //任务1：实现移动端触摸逻辑
});

function moveLeft() {
    if (!canMoveLeft()) {
        return false;
    }

    for (var j = 0; j < 4; j++) {
        for (var i = 1; i < 4; i++) {
            if (nums[i][j] != 0) {
                for (var k = 0; k < i; k++) {
                    if (nums[k][j] == 0) {
                        nums[k][j] = nums[i][j];
                        nums[i][j] = 0
                    }
                    else if (nums[k][j] == nums[i][j] && noBlockHorizontal(j, k, i, nums)) {
                        nums[k][j] += nums[k][j];
                        nums[i][j] = 0;
                        score = score + nums[k][j];
                        updateScore(score);
                    }
                }
            }
        }
    }
    updateBoardView(context);
    return true;
}

function canMoveLeft() {
    for (var j = 0; j < 4; j++) {
        for (var i = 1; i < 4; i++) {
            if (nums[i][j] != 0) {
                if (nums[i - 1][j] == 0 || nums[i - 1][j] == nums[i][j]) {
                    return true;
                }

            }
        }
    }
    return false;
}

function moveUp() {
    //任务2：实现“上”逻辑
    if (!canMoveUp()) {
        return false;
    }

    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (nums[i][j] != 0) {
                for (var k = 0; k < j; k++) {
                    if (nums[i][k] == 0) {
                        nums[i][k] = nums[i][j];
                        nums[i][j] = 0
                    }
                    else if (nums[i][k] == nums[i][j] && noBlockVertical(i, k, j, nums)) {
                        nums[i][k] += nums[i][k];
                        nums[i][j] = 0;
                        score = score + nums[i][k];
                        updateScore(score);
                    }
                }
            }
        }
    }
    updateBoardView(context);
    return true;
}

function canMoveUp() {
    //任务3：实现判断是否可以向上的逻辑
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (nums[i][j] != 0) {
                if (nums[i][j-1] == 0 || nums[i][j-1] == nums[i][j]) {
                    return true;
                }

            }
        }
    }
    return false;
}

function moveRight() {
    //任务4：实现“右”逻辑
    if (!canMoveRight()) {
        return false;
    }

    for (var j = 0; j < 4; j++) {
        for (var i = 2; i >= 0; i--) {
            if (nums[i][j] != 0) {
                for (var k = 3; k > i; k--) {
                    if (nums[k][j] == 0) {
                        nums[k][j] = nums[i][j];
                        nums[i][j] = 0
                    }
                    else if (nums[k][j] == nums[i][j] && noBlockHorizontal(j, i, k, nums)) {
                        nums[k][j] += nums[k][j];
                        nums[i][j] = 0;
                        score = score + nums[k][j];
                        updateScore(score);
                    }
                }
            }
        }
    }
    updateBoardView(context);
    return true;

}

function canMoveRight() {
    //任务5：实现判断是否可以向右的逻辑
    for (var j = 0; j < 4; j++) {
        for (var i = 2; i >=0; i--) {
            if (nums[i][j] != 0) {
                if (nums[i + 1][j] == 0 || nums[i + 1][j] == nums[i][j]) {
                    return true;
                }

            }
        }
    }
    return false;
}

function moveDown() {
    //任务6：实现“下”逻辑
    if (!canMoveDown()) {
        return false;
    }

    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (nums[i][j] != 0) {
                for (var k = 3; k > j; k--) {
                    if (nums[i][k] == 0) {
                        nums[i][k] = nums[i][j];
                        nums[i][j] = 0
                    }
                    else if (nums[i][k] == nums[i][j] && noBlockVertical(i, j, k, nums)) {
                        nums[i][k] += nums[i][k];
                        nums[i][j] = 0;
                        score = score + nums[i][k];
                        updateScore(score);
                    }
                }
            }
        }
    }
    updateBoardView(context);
    return true;
}

function canMoveDown() {
    //任务7：实现判断是否可以向下的逻辑
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >=0; j--) {
            if (nums[i][j] != 0) {
                if (nums[i][j+1] == 0 || nums[i][j+1] == nums[i][j]) {
                    return true;
                }

            }
        }
    }
    return false;
}

function noBlockVertical(col, row1, row2, nums) {
    //任务8：实现判断垂直方向上是否有障碍物
    for (var i = row1 + 1; i < row2; i++) {
        if (nums[col][i] != 0) {
            return false;
        }
    }
    return true;
}
function noBlockHorizontal(row, col1, col2, nums) {
    for (var i = col1 + 1; i < col2; i++) {
        if (nums[i][row] != 0) {
            return false;
        }
    }
    return true;
}

function updateScore(score){
    document.getElementById("score").innerText = score;
}

function noSpace() {
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++)
            if (nums[i][j] == 0)
                return false;

    return true;
}
function noMove() {
    if (canMoveLeft() ||
        canMoveRight() ||
        canMoveUp() ||
        canMoveDown())
        return false;

    return true;
}
function isGameOver(){
    if(noMove() && noSpace()){
        alert("GameOver! Score:" + score);
        return true;
    }
    return false;
}
