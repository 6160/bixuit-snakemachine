class Snake {
    constructor(params){
        const startX = Math.floor(params.world.x / 2);
        const startY = Math.floor(params.world.y / 2);
        this.sprite = params.sprite;
        this.body = [createVector(startX, startY)];
        this.xdir = 0;
        this.ydir = 0;
        this.REZ = params.REZ || 10;
        this.world = {
            x: params.world.x,
            y: params.world.y,
        };
        this.alive = true;
    }

    changeDirection(direction) {
        this.xdir = direction.xdir;
        this.ydir = direction.ydir;
    }

    nextPosition() {
        return {
            x: this.body[0].x + this.xdir,
            y: this.body[0].y + this.ydir,
        }
    }

    checkWorldCollision(nextPos) {
        if (nextPos.x >= this.world.x || nextPos.x < 0) return true;
        if (nextPos.y >= this.world.y || nextPos.y < 0) return true;

        return false;
    }
    checkSelfCollision(nextPos) {
        const snakePositions = [];
        this.body.forEach(b => snakePositions.push(`${b.x}-${b.y}`) )

        const nextIndex = `${nextPos.x}-${nextPos.y}`

        if (snakePositions.indexOf(nextIndex) > -1) return true;
        return false;
    }

    update() {
        const nextPos = this.nextPosition();
        const collided = this.checkWorldCollision(nextPos) || this.checkSelfCollision(nextPos);
        if (collided) {
            console.log('DEAD!')
            this.alive = false;
            return;
        }

        this.body.unshift(createVector(nextPos.x, nextPos.y))
        this.body.pop();
    }

    eat(food) {
        const curPos = this.body[0];

        if (food.x === curPos.x && food.y === curPos.y) {
            this.body.unshift(createVector(curPos.x, curPos.y))
            food.eaten(this.body);
        };
        
    }

    show() {
        fill(0);
        this.body.forEach(vector => {
            image(this.sprite, vector.x  * REZ, vector.y  * REZ, REZ, REZ);
        })
    }

    score() {return this.body.length;}


}