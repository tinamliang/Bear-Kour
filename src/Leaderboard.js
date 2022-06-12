import Phaser from 'phaser';
import { getFirestore, collection, query, orderBy, onSnapshot} from 'firebase/firestore';

class Leaderboard extends Phaser.Scene {
    constructor() {
        super('Leaderboard')
    }

    init(data) {  
        this.scores = data.score;
        this.names = data.name;
    }

    async create() {
        const q = query(collection(getFirestore(), 'game_scores'), orderBy('score', 'asc'));

        onSnapshot(q, (querySnapshot) => {
        const namesArr = []
        const scoresArr = []
        querySnapshot.forEach((doc) => {
            namesArr.push(doc.data().name);
            scoresArr.push(doc.data().score);
        });

        const reversenamesArr = namesArr.reverse();
        const reversescoresArr = scoresArr.reverse();

        const slicednamesArr = reversenamesArr.slice(0, 5);
        const slicedscoresArr = reversescoresArr.slice(0, 5);
        //console.log("name: " + this.names);
        //console.log(slicednamesArr, slicedscoresArr);
        this.scene.start('FetchScore', {
            myName: this.names,
            names: slicednamesArr,
            scores: slicedscoresArr
        });
    });}
}

export default Leaderboard;