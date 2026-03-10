import { _decorator, AudioClip, Component, director, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameOverUI')
export class GameOverUI extends Component {

    @property(Label)
    scoreLabel: Label = null;
    @property(Label)
    bestScoreLabel: Label = null;
    @property(Node)
    newSpritr: Node = null;
    @property([Node])
    medalArray: Node[] = [];


    public show(curScore: number, bestScore: number){
        this.node.active = true;
        this.scoreLabel.string = curScore.toString();
        this.bestScoreLabel.string = bestScore.toString();
        if(curScore > bestScore){
            this.newSpritr.active = true;
        }else{
            this.newSpritr.active = false;
        }
        // 0-9
        const index = curScore / 10;
        let indexInt = Math.floor(index);
        if(indexInt > 3){
            indexInt = 3;
        }
        this.medalArray[indexInt].active = true;
    }
    public hide(){
        this.node.active = false;
    }

    onPlayButtonClick(){
        director.loadScene(director.getScene().name);
    }
}


