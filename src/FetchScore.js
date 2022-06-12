import Phaser from 'phaser';
import { getFirestore, collection, query, orderBy, where, onSnapshot} from 'firebase/firestore';

class FetchScore extends Phaser.Scene {
    constructor() {
        super('FetchScore')
    }

    init(data) {

        this.player = data.myName;
        this.namehighscore = data.names;
        this.scorehighscore = data.scores;
    }

    async create() {
        //console.log(this.player, this.namehighscore, this.scorehighscore);
        const q = query(collection(getFirestore(), 'game_scores'), where("name", "==", String(this.player)));

        onSnapshot(q, (querySnapshot) => {
        const myScore = []
        querySnapshot.forEach((doc) => {
            myScore.push(doc.data().score);
        })
        //console.log(this.namehighscore)
        this.scene.run('GameOver', {
            myscore: myScore,
            names: this.namehighscore,
            scores: this.scorehighscore
        });
    });

}}

export default FetchScore;