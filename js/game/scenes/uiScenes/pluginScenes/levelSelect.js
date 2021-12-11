class levelSelect extends Phaser.Scene{
    constructor() {
        super('LevelSelect');
    }
    init(){

    }
    preload(){

    }
    create(){

        /* Add title image */
        const titleHeader = this.add.image(400, 75, 'titleHeader');
        titleHeader.setScale(3); // Enlarge title header image
        titleHeader.setScrollFactor(0); // Set scroll factor to zero to prevent movement

        /* Temporary text to mark scene - COMMENT OUT OR REMOVE FOR SUBMISSION */
        this.add.text(250, 150, '----Level Select----',{
            font: '20px',
            color: 'white',
            backgroundColor: 'darkblue',
        })

        /* Create menu buttons */

        /* Forest select */
        let forestSelect = this.add.image(125, 280, 'forestLevelSelect').setScale(0.5);
        let forestSelectText = this.add.text(forestSelect.x -35, forestSelect.y + 35, 'Forest', {
            font: '20px',
            color: 'white',
        });
        forestSelect.setTint('0x404040');
        forestSelect.setInteractive();

        forestSelect.on("pointerup",()=>{
            this.scene.start('Test');
        });

        forestSelect.on('pointerover', ()=>{
            forestSelect.clearTint();
        });

        forestSelect.on('pointerout', ()=>{
            forestSelect.setTint('0x404040');
        });

        /* City select */
        let citySelect = this.add.image(350, 280, 'cityLevelSelect').setScale(0.25);
        let citySelectText = this.add.text(citySelect.x - 25, citySelect.y + 35, 'City', {
            font: '20px',
            color: 'white',
        });
        citySelect.setTint('0x404040');
        citySelect.setInteractive();

        citySelect.on("pointerup",()=>{
            this.scene.start('City');
        });

        citySelect.on('pointerover', ()=>{
            citySelect.clearTint();
        });

        citySelect.on('pointerout', ()=>{
            citySelect.setTint('0x404040');
        });


        /* Return button */
        const returnButton = this.add.image(400, 540, 'exitButton');
        returnButton.setInteractive();
        returnButton.setScale(1.5);
        returnButton.setScrollFactor(0);

        /* Apply tint to image when hovered over/ off */
        returnButton.on('pointerover', ()=>{
            returnButton.setTint('0xFF00F5');
        });
        returnButton.on('pointerout', ()=>{
            returnButton.clearTint();
        });

        /* Change scene */
        returnButton.on('pointerup', ()=>{
            this.scene.launch('CharacterSelect');
            this.scene.stop('LevelSelect');
        });

    }
    update(){

    }
}