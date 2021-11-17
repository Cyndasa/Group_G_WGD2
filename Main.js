import Phaser from 'phaser'

var config ={
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1280,
        height: 720,
    },
    physics:{
        default: 'arcade',
        arcade: {
            gravity: {y:200}
        }
    },}

export default class RacingGame extends Phaser.Scene{
    init()
    {
        this.cursors = this.input.keyboard.createCursorKeys()
    }
    preload()
    {
        this.load.image('sky', 'assets/parallax-mountain-mountains.png')
        this.load.image('foreground_trees', 'assets/parallax-mountain-foreground-trees.png')
        this.load.image('trees', 'assets/parallax-mountain-mountains-trees.png')
    }

    create()
    {
        const width = this.scale.width
        const height = this.scale.height

        this.add.image(width * 0.5 , height * 0.5, 'sky'.setScrollFactor(0))

        this.add.image(0, height, 'trees')
            .setOrigin(0,1)
            .setScrollFactor(0.25)

    }

    update()
    {
        const cam = this.cameras.main
        const speed = 5

        if (this.cursors.right.isDown)
        {
            cam.scrollX += speed
        }
        else if (this.cursors.left.isDown)
        {
            cam.scrollX -= speed
        }

    }



}
