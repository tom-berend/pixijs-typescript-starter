import * as PIXI from 'pixi.js'
import { Howl } from 'howler'

const venusImage: string = 'src/images/venus.png'
const mercuryImage: string = 'src/images/mercury.png'

const kirkSound: string = 'src/sound/kirk.wav'

// NOTE: sounds will not play until the user has interacted with the page
// https://developers.google.com/web/updates/2017/09/autoplay-policy-changes#webaudio



export class Game {
  private app: PIXI.Application

  private venus: PIXI.Sprite
  private mercury: PIXI.Sprite

  private kirkSound: Howl

  private thing: PIXI.Graphics
  private count: number = 0

  private ticker: PIXI.Ticker

  ///////////////////////////////
  // constructor() { }

  public start(): void {
    this.createAppEngine()
    this.loadResources()
  }

  private createAppEngine(): void {

    let height: number = window.innerHeight
    let width: number = window.innerWidth

    this.app = new PIXI.Application({
      width: 800,         // default: 800
      height: 800,        // default: 600
      antialias: true,    // default: false
      transparent: false, // default: false
      resolution: 1,       // default: 1,
      //      forceCanvas: true,   // always canvas
    })

    // Add the canvas that Pixi automatically created for you to the HTML document
    document.body.appendChild(this.app.view)
    this.app.renderer.backgroundColor = 0x00 // black
  }

  private loadResources() {

    // preload the images
    this.app.loader
      .add([
        venusImage,
        mercuryImage,
      ])
      .load(this.runAfterLoader.bind(this))   // and run setup() when you are done

    // and the sounds
    this.kirkSound = new Howl({
      src: [kirkSound],
      volume: 0.5,
    })

    this.kirkSound.play()
  }

  private runAfterLoader(): void {

    // need this step (after loader) to prepare images for WebGL
    this.venus = new PIXI.Sprite(
      this.app.loader.resources[venusImage].texture)
    this.mercury = new PIXI.Sprite(
      this.app.loader.resources[mercuryImage].texture)

    this.startGame()
  }


  ///////////////////////////////////////////////////////////
  // now you are ready to display and manipulate your sprites
  ///////////////////////////////////////////////////////////

  private startGame() {

    // toss up some sprites
    this.app.stage.addChild(this.venus)
    this.venus.x = 250
    this.venus.y = 250
    this.app.stage.addChild(this.mercury)

    // start a soundtrack (won't play until user has interacted with page)
    this.kirkSound.play

    // draw a silly shape
    this.thing = new PIXI.Graphics()

    // set a fill and line style
    this.thing.beginFill(0xFF3300)
    this.thing.lineStyle(10, 0x00d900, 1)

    // draw a shape
    this.thing.moveTo(50, 250)
    this.thing.lineTo(250, 250)
    this.thing.lineTo(100, 300)
    this.thing.lineTo(250, 420)
    this.thing.lineTo(50, 420)
    this.thing.lineTo(50, 250)
    this.thing.endFill()

    console.log('0')
    this.thing.position.x = 0
    this.thing.position.y = 200
    this.app.stage.addChild(this.thing)


    // lets create moving shape

    this.ticker = PIXI.Ticker.shared
    this.ticker.add(this.animate.bind(this))
    this.ticker.start()
  }

  private animate() {
    this.mercury.position.x = 250 + 250 * Math.sin(this.count)
    this.mercury.position.y = 250 + 250 * Math.cos(this.count)

    this.thing.position.y = 250 * Math.sin(this.count * 2)

    this.count += .03
  }
}

