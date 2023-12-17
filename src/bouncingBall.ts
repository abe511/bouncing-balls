import { Ball } from "./ball.js";


export class BouncingBall {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private balls: Ball[] = [];

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.canvas.addEventListener("click", this.handleCanvasClick.bind(this));
    this.animate();
  }

  private handleCanvasClick(event: MouseEvent) {
    const x = event.clientX - this.canvas.offsetLeft;
    const y = event.clientY - this.canvas.offsetTop;
    const gravityValue = parseFloat((document.getElementById("gravity") as HTMLInputElement).value);
    const restitutionValue = parseFloat((document.getElementById("restitution") as HTMLInputElement).value);
    const dampingValue = parseFloat((document.getElementById("damping") as HTMLInputElement).value);
    const ball = new Ball(x, y, gravityValue, restitutionValue, dampingValue);
    this.balls.push(ball);
  }

  private animate() {
    requestAnimationFrame(() => this.animate());

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (const ball of this.balls) {
      ball.update(this.canvas.width, this.canvas.height, this.balls);
      ball.draw(this.ctx);
    }
  }

  getBalls(): Ball[] {
    return this.balls;
  }
  clearBalls() {
    this.balls = [];
  }
}
