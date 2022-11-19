
const svgNamespace = "http://www.w3.org/2000/svg"

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const svgMargin = 50
const svgWidth = screenWidth - svgMargin * 2
const svgHeight = screenHeight - svgMargin * 2

app()
document.addEventListener('DOMContentLoaded', topLightInSVG)

function app() {
  const svgContainer = createSvg()
  document.body.appendChild(svgContainer)

  const xCenter = svgWidth / 2
  const yCenter = svgHeight / 2
  const circle = createCircle(svgContainer, xCenter, yCenter, 50, '#000')


  // const path = createPath(svgContainer, 0, 0, svgWidth, svgHeight, '#000')
  // animateColor(path, 'stroke')
  // for (let offset = 0; offset < 10; offset++) {
  //   const xOffset = offset * 100
  //   const yOffset = 0
  //   const path = createPath(svgContainer, xOffset, yOffset, svgWidth - xOffset, svgHeight, '#000')
  //   const path2 = createPath(svgContainer, xOffset, svgHeight, svgWidth - xOffset, yOffset, '#000')
  //   animateColor(path, 'stroke')
  //   animateColor(path2, 'stroke')
  // }
}

function createSvg() {
  const svg = document.createElementNS(svgNamespace, 'svg');
  svg.style.width = `${svgWidth}px`
  svg.style.height = `${svgHeight}px`
  svg.style.margin = `${svgMargin}px`
  svg.style.background = "#ccc"
  return svg

}
function createCircle(container, x, y, radius, color) {
  const circle = document.createElementNS(svgNamespace, 'circle');
  circle.setAttribute('cx', x);
  circle.setAttribute('cy', y);
  circle.setAttribute('r', radius);
  circle.setAttribute('fill', color);
  container.appendChild(circle)

  let colorR = 0
  let colorG = 0
  let colorB = 0
  // animateColor(circle)
  return circle
}
function createPath(container, startX, startY, endX, endY, color) {
  const path = document.createElementNS(svgNamespace, 'path');
  const startCmd = `M${startX}, ${startY}`
  let x1 = svgWidth / 2, y1 = svgHeight / 2, x2 = svgWidth / 2, y2 = svgHeight / 2
  let bezierCmd = `C${x1}, ${y1}, ${x2}, ${y2}, ${endX}, ${endY}`
  path.setAttribute('d', `${startCmd} ${bezierCmd}`);
  path.setAttribute('fill', `none`);
  path.setAttribute('stroke', `${color}`);
  path.setAttribute('stroke-width', `2px`);

  container.appendChild(path)

  let step = 2
  setInterval(() => step = -step, 3000)
  const animate = function animationLoopCb() {
    x1 += step
    y1 -= step
    x2 -= step
    y2 += step
    let bezierCmd = `C${x1}, ${y1}, ${x2}, ${y2}, ${endX}, ${endY}`
    path.setAttribute('d', `${startCmd} ${bezierCmd}`);
    requestAnimationFrame(animationLoopCb)
  }
  animate()
  return path
}

function animateColor(element, fillOrStroke = 'fill') {
  let randomColor = Math.floor(Math.random() * 255)
  console.log(randomColor)
  let colorR = randomColor
  let colorG = randomColor
  let colorB = randomColor
  let stepR = 1
  let stepG = 1
  let stepB = 1
  const animation = function animationLoopCb() {
    colorR = normalizeRGBValue(colorR + stepR)
    colorG = normalizeRGBValue(colorR + stepG)
    colorB = normalizeRGBValue(colorR + stepB)
    if (colorR >= 255 || colorR <= 0) { stepR = -stepR }
    if (colorG >= 255 || colorG <= 0) { stepG = -stepG }
    if (colorB >= 255 || colorB <= 0) { stepB = -stepB }
    element.setAttribute(fillOrStroke, `rgb(${colorR},${colorG},${colorB})`)
    requestAnimationFrame(animationLoopCb)
  }
  animation()
}

function normalizeRGBValue(val) {
  return Math.max(0, Math.min(255, val))
}

function topLightInSVG() {
  document.querySelector('#any-svg').style.display = 'block'
  const lightPath = document.querySelector('#top-light')
  let lights = ['white', 'red']
  let currLight = 0
  setInterval(() => {
    lightPath.style.fill = lights[currLight]
    currLight = currLight === 0 ? 1 : 0
  }, 1000)
}