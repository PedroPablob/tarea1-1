let eyeX1, eyeY1, eyeX2, eyeY2;
const eyeRadius = 50;
let mouthHeight = 10;
let isBlinking = false;
let isWinking = false;
let blinkStartTime = 0;
let blinkInterval;

let eyelashOffset = 10;
let eyelashLength = 10;

let backgroundColor1, backgroundColor2, currentBackgroundColor;
let squareColor;

function setup() {
  createCanvas(400, 400);
  eyeX1 = width / 3;
  eyeY1 = height / 2;
  eyeX2 = 2 * width / 3;
  eyeY2 = height / 2;

  backgroundColor1 = color(255, 227, 184); // Amarillo pastel
  backgroundColor2 = color(255, 182, 193); // Rosado pastel
  currentBackgroundColor = backgroundColor1;
  squareColor = color(255 - red(currentBackgroundColor), 255 - green(currentBackgroundColor), 255 - blue(currentBackgroundColor));

  setBlinkInterval();
}

function draw() {
  background(currentBackgroundColor);

  // Calcular la posición de las pupilas basándose en la posición del ratón
  let pupilX1 = constrain(map(mouseX, 0, width, eyeX1 - eyeRadius / 2, eyeX1 + eyeRadius / 2), eyeX1 - eyeRadius / 2, eyeX1 + eyeRadius / 2);
  let pupilY1 = constrain(map(mouseY, 0, height, eyeY1 - eyeRadius / 2, eyeY1 + eyeRadius / 2), eyeY1 - eyeRadius / 2, eyeY1 + eyeRadius / 2);

  let pupilX2 = constrain(map(mouseX, 0, width, eyeX2 - eyeRadius / 2, eyeX2 + eyeRadius / 2), eyeX2 - eyeRadius / 2, eyeX2 + eyeRadius / 2);
  let pupilY2 = constrain(map(mouseY, 0, height, eyeY2 - eyeRadius / 2, eyeY2 + eyeRadius / 2), eyeY2 - eyeRadius / 2, eyeY2 + eyeRadius / 2);

  // Calcular la altura de la boca basándose en la distancia entre el ratón y los ojos
  let eyeDist = dist(eyeX1, eyeY1, mouseX, mouseY);
  mouthHeight = map(eyeDist, 0, 150, 20, 40);

  // Verificar si es el momento de parpadear
  if (millis() - blinkStartTime > blinkInterval) {
    isBlinking = true;
    if (millis() - blinkStartTime > blinkInterval + 100) {
      isBlinking = false;
      setBlinkInterval();
    }
  }

  // Dibujar los ojos
  fill(255);
  ellipse(eyeX1, eyeY1, eyeRadius * 2);
  ellipse(eyeX2, eyeY2, eyeRadius * 2);

  // Dibujar las pestañas
  drawEyelashes(eyeX1, eyeY1);
  drawEyelashes(eyeX2, eyeY2);

  // Dibujar las pupilas
  fill(0);
  ellipse(pupilX1, pupilY1, eyeRadius);
  ellipse(pupilX2, pupilY2, eyeRadius);

  // Dibujar la boca
  drawMouth(width / 2, eyeY2 + eyeRadius, mouthHeight);

  // Parpadear
  if (isBlinking) {
    blink();
  }

  // Guiñar
  if (isWinking) {
    wink();
  }

  // Dibujar el cuadrado interactivo
  fill(squareColor);
  rect(0, height - 50, 50, 50);

  // Mostrar la hora en tiempo real en la parte superior de la pantalla
  let currentDate = new Date();
  let timeString = currentDate.toLocaleTimeString('en-US', { timeZone: 'America/Santiago' });
  let dateString = currentDate.toLocaleDateString();
  textAlign(CENTER, TOP);
  fill(0);
  text(timeString, width / 2, 0);

  // Mostrar la fecha en tiempo real en el centro inferior de la pantalla
  textAlign(CENTER, BOTTOM);
  text(dateString, width / 2, height);
}

function drawMouth(x, y, h) {
  // Dibujar la boca con una altura variable para cambiar la expresión
  arc(x, y, eyeRadius * 1.5, h, 0, PI);
}

function drawEyelashes(x, y) {
  // Dibujar las pestañas alrededor del ojo
  for (let i = -3; i <= 3; i++) {
    line(x + i * eyelashOffset, y - eyeRadius - eyelashLength, x + i * eyelashOffset, y - eyeRadius);
  }
}

function blink() {
  // Cerrar los ojos durante el parpadeo
  fill(255);
  ellipse(eyeX1, eyeY1, eyeRadius * 2);
  ellipse(eyeX2, eyeY2, eyeRadius * 2);
  drawEyelashes(eyeX1, eyeY1);
  drawEyelashes(eyeX2, eyeY2);
  isBlinking = false;
  setTimeout(openEyes, 300); // Abrir los ojos después de un breve intervalo
}

function openEyes() {
  // Abrir los ojos después del parpadeo
  fill(255);
  ellipse(eyeX1, eyeY1, eyeRadius * 2);
  ellipse(eyeX2, eyeY2, eyeRadius * 2);
  drawEyelashes(eyeX1, eyeY1);
  drawEyelashes(eyeX2, eyeY2);
}

function wink() {
  // Guiñar con el ojo derecho
  fill(255);
  ellipse(eyeX1, eyeY1, eyeRadius * 2);
  fill(0);
  ellipse(eyeX2, eyeY2, eyeRadius * 2);
  drawEyelashes(eyeX1, eyeY1);
  isWinking = false;
}

function setBlinkInterval() {
  blinkInterval = random(2000, 3000);
  blinkStartTime = millis();
}

function mousePressed() {
  if (mouseButton === LEFT) {
    isBlinking = true;
  } else if (mouseButton === RIGHT) {
    isWinking = true;
  }

  // Cambiar los colores de fondo y el cuadrado
  if (currentBackgroundColor === backgroundColor1) {
    currentBackgroundColor = backgroundColor2;
  } else {
    currentBackgroundColor = backgroundColor1;
  }
  squareColor = color(255 - red(currentBackgroundColor), 255 - green(currentBackgroundColor), 255 - blue(currentBackgroundColor));

  setBlinkInterval();
}
