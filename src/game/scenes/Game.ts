import { TEXT_STYLE } from '../../consts/styles';
import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import { TextTimer } from '../game-objects/text-timer';

const getScoreString = (score: number) => `Score: ${score}`;

const TOP_PADDING = 60;

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameText: Phaser.GameObjects.Text;
    scoreText: Phaser.GameObjects.Text;
    score: number = 0;
    constructor() {
        super('Game');
    }

    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);
        const { centerX, centerY, width } = this.camera;

        this.scoreText = this.add.text(width - 10, TOP_PADDING, getScoreString(0), {
            ...TEXT_STYLE
        }).setOrigin(1);

        const playTimer = new TextTimer(this, TOP_PADDING, TOP_PADDING, {
            ...TEXT_STYLE,
            color: '#ff0000',
        }, 30, () => this.changeScene()).setOrigin(1);
        this.add.existing(playTimer);

        this.gameText = this.add.text(centerX, centerY, 'SOME MAFCKING SHIT HAPPENS HERE', {
            ...TEXT_STYLE,
            wordWrap: { width: 300, useAdvancedWrap: true }
        }).setOrigin(0.5);

        EventBus.emit('current-scene-ready', this);
    }

    changeScene() {
        this.scene.start('GameOver');
    }
}
