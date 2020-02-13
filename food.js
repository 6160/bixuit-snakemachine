class Food {
    constructor(params) {
        this.defaultPositions = params.defaultPositions;
        this.availablePositions = JSON.parse(JSON.stringify(params.defaultPositions)) ;
        this.sprite = params.sprite;
        this.x = 0;
        this.y = 0;
        this.REZ = params.REZ;
        this.W_GRID = params.W_GRID;
        this.H_GRID = params.H_GRID;
        this.newPosition([{ x: 0, y: 0 }]);
    }

    show() {
        noStroke();
        fill(255, 0, 0);
        image(this.sprite, this.x * REZ, this.y * REZ, REZ, REZ);
    }

    generatePosition(body) {
        this.availablePositions = JSON.parse(JSON.stringify(this.defaultPositions));
        
        body.forEach(b => {
            const index = `${b.x}-${b.y}`;
            delete this.availablePositions[index];
        });

        const arrayPositions = Object.values(this.availablePositions)
        const randomIndex = Math.floor((Math.random() * arrayPositions.length))
        return arrayPositions[randomIndex];

    }

    newPosition(body) {
        let position = this.generatePosition(body);

        this.x = position.x;
        this.y = position.y;
    }

    eaten(body) { return this.newPosition(body); }

}