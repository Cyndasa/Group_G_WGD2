class pauseMenu extends Phaser.Scene{
    constructor() {
        super('PauseMenu');
    };

    init(){
    };

    preload(){
    };

    create(){

        /* UI Components */
        this.add.rectangle(400, 300, 800, 600, 0x000000, 0.4); // Create an overlay mask
        //this.add.text(300, 150, 'Paused', {font: '50px', align: 'center'});

        const pausedText = this.add.bitmapText(400, 125, 'arcade', '', 40);
        pausedText.setOrigin(0.5);
        pausedText.setCenterAlign();
        pausedText.setTint('0xFFFFFF');
        pausedText.setText([
            '-- Paused --',
        ]);


        /* Create buttons */

        // Resume button
        let resumeButton = this.add.image(400, 250, 'resumeButton').setDepth(2);
        resumeButton.setInteractive();
        resumeButton.on('pointerover', ()=>{
            resumeButton.setTint('0xFF00F5');
        });
        resumeButton.on('pointerout', ()=>{
            resumeButton.clearTint();
        });
        resumeButton.on('pointerup', ()=>{
            this.unPause();
        });

        // Restart button
        let restartButton = this.add.image(400, 350, 'restartButton').setDepth(2);
        restartButton.setInteractive();
        restartButton.on('pointerover', ()=>{
            restartButton.setTint('0xFF00F5');
        });
        restartButton.on('pointerout', ()=>{
            restartButton.clearTint();
        });
        restartButton.on('pointerup', ()=>{
            this.scene.start(curGameScene);
            this.scene.stop('PauseMenu'); // close this scene
        });


        // Quit button
        let quitButton = this.add.image(400, 450, 'exitButton').setDepth(2);
        quitButton.setInteractive();
        quitButton.on('pointerover', ()=>{
            quitButton.setTint('0xFF00F5');
        });
        quitButton.on('pointerout', ()=>{
            quitButton.clearTint();
        });
        quitButton.on('pointerup', ()=>{
            this.scene.stop(curGameScene); // Close game scene
            this.scene.start('MainMenu'); // Open main menu
            this.scene.stop(); // Close this scene
        });

    };

    update(){

        if(cursors.space.isDown){
            this.unPause();
        }

    };

    unPause(){
        this.scene.resume(curGameScene); // Resume game scene
        this.scene.stop('PauseMenu'); // close this scene

    };

}