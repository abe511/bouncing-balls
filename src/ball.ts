export class Ball {
  private x: number;
  private y: number;
  private radius: number = 20;
  private color: string = this.getRandomColor();
  private mass: number = 1;
  private restitution: number = 0.9; // Coefficient of restitution (elasticity)
  private damping: number = 0.99; // Damping to gradually slow down the ball
  private gravity: number = 0.2; // Gravity acceleration
  private vx: number = (Math.random() - 0.5) * 2; // Initial velocity along the x-axis
  private vy: number = (Math.random() - 0.5) * 2; // Initial velocity along the y-axis
  private restThreshold: number = 0.1; // Threshold below which the ball is considered at rest

  constructor(x: number, y: number, gravity: number, restitution: number, damping: number) {
    this.x = x;
    this.y = y;
    this.gravity = gravity;
    this.restitution = restitution;
    this.damping = damping;
  }

  private getRandomColor(): string {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  reset(canvasWidth: number, canvasHeight: number) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.vx = (Math.random() - 0.5) * 2;
    this.vy = (Math.random() - 0.5) * 2;
  }

  setGravity(value: number) {
    this.gravity = value;
  }

  setRestitution(value: number) {
    this.restitution = value;
  }

  setDamping(value: number) {
    this.damping = value;
  }


  update(canvasWidth: number, canvasHeight: number, balls: Ball[]) {
    // Update velocity due to gravity
    this.vy += this.gravity;

    // Update position
    this.x += this.vx;
    this.y += this.vy;

    // Bounce off the walls with elastic collisions
    if (this.x + this.radius > canvasWidth) { // Right wall
      this.x = canvasWidth - this.radius;
      this.vx = -this.vx * this.restitution;
    } else if (this.x - this.radius < 0) { // Left wall
      this.x = this.radius;
      this.vx = -this.vx * this.restitution;
    }

    // Bounce off the floor with elastic collision
    if (this.y + this.radius > canvasHeight) {
      this.y = canvasHeight - this.radius;
      this.vy = -this.vy * this.restitution;
    }

    // Prevent penetration and bounce off other balls
    for (const otherBall of balls) {
      if (otherBall !== this) {
        const dx = otherBall.x - this.x;
        const dy = otherBall.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDistance = this.radius + otherBall.radius;

        if (distance < minDistance) {
          // Collision detected, adjust positions to prevent penetration

          const overlap = minDistance - distance;
          const overlapX = (overlap * dx) / distance;
          const overlapY = (overlap * dy) / distance;

          this.x -= overlapX / 2;
          this.y -= overlapY / 2;
          otherBall.x += overlapX / 2;
          otherBall.y += overlapY / 2;

          // Adjust velocities based on realistic physics
          const nx = dx / distance;
          const ny = dy / distance;
          const relativeVelocityX = otherBall.vx - this.vx;
          const relativeVelocityY = otherBall.vy - this.vy;
          const dotProduct = nx * relativeVelocityX + ny * relativeVelocityY;

          const impulse = (2 * dotProduct) / (this.mass + otherBall.mass);

          this.vx += impulse * otherBall.mass * nx;
          this.vy += impulse * otherBall.mass * ny;
          otherBall.vx -= impulse * this.mass * nx;
          otherBall.vy -= impulse * this.mass * ny;
        }
      }
    }

    // Apply damping to gradually slow down the ball
    this.vx *= this.damping;
    this.vy *= this.damping;

    // Check if the ball is at rest
    if (Math.abs(this.vx) < this.restThreshold) {
      this.vx = 0;
    }

    if (Math.abs(this.vy) < this.restThreshold) {
      this.vy = 0;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}