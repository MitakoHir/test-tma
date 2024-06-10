import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';
import { TextButton } from '../game-objects/text-button';

const TextStyle = {
    fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
    stroke: '#000000', strokeThickness: 8,
    align: 'center'
};

export class MainMenu extends Scene {
    private camera: Phaser.Cameras.Scene2D.Camera;
    private title: GameObjects.Text;
    private button: TextButton;

    // logoTween: Phaser.Tweens.Tween | null;

    constructor() {
        super('MainMenu');
    }


    create() {
        this.camera = this.cameras.main;
        console.log('camera: ', this.camera);
        const { centerX, centerY } = this.camera;
        this.title = this.add.text(centerX, centerY - 100, 'Main Menu', { ...TextStyle })
            .setDepth(100).setOrigin(0.5);

        this.button = new TextButton(this, centerX, centerY, 'Play', { ...TextStyle, color: '#00ff00' }, () => this.changeScene())
            .setDepth(100).setOrigin(0.5)
        this.add.existing(this.button);

        EventBus.emit('current-scene-ready', this);
    }

    changeScene() {
        this.scene.start('Game');
    }


}
