import { useEffect, useRef } from 'react';
import { IRefPhaserGame, PhaserGame } from './game/PhaserGame';
import WebApp from '@twa-dev/sdk';

const App = () => {

    useEffect(() => {
        console.log('WebApp.isExpanded: ', WebApp.isExpanded);
        if (!WebApp.isExpanded) {
            WebApp.expand();
        }
    }, [])

    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = useRef<IRefPhaserGame | null>(null);

    // Event emitted from the PhaserGame component
    const currentScene = (scene: Phaser.Scene) => {
        console.log('Current scene is: ', scene.scene.key);
    }

    return (
        <div id="app">
            <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
        </div>
    )
}

export default App
