//Tar fram ram för olika webläsare
let requestAnimationFrame = window.requestAnimationFrame ||
                            window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame ||
                            window.msRequestAnimationFrame

//Dessa är i samma array och transformeringar för olika browsers.
let transforms = ["transform",
                  "msTransform",
                  "webkitTransform",
                  "mozTransform",
                  "oTransform"]

//använder get supportedPN för att kalla in vilket de ska vara.
var transformProperty = getSupportedPropertyName(transforms);

//Skapar en array för att samla snöflingeobjekt. Anonym array?
let snowflakes = []

//Global variables to store our browser's window size
let browserWidth
let browserHeight

//Hur många snöflingor vill vi ska synas.
const numberOfSnowflakes = 50

//Flagga om snöflinga ska tillbaka till sin ursprungsposition. Testa om vi väljer true.
const resetPosition = false

//Här börjar det...
const setup = () => {
  window.addEventListener("DOMContentLoaded", generateSnowflakes, false)
  window.addEventListener("resize", setResetFlag, false)
}
Nu laddas funktionen och startar när sidan är fördigladdad.

setup();


let getSupportedPropertyName = (properties) => {
  for (let i = 0; i < properties.length; i++) {
    if (typeof document.body.style[properties[i]] != "undefined") {
      return properties[i]
    }
  }
  return null
}

//kör den hör loopen runt och testar webläsarna tills den hittar rätt?
//Hittar den inget så blir utfall null och snöflingorna faller inte?

//Konstruktion av snöflingorna

const SnowFlake = (element, radius, speed, xPos, yPos) => {

//set initial snowflake properties??
  this.element = element
  this.raduis = radius
  this.speed = speed
  this.xPos = xPos
  this.yPos = yPos

//Hur flingan ska röra sig
  this.counter = 0
  this.sign = Math.random() < 0.5 ? 1 : -1

//opaciteten på snöflingan and storlek
  this.element.style.opacity = .1 + Math.random()
  this.element.style.fontSize = 12 + Math.random() * 50 + "px"
}

//Den här funktionen bestämmer hur flingorna rör på sig. Animeringsloopen av flingorna
Snowflake.prototype.update = () => {

//trigonometi som bestämmer hur flingorna ska röra sig över skärmen.
  this.counter += this.speed / 5000
  this.xPos += this.sign * this.speed * Math.cos(this.counter) / 40
  this.yPos += Math.sin(this.counter) / 40 + this.speed / 30

// setting our snowflake's position
  setTranslate3DTransform(this.element, Math.round(this.xPos), Math.round(this.yPos))

//om snöflingan kommer längre ner än 50 pixlar utanflr browser window, börjar animeringen om för den flingan.
  if (this.yPos > browserHeight) {
    this.yPos = -50
  }
}

//A performant way to set your snowflake's position

const setTranslate3DTransform = (element, xPosition, yPosition) => {
  let val = "translate3d(" + xPosition + "px, " + yPosition + "px" + ", 0)"
    element.style[transformProperty] = val
}

//Denna funktion skapar snöflingan
const generateSnowflakes = () => {

//kallar på snö-elementet från DOM och lagrar det
  const originalSnowflake = document.querySelector(".snowflake")

//går in i elementets container
  const snowflakeContainer = originalSnowflake.parentNode

//kolla browser size
  browserWidth = document.documentElement.clientWidth
    browserHeight = document.documentElement.clientHeight

//skapa varje individuell snöflinga
    for (let i = 0; i < numberOfSnowflakes; i++) {

      //klona vår original flinga och lägg till i snowflakeContainer
      const snowflakeCopy = originalSnowflake.cloneNode(true);
      snowflakeContainer.appendChild(snowflakeCopy)

    //sätt vår snöflingas position och relaterade "properties"
      let initialXPos = getPosition(50, browserWidth)
      let initialYPos = getPosition(50, browserHeight)
      let speed = 5+Math.random()*40
      let radius = 4+Math.random()*10

      //skapa vårt snöflinge objekt
      let snowflakeObject = new Snowflake(snowflakeCopy,
                          radius,
                          speed,
                          initialXPos,
                          initialYPos)
      snowflakes.push(snowflakesObject)
    }

  //tar bort origial snöflingan eftersom vi inte behöver den synlig.
  snowflakeContainer.removeChild(originalSnowflake)

  //kallar på Snowflakes funktione var 30 milliseconds
  moveSnowflakes()
}

//BÖRJA HÄR SEN, MEN HAR LAGT IN FÖR ATT TESTA OM DET FUNGERAR.
