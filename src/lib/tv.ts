function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export class VCREffect {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    config: {
        fps: number;
        blur: number;
        opacity: number;
        miny: number;
        miny2: number;
        num: number;
    };
    vcrInterval: number | undefined;

    constructor(canvas: HTMLCanvasElement, options: Partial<{
        fps: number;
        blur: number;
        opacity: number;
        miny: number;
        miny2: number;
        num: number;
    }> = {}) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")!;
        this.config = Object.assign({
            fps: 60,
            blur: 1,
            opacity: 1,
            miny: 220,
            miny2: 220,
            num: 70
        }, options);

        this.init();
    }

    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.canvas.style.position = "absolute";
        this.canvas.style.top = "0";
        this.canvas.style.left = "0";
        this.canvas.style.opacity = this.config.opacity.toString();

        this.generateVCRNoise();
        window.addEventListener("resize", () => this.onResize());
    }

    onResize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    generateVCRNoise() {
        if (this.config.fps >= 60) {
            if (this.vcrInterval) cancelAnimationFrame(this.vcrInterval);
            const animate = () => {
                this.renderTrackingNoise();
                this.vcrInterval = requestAnimationFrame(animate);
            };
            animate();
        } else {
            if (this.vcrInterval) clearInterval(this.vcrInterval);
            this.vcrInterval = window.setInterval(() => {
                this.renderTrackingNoise();
            }, 1000 / this.config.fps);
        }
    }

    renderTrackingNoise(radius = 2) {
        const { canvas, ctx, config } = this;
        let { miny, miny2 } = config;
        const { num } = config;

        canvas.style.filter = `blur(${config.blur}px)`;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = `#fff`;

        ctx.beginPath();
        for (let i = 0; i <= num; i++) {
            const x = Math.random() * canvas.width;
            const y1 = getRandomInt(miny += 3, canvas.height);
            const y2 = getRandomInt(0, miny2 -= 3);
            ctx.fillRect(x, y1, radius, radius);
            ctx.fillRect(x, y2, radius, radius);
            ctx.fill();

            this.renderTail(ctx, x, y1, radius);
            this.renderTail(ctx, x, y2, radius);
        }
        ctx.closePath();
    }

    renderTail(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number) {
        const n = getRandomInt(1, 50);
        const dirs = [1, -1];
        const dir = dirs[Math.floor(Math.random() * dirs.length)];

        for (let i = 0; i < n; i++) {
            const r = getRandomInt(radius - 0.01, radius);
            const dx = getRandomInt(1, 4) * dir;
            radius -= 0.1;
            ctx.fillRect((x += dx), y, r, r);
            ctx.fill();
        }
    }
}
