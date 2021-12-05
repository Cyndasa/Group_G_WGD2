class loadingScene extends Phaser.Scene {

    /* This can be used for either loading assets prior to starting scene or while/for conducting matchmaking. */

    constructor(){
        super('LoadingScene');
    }

    preload(){

        /* Preloading Graphic */

        /* Progress Bar */
        let progressBar = this.add.graphics();
        let progressBox = this.add.graphics();
        progressBox.fillStyle(0xffffff, 0.3);
        progressBox.fillRect(240, 270, 320, 50);

        /* Text */
        let width = this.cameras.main.width;
        let height = this.cameras.main.height;
        let loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading Level',
            style: {
                font: '30px',
                fill: '#ffffff',
            },
        });
        loadingText.setOrigin(0.5, 0.5);

        /* Display Progress */

        this.load.on('progress', function(value) {
            progressBar.clear();
            progressBar.fillStyle(0x7FFF00, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
        });

        this.load.on('fileProgress', function(file){});

        this.load.on('complete', function(){
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
        });

        /* Load assets for scene below */


    }

    create(){

        /* Create necessary assets or functions for scene */

        /* Start next scene */
        this.scene.start('');

    };

}