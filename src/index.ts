import { BouncingBall } from "./bouncingBall.js";


document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("bouncingBallCanvas") as HTMLCanvasElement;

  if (!canvas) {
    console.error("Canvas element not found");
    return;
  }

  const bouncingBall = new BouncingBall(canvas);

  // Add event listeners for UI controls
  const gravityInput = document.getElementById("gravity") as HTMLInputElement;
  const restitutionInput = document.getElementById("restitution") as HTMLInputElement;
  const dampingInput = document.getElementById("damping") as HTMLInputElement;
  const resetDefaultsButton = document.getElementById("resetDefaults") as HTMLButtonElement;
  const clearBallsButton = document.getElementById("clearBalls") as HTMLButtonElement;

  gravityInput.addEventListener("input", () => {
    bouncingBall.getBalls().forEach(ball => {
      ball.setGravity(parseFloat(gravityInput.value));
    });
  });


  restitutionInput.addEventListener("input", () => {
    bouncingBall.getBalls().forEach(ball => {
      ball.setRestitution(parseFloat(restitutionInput.value));

    });
  });

  dampingInput.addEventListener("input", () => {
    bouncingBall.getBalls().forEach(ball => {
      ball.setDamping(parseFloat(dampingInput.value));
    });
  });

  resetDefaultsButton.addEventListener("click", () => {
    // Reset UI sliders to default values
    gravityInput.value = "0.2";
    restitutionInput.value = "0.9";
    dampingInput.value = "0.99";

    // Apply the default values to the existing balls
    bouncingBall.getBalls().forEach(ball => {
      ball.setGravity(parseFloat(gravityInput.value));
      ball.setRestitution(parseFloat(restitutionInput.value));
      ball.setDamping(parseFloat(dampingInput.value));
    });
  });

  clearBallsButton.addEventListener("click", () => {
    bouncingBall.getBalls().forEach(ball => {
      ball.reset(canvas.width, canvas.height);
    });
    bouncingBall.clearBalls();
  });
});
