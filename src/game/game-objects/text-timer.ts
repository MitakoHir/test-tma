export class TextTimer extends Phaser.GameObjects.Text {
    private timerInstance: Phaser.Time.TimerEvent;
    private timerValue: number = 0;
    private callback: () => void;

    constructor(scene: Phaser.Scene, x: number, y: number, style: Phaser.Types.GameObjects.Text.TextStyle, timerValue: number, callback: () => void) {
        super(scene, x, y, timerValue.toString(), style);
        this.timerValue = timerValue;
        this.callback = callback;

        this.timerInstance = this.scene.time.addEvent(({ delay: 1000, loop: true, callback: () => this.updateTimer() }));
    }

    updateTimer() {
        if (this.timerValue > 0) {
            this.timerValue--;
            this.setText(this.timerValue.toString());
        } else {
            this.timerInstance.remove();
            this.callback();
        }
    }
}