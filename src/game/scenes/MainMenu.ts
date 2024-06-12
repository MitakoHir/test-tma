import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';
import { TextButton } from '../game-objects/text-button';
import { TEXT_STYLE } from '../../consts/styles';

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
        const { centerX, centerY } = this.camera;

        this.title = this.add.text(centerX, centerY - 100, 'Main Menu', { ...TEXT_STYLE })
            .setDepth(100).setOrigin(0.5);

        const textButton = new TextButton(this, centerX, centerY, 'Play', { ...TEXT_STYLE, color: '#00ff00' }, () => this.changeScene())
            .setDepth(100).setOrigin(0.5)
        this.button = this.add.existing(textButton);

        EventBus.emit('current-scene-ready', this);
    }

    changeScene() {
        this.scene.start('Game');
    }


}
