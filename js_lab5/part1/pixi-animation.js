import * as PIXI from 'pixi.js';
const app = new PIXI.Application();

async function init() {
    await app.init({ width: 640, height: 360, backgroundColor: 0x1099bb });
    document.body.appendChild(app.canvas);

    const graphics = new PIXI.Graphics();
    graphics.rect(-50, -50, 100, 100);
    graphics.fill(0xde3249);


    graphics.x = app.screen.width / 2;
    graphics.y = app.screen.height / 2;

    app.stage.addChild(graphics);

    app.ticker.add((time) => {
        graphics.rotation += 0.05 * time.deltaTime;
    });
}

init();