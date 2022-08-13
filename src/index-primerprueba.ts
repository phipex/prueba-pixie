import { Emitter } from 'pixi-particles';
import { Application, Sprite, Container, Graphics, ParticleContainer, TextStyle, Text, BitmapFont, BitmapText, Texture} from 'pixi.js'

import * as particleSettings from "./emitter.json";


const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: 640,
	height: 480
});

const conty: Container = new Container();
conty.x = 200;
conty.y = 0;
app.stage.addChild(conty);

const clampy: Sprite = Sprite.from("clampy.png");
clampy.x = 100; // posision absoluta 300 = 200 (container) + 100 (del sprite)
clampy.y = 100;
conty.addChild(clampy);

const bigConty: Container = new Container();
bigConty.scale.set(2); // You can use set and only one value to set x and y
bigConty.position.x = 100;
bigConty.y = 200; // this is a shortcut for .position.y and it also exists one for .position.x
app.stage.addChild(bigConty);

const littleConty: Container = new Container();
// position has a copy setter. It won't use your reference but copy the values from it!
//littleConty.position = new Point(300,200);
bigConty.addChild(littleConty);

const particleConty: ParticleContainer = new ParticleContainer();
// Pretty much everything that worked on a Container will work with a ParticleContainer.
bigConty.addChild(particleConty);

const graphy: Graphics = new Graphics();

// we give instructions in order. begin fill, line style, draw circle, end filling
graphy.beginFill(0xFF00FF);
graphy.lineStyle(10, 0x00FF00);
graphy.drawCircle(0, 0, 25); // See how I set the drawing at 0,0? NOT AT 100, 100!
graphy.endFill();

app.stage.addChild(graphy); //I can add it before setting position, nothing bad will happen.

// Here we set it at 100,100
graphy.x = 100;
graphy.y = 100;

//Verifique PixiJS Textstyle Editor para hacer el estilo de texto fácilmente.

const styly: TextStyle = new TextStyle({
    align: "center",
    fill: "#754c24",
    fontSize: 42
});
const texty: Text = new Text('私に気づいて先輩！', styly); // Text supports unicode!
texty.text = "This is expensive to change, please do not abuse";
//Contiene el texto a mostrar. Cambiar esto es caro . Si necesita que su texto cambie cada cuadro (por ejemplo, una partitura), considere usarBitmapText
//Para usar fuentes personalizadas, debe agregarlas como fuentes web a su página web. Si conoce su html-fu , puede hacer esto o puede consultar la sección de fuentes sobre cómo cargar activos
app.stage.addChild(texty);

// If you need to know, this is the expensive part. This creates the font atlas
BitmapFont.from("comic 32", {
    fill: "#ffffff", // White, will be colored later
    fontFamily: "Comic Sans MS",
    fontSize: 32
})

// Remember, this font only has letters and numbers. No commas or any other symbol.
const bitmapTexty: BitmapText = new BitmapText("I love baking, my family, and my friends",
    {
        fontName: "comic 32",
        fontSize: 32, // Making it too big or too small will look bad
        tint: 0xFF0000 // Here we make it red.
    });

bitmapTexty.text = "This is cheap";
bitmapTexty.text = "Change it as much as you want";

app.stage.addChild(bitmapTexty);

const particleContainer = new ParticleContainer();
app.stage.addChild(particleContainer);

const emitter = new Emitter(particleContainer, Texture.WHITE, particleSettings);
emitter.autoUpdate = true; // If you keep it false, you have to update your particles yourself.
emitter.updateSpawnPos(200, 100);
emitter.emit = true;

