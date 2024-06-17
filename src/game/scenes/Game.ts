import { TEXT_STYLE } from '../../consts/styles';
import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import { TextTimer } from '../game-objects/text-timer';

const getScoreString = (score: number) => `Score: ${score}`;

const TOP_PADDING = 60;
const GAME_DURATION = 20;

enum ENEMY {
    STAR = 'star',
    POOP = 'poop'
}

// const HOLE_COORDS = [
//     [100, 350],[250, 350],[400, 350],
//     [100, 500],[250, 500],[400, 500],
//     [100, 650],[250, 650],[400, 650],
//     [100, 800],[250, 800],[400, 800]
// ];

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameText: Phaser.GameObjects.Text;
    scoreText: Phaser.GameObjects.Text;
    enemies: Phaser.GameObjects.Sprite[] = [];
    score: number = 0;
    difficulty: number = 1;
    timer: Phaser.Time.TimerEvent;
    coords: number[][] = [];
    constructor() {
        super('Game');
    }

    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        const { width, height } = this.camera;
        this.coords = [
            [width / 6, height / 3],[width / 2, height / 3],[width / 1.25, height / 3],
            [width / 6, height / 2],[width / 2, height / 2],[width / 1.25, height / 2],
            [width / 6, height / 1.4],[width / 2, height / 1.4],[width / 1.25, height / 1.4],
            [width / 6, height / 1.1],[width / 2, height / 1.1],[width / 1.25, height / 1.1],
        ];

        this.scoreText = this.add.text(width - 10, TOP_PADDING, getScoreString(0), {
            ...TEXT_STYLE
        }).setOrigin(1);

        const playTimer = new TextTimer(this, TOP_PADDING, TOP_PADDING, {
            ...TEXT_STYLE,
            color: '#ff0000',
        }, GAME_DURATION, () => this.changeScene()).setOrigin(1);
        this.add.existing(playTimer);

        this.timer = this.time.addEvent({
            delay: 1000,
            loop: true,
            callback: () => {
                this.difficulty++;
                this.createEnemyObjects();
            }
        })

        EventBus.emit('current-scene-ready', this);
    }

    createEnemyObjects() {
        const objectType = Math.random() > 0.8 ? ENEMY.POOP : ENEMY.STAR;
        const objectIndex = Math.floor(Math.random() * this.coords.length);
        const objectPos = this.coords[objectIndex];
        const object = this.add.sprite(objectPos[0], objectPos[1], objectType);
        object.setInteractive().on('pointerdown', () => {
            this.score += object.texture.key === ENEMY.STAR ? 100 : -500;
            this.scoreText.setText(getScoreString(this.score));
            object.destroy();
        })
    }

    changeScene() {
        this.scene.start('GameOver');
    }
}
