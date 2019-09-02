#pragma strict

private var isFaceUp:boolean = false; //Carte active
private var imgBack:Sprite; //Dos de la carte
private var imgVal:int; //Valeur de la carte
var img:UI.Image; //Lien vers le visuel du bouton
var GameScript:GameObject; //Objet qui contient le script du jeu
var cardsList:Sprite[]; //Toutes les images possibles


function Start(){
    imgBack = img.sprite;
}


function showImg(cardNum:int){
    imgVal = cardNum;
}

    function flip(){
        if (!isFaceUp){
            GameScript.SendMessage("setValCard", imgVal);
            GameScript.SendMessage("clicOnCard", gameObject);
        }
    }

    function turn(){
        if (isFaceUp){
            img.sprite = imgBack;
        }else{
            img.sprite = cardsList[imgVal];
        }
        isFaceUp = !isFaceUp;
    }