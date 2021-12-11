class AudioScene extends Phaser.Scene {
    constructor() {
        super('AudioScene');
    };

    init() {
        this.cursors = this.input.keyboard.createCursorKeys();
    };

    preload(){
        this.load.audio('theme', [
            'gameAssets/audioAssets/bgm/Menu_Music.ogg',
            'gameAssets/audioAssets/bgm/Menu_Music.mp3'
        ]);
    }

    create(){

        this.menuMusic = this.sound.add("theme");
        var musicConfig = {
            mute: 0,
            volume: 0.6,
            seek: 0,
            loop: false, //DEBUG. Change back to true for final build
            delay: 0
        }
        this.menuMusic.play(musicConfig); // Start Playing the menu bg music
        this.scene.start("Menu");
    }

    update(){

    }

}
