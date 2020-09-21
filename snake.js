class Snake {
    constructor(x, y, u, dir) {
        this.segments = [new Vector(x, y)];
        this.u = u;
        this.dir = dir;
        this.nextDir = new Vector();
        this.len = 1;
        this.ns = []; // next segments
        this.dead = false;
    }

    draw() {
        for (var i = 0; i < this.segments.length; i++) {
            let seg = this.segments[i];

            rect(seg.x, seg.y, this.u, this.u);
        }
    }

    update() {
        if (this.segments.length > 1) {
            for (var i = this.segments.length - 1; i > 0; i--) {
                this.segments[i] = this.segments[i - 1].copy();
            }
        }

        this.dir = this.nextDir.copy();

        this.segments[0].add(this.dir);

        if (this.ns.length) {
            let c = 0;
            let check = this.ns[0];

            for (var i = 0; i < this.segments.length - 1; i++) {
                let seg = this.segments[i];

                if (seg.x == check.x && seg.y == check.y) {
                    c++;
                }
            }

            if (c == 0) {
                this.segments.push(this.ns[0]);
                this.ns.shift();
            }
        }

        let head = this.segments[0];
        for (var i = 1; i < this.segments.length; i++) {
            if (head.x == this.segments[i].x && head.y == this.segments[i].y) {
                this.dead = true;
            }
        }

        if (head.x >= WIDTH || head.x < 0 || head.y >= HEIGHT || head.y < 0) {
            this.dead = true;
        }
    }

    ate() {
        let head = this.segments[0];

        if (head.x == food.x && head.y == food.y) {
            this.ns.push(food);
            food = newFood();
        }
    }
}