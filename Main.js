class mainScene extends Phaser.Scene{
    constructor(){
        super('MainScene');
    };

    init()
    {
        this.cursors = this.input.keyboard.createCursorKeys();
    };

    preload()
    {
        this.load.image('sky', 'Assets/parallax-mountain-mountains.png');
        this.load.image('foreground_trees', 'Assets/parallax-mountain-foreground-trees.png');
        this.load.image('trees', 'Assets/parallax-mountain-trees.png');
    };

    create()
    {
        const width = this.scale.width;
        const height = this.scale.height;

        this.add.image(width * 0.5 , height * 0.5, 'sky').setScrollFactor(0);

        this.add.image(0, height, 'trees').setOrigin(0,1).setScrollFactor(0.25);

        this.cameras.main.setBounds(0,0,3200, 600);
    };

    update()
    {
        const cam = this.cameras.main;
        const speed = 5;

        if (this.cursors.right.isDown)
        {
            cam.scrollX += speed
        }
        else if (this.cursors.left.isDown)
        {
            cam.scrollX -= speed
        }

    };

}
