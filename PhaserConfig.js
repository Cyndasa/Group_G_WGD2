var config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 384,
        height: 240,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y:200},
            debug:true
        }
    },
    inputManager: Phaser.Input.InputManager,
    scene: [mainScene,],
},

game = new Phaser.Game(config)