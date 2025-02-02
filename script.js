// 获取 canvas 元素和上下文
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// 定义游戏变量
let snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let direction = "right";
let score = 0;

// 定义游戏循环
function gameLoop() {
    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 移动蛇
    let head = { x: snake[0].x, y: snake[0].y };
    if (direction === "right") head.x++;
    else if (direction === "left") head.x--;
    else if (direction === "up") head.y--;
    else if (direction === "down") head.y++;

    // 检测碰撞
    if (head.x < 0 || head.x >= canvas.width / 10 || head.y < 0 || head.y >= canvas.height / 10 || snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        alert("游戏结束！你的得分是：" + score);
        document.location.reload();
    }

    // 添加新的蛇头
    snake.unshift(head);

    // 检测是否吃到食物
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = { x: Math.floor(Math.random() * (canvas.width / 10)), y: Math.floor(Math.random() * (canvas.height / 10)) };
    } else {
        // 移除蛇尾
        snake.pop();
    }

    // 绘制蛇
    ctx.fillStyle = "green";
    snake.forEach(segment => ctx.fillRect(segment.x * 10, segment.y * 10, 10, 10));

    // 绘制食物
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * 10, food.y * 10, 10, 10);

    // 显示得分
    ctx.fillStyle = "black";
    ctx.fillText("得分: " + score, 10, 20);

    // 设置游戏速度
    setTimeout(gameLoop, 100);
}

// 监听键盘事件
document.addEventListener("keydown", event => {
    if (event.key === "ArrowRight" && direction !== "left") direction = "right";
    else if (event.key === "ArrowLeft" && direction !== "right") direction = "left";
    else if (event.key === "ArrowUp" && direction !== "down") direction = "up";
    else if (event.key === "ArrowDown" && direction !== "up") direction = "down";
});

// 开始游戏
gameLoop();