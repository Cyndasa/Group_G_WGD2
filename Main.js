import Phaser from 'phaser'

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
