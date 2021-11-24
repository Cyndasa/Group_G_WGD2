var config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 500,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y:200},
            debug:true
        }
    },
    inputManager: Phaser.Input.InputManager,
    scene: [Menu,],
},
    /* Can declare universal variables here */


game = new Phaser.Game(config)