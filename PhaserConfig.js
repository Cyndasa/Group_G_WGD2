var config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y:200}
        }
    },
    inputManager: Phaser.Input.InputManager,
    scene: [mainScene,],
},

game = new Phaser.Game(config)