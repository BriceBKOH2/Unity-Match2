#pragma strict

private var cols :int=4;
private var rows :int=4;
private var totalCard :int=cols*rows;
private var matchesNeededToWin :int=totalCard/2;
private var matchesMade :int=0;
private var cardW :int=130;
private var cardH :int=130;
var CardObj :UI.Button;
var panelParent :UI.Image;
private var aCards:Array=new Array();
private var aGrid:Array=new Array();
private var aCardsFlipped:Array=new Array();
private var canClick:boolean=true;


function Start () {
    drawGrid();
}


function drawGrid(){
    canClick = true;
    var randomElem:int;
    var imgVal:int;
    for (var i:int=0;i<matchesNeededToWin;i++){
        aGrid.Add(i);
        aGrid.Add(i);
    }
    var copyItem:UI.Button;
    for (var k=0;k<cols;k++){
        for (var j=0;j<rows;j++){
            randomElem = Random.Range(0,aGrid.length);
            imgVal = aGrid[randomElem];
            aGrid.RemoveAt(randomElem);
            copyItem = Instantiate (CardObj);
            copyItem.transform.SetParent(panelParent.transform,false);
            copyItem.transform.localPosition = Vector3(k*cardW-197,j*cardH-197,0);
            copyItem.SendMessage("showImg", imgVal);
        }
    }
    CardObj.enabled = false;
}

function clicOnCard(obj:GameObject){
    if (canClick){
        aCardsFlipped.Add(obj);
        obj.SendMessage("turn");
        if (aCardsFlipped.length == 2){
            canClick = false;
            validate();
        }
    }
}
function setValCard(num:int){
    aCards.Add(num);
}
function validate(){
    if (aCards[0] == aCards[1]){
        matchesMade++;
        if (matchesMade < matchesNeededToWin){
            aCardsFlipped.Clear();
            aCards.Clear();
            canClick = true;
        }
        else{
            Invoke ("victory", 1);
        }
    }
    else{
        Invoke ("flipCards", 1);
    }
}


function victory(){
    Application.LoadLevel("game");
}


function flipCards(){
    var obj:GameObject = aCardsFlipped[0];
    obj.SendMessage("turn");
    obj = aCardsFlipped[1];
    obj.SendMessage("turn");
    aCardsFlipped.Clear();
    aCards.Clear();
    canClick = true;
}