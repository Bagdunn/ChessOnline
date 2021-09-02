class Chess {
    constructor (color, posX, posY){
        this.color = color;
        this.posX = posX;
        this.posY = posY;
    }

    setCords (newX, newY){
        this.posX = newX;
        this.posY = newY;
    }

    getColor(){
        return (this.color);
    }

}
// ------------------------------- Пешка ----------- -----------------

class Pawn  extends Chess{
    name = "pawn";

    MisReal (newX, newY, arr) {
        if ((newX == this.posX && newY == this.posY-1 && this.color == "white") 
        || (newX == this.posX && newY == this.posY+1 && this.color == "black")
        || (this.posY == 1 && newX == this.posX && newY == this.posY+2 && this.color == "black")
        || (this.posY == 6 && newX == this.posX && newY == this.posY-2 && this.color == "white"))
        if ((arr[newX][newY])==undefined)
        return (true);
        else
        return (false);
    }

    IsKing() {return(false)};

    KisReal (newX, newY, Ecolor) {
        if (
            (((newX == this.posX+1)||(newX == this.posX-1)) && newY == this.posY-1 && this.color != Ecolor && this.color == "white") 
        || (((newX == this.posX+1)||(newX == this.posX-1)) && newY == this.posY+1 && this.color != Ecolor && this.color == "black"))
        return true;
        else
        return false;
    }

    getName (){
        return  (this.color + " pawn " + this.posX);
    }
}
// ------------------------------- Тура ------------------------------

class Rook  extends Chess{
    name = "rook";

    MisReal (newX, newY, arr) {
        this.arr = arr;
        if (newX == this.posX && newY != this.posY){
            while (newY != this.posY){
                if(arr[newX][newY] != undefined) {return false; break;}
                if(arr[newX][newY] == undefined) {if (newY > this.posY) newY -=1; if (newY < this.posY) newY ++;}
                
            }return true;}
        if (newY == this.posY && newX != this.posX){
            while (newX != this.posX){
                if(arr[newX][newY] != undefined) {return false; break;}
                if(arr[newX][newY] == undefined) {if (newX > this.posX) newX -=1; if (newX < this.posX) newX ++;}
                
            }return true;}

        else return false;
    }
    
    IsKing() {return(false)};

    KisReal (newX, newY,Ecolor){
        if (Ecolor != this.color){
            if ((newX == this.posX+1 && this.posY == newY)
            || (newX == this.posX-1 && this.posY == newY)
            || (newX == this.posX && this.posY+1 == newY)
            || (newX == this.posX && this.posY-1 == newY)) return true;
        if(newX>this.posX && newY == this.posY && this.MisReal(newX-1,newY,this.arr)==true) return true;
        if(newX<this.posX && newY == this.posY && this.MisReal(newX+1,newY,this.arr)==true) return true;
        if(newX == this.posX && newY > this.posY && this.MisReal(newX,newY-1,this.arr)==true) return true;
        if(newX == this.posX && newY < this.posY && this.MisReal(newX,newY+1,this.arr)==true) return true;
        else return false;}
        else return false;
    }

    getName (){
        return  (this.color + " Rook " + this.posX);
    }
}
// --------------------------------Слон-------------------------------

class Bishop  extends Chess{
    name = "bishop";
    MisReal (newX, newY, arr) {
        this.arr = arr;
        if (newX!=this.posX && newY!=this.posY)
        if ((newX - this.posX == newY - this.posY )
        || (this.posX - newX == newY - this.posY)){
            
            if (newX > this.posX && newY > this.posY)
            while (newX!=this.posX && newY!=this.posY){
                if (arr[newX][newY] != undefined) {return false; break;}
                newX -=1; newY-= 1; 
            }
            if (newX > this.posX && newY < this.posY)
            while (newX!=this.posX && newY!=this.posY){
                if (arr[newX][newY] != undefined) {return false; break;}
                newX -=1; newY+= 1; 
            }
            if (newX < this.posX && newY > this.posY)
            while (newX!=this.posX && newY!=this.posY){
                if (arr[newX][newY] != undefined) {return false; break;}
                newX +=1; newY-= 1; 
            }
            if (newX < this.posX && newY < this.posY)
            while (newX!=this.posX && newY!=this.posY ){
                if (arr[newX][newY] != undefined) {return false; break;}
                newX +=1; newY+= 1; 
            }
            return true;
    }
    else return false;}
    KisReal (newX, newY,Ecolor){
        if (Ecolor != this.color){
            if ((newX == this.posX+1 && this.posY+1 == newY)
            || (newX == this.posX-1 && this.posY+1 == newY)
            || (newX == this.posX+1 && this.posY-1 == newY)
            || (newX == this.posX-1 && this.posY-1 == newY)) return true;
        if(newX>this.posX && newY > this.posY && this.MisReal(newX-1,newY-1,this.arr)==true) return true;
        if(newX<this.posX && newY > this.posY && this.MisReal(newX+1,newY-1,this.arr)==true) return true;
        if(newX > this.posX && newY < this.posY && this.MisReal(newX-1,newY+1,this.arr)==true) return true;
        if(newX < this.posX && newY < this.posY && this.MisReal(newX+1,newY+1,this.arr)==true) return true;
        else return false;}
        else return false;
    }

    getName (){
        return  (this.color + " Bishop " + this.posX);
    }
}
// --------------------------------Конь-------------------------------

class Horse extends Chess{
    name = "horse";
    MisReal(newX, newY, arr){
        if (((newX == this.posX + 2 || newX == this.posX - 2) && (newY == this.posY+1 || newY == this.posY-1)
        || (newX == this.posX + 1 || newX == this.posX - 1) && (newY == this.posY+2 || newY == this.posY-2))
        && arr[newX][newY]==undefined)
        return true;
        else return false;
    }

    IsKing() {return(false)};

    KisReal(newX, newY, Ecolor){
        if (((newX == this.posX + 2 || newX == this.posX - 2) && (newY == this.posY+1 || newY == this.posY-1)
        || (newX == this.posX + 1 || newX == this.posX - 1) && (newY == this.posY+2 || newY == this.posY-2))
        && Ecolor!=this.color)
        //if (arr[newX][newY].color != this.color)
        return true;
        else return false;
    }

    getName (){
        return  (this.color + " Horse " + this.posX);
    }
}
// --------------------------------Король------------------------------

class King extends Chess{
    name = "king";
    MisReal(newX, newY, arr){
        if((((newX == this.posX+1)||(newX == this.posX-1))&&((newY == this.posY+1)||(newY == this.posY-1))
        || (newX == this.posX) && (newY == this.posY+1 || newY == this.posY-1)
        || (newY == this.posY) && (newX == this.posX+1 || newX == this.posX-1)) && arr[newX][newY]==undefined)
        return true;
        else return false;
    }

    KisReal(newX, newY, Ecolor){
        if (((((newX == this.posX+1)||(newX == this.posX-1))&&((newY == this.posY+1)||(newY == this.posY-1))
        || (newX == this.posX) && (newY == this.posY+1 || newY == this.posY-1)
        || (newY == this.posY) && (newX == this.posX+1 || newX == this.posX-1))))
        if ( Ecolor != this.color ) return true;
        else return false;
    }

    getName (){
        return  (this.color + " King " + this.posX);
    }

    IsKing() {return(true)};
}
// -------------------------------Королева-----------------------------


class Qeen  extends Chess{
    name = "queen";
    MisReal (newX, newY, arr) {
        this.arr = arr;
        if (newX==this.posX && newY==this.posY) return false;
        else if (newX == this.posX && newY != this.posY){
            while (newY != this.posY){
                if(arr[newX][newY] != undefined) {return false; break;}
                if(arr[newX][newY] == undefined) {if (newY > this.posY) newY -=1; if (newY < this.posY) newY ++;}
                
            }return true;}
        else if (newY == this.posY && newX != this.posX){
            while (newX != this.posX){
                if(arr[newX][newY] != undefined) {return false; break;}
                if(arr[newX][newY] == undefined) {if (newX > this.posX) newX -=1; if (newX < this.posX) newX ++;}
                
            }return true;}

        else   if (newX!=this.posX && newY!=this.posY)
        if ((newX - this.posX == newY - this.posY )
        || (this.posX - newX == newY - this.posY)){
            
            if (newX > this.posX && newY > this.posY)
            while (newX!=this.posX && newY!=this.posY){
                if (arr[newX][newY] != undefined) {return false; break;}
                newX -=1; newY-= 1; 
            }
            if (newX > this.posX && newY < this.posY)
            while (newX!=this.posX && newY!=this.posY){
                if (arr[newX][newY] != undefined) {return false; break;}
                newX -=1; newY+= 1; 
            }
            if (newX < this.posX && newY > this.posY)
            while (newX!=this.posX && newY!=this.posY){
                if (arr[newX][newY] != undefined) {return false; break;}
                newX +=1; newY-= 1; 
            }
            if (newX < this.posX && newY < this.posY)
            while (newX!=this.posX && newY!=this.posY ){
                if (arr[newX][newY] != undefined) {return false; break;}
                newX +=1; newY+= 1; 
            }
        }
        
        else return false;
            return true;

    }
    IsKing() {return(false)};

    KisReal (newX, newY,Ecolor){
        if (Ecolor != this.color){
            if 
             ( ((newX > this.posX && newY == this.posY && this.MisReal(newX-1,newY,this.arr)==true) 
             || (newX < this.posX && newY == this.posY && this.MisReal(newX+1,newY,this.arr)==true) 
             ||(newX == this.posX && newY > this.posY && this.MisReal(newX,newY-1,this.arr)==true) 
             || (newX == this.posX && newY < this.posY && this.MisReal(newX,newY+1,this.arr)==true))) return true;
             else if  (((((newX == this.posX+1)||(newX == this.posX-1))&&((newY == this.posY+1)||(newY == this.posY-1))
             || (newX == this.posX) && (newY == this.posY+1 || newY == this.posY-1)
             || (newY == this.posY) && (newX == this.posX+1 || newX == this.posX-1)))) return true;
            else if
             ( (newX > this.posX && newY > this.posY && this.MisReal(newX-1,newY-1,this.arr)==true  && (this.posX - newX)==(this.posY - newY))
             || (newX < this.posX && newY > this.posY && this.MisReal(newX+1,newY-1,this.arr)==true && (this.posX+this.posY)-(newX+1+newY-1)==0)
             || (newX > this.posX && newY < this.posY && this.MisReal(newX-1,newY+1,this.arr)==true && (this.posX+this.posY)-(newX-1+newY+1)==0)
             || (newX < this.posX && newY < this.posY && this.MisReal(newX+1,newY+1,this.arr)==true && (this.posX - newX)==(this.posY - newY) )) return true;
             else return false;}
        else return false; 
    }

    getName (){
        return  (this.color + " Queen " + this.posX);
    }
}

// let table = new Array(8);
// for (var i = 0; i < table.length; i++) {
//     table [i] = new Array(8);

// }



function colorSwitch(PlayerColor){
    if (PlayerColor == ("black"))
    return "white";
    else if (PlayerColor == ("white"))
    return "black";
}

function start (table){
    for (i=0;i<=77;i++){
        y = (i-(i%10))/10;
        x = i%10;
        if (i < 40) c = "black";
        else c = "white";
        if(i >= 10)
            t = document.getElementById(i.toString());
        if(i < 10)
            t = document.getElementById("0"+i.toString());
        // ---------------------
        if ((i >= 10 && i <= 17) || i>=60 && i<=67){
            table[x][y] = new Pawn (c, x, y);
            t.textContent = table[x][y].getName();
        }
        // ----------------------
        if (i == 0 || i == 7 || i == 70 || i == 77){
            table[x][y] = new Rook (c, x, y);
            t.textContent = table[x][y].getName();
        }
        //-----------------------
        if (i == 2 || i == 5 || i == 72 || i == 75 ){
            table[x][y] = new Bishop (c, x, y);
            t.textContent = table[x][y].getName();
        }
        //-----------------------
        if (i == 1 || i == 6 || i == 71 || i == 76 ){
            table[x][y] = new Horse (c, x, y);
            t.textContent = table[x][y].getName();
        }
        //-----------------------
        if (i == 3 || i == 73 ){
            table[x][y] = new King (c, x, y);
            t.textContent = table[x][y].getName();
        }
        //-----------------------
        if (i == 4 || i == 74 ){
            table[x][y] = new Qeen (c, x, y);
            t.textContent = table[x][y].getName();
        }
    }

    colorOK();
}


function ChessOnClickk(id, PlayerColor, table, Mx, My, MStage){
    
    t = document.getElementById(id.toString());
    y = (id-(id%10))/10;
    x = id%10;
    if (table[x][y] != null || table[x][y] != undefined){
    //ches = table[x][y].getName();
    //Ccolor = ches.slice(0,ches.indexOf(" "));
    Ccolor = table[x][y].color;
    //Cname = ches.slice(ches.indexOf(" ")+1,ches.indexOf(" ",ches.indexOf(" ")+1));
    }

    if (MStage == false && Ccolor == PlayerColor){
    for (i=0;i<=77;i++){
        yt = (i-(i%10))/10;
        xt = i%10;
        console.log("xt:" + xt + "  yt:" +yt);
        console.log("x:" + x + "  y:" +y);
        if ( table[x][y] != undefined && table[x][y].MisReal(xt, yt, table) == true){
            tt = document.getElementById(yt + "" + xt);
            tt.style.backgroundColor="Green";
            MStage = true;
            Mx = x; My = y;
        }
        if ( table[xt][yt] != undefined && (table[x][y]) != null ){
        if (table[x][y].KisReal(xt, yt, table[xt][yt].getColor())==true){
            tt = document.getElementById(yt + "" + xt);
            tt.style.backgroundColor="Red";
            MStage = true;
            Mx = x; My = y;
        }}
        if ( xt == 7 ) i+=2;
    }
    return ({
        table : table,
        Mx : Mx,
        My : My, 
        MStage : MStage
    });
}

    else{
        console.log(table[Mx][My].name);
        console.log("x:" + x + "  y:" +y);
        if (MStage == true && Ccolor == PlayerColor && table[Mx][My].MisReal(x, y, table) || (MStage == true && table[Mx][My].KisReal(x, y, table[x][y].getColor()))){
            //if (Cname == "King") {alert ("Game Over"); break;}
            //else {
                if (table[x][y]!=undefined)
                    if(Kinge(ches)==true){
                    alert ("Game Over, the winner is " + PlayerColor);
                    location.reload()}
                
        table[x][y] = table[Mx][My];
        table[x][y].setCords(x,y);
        t.textContent = table[x][y].getName();
        tt = document.getElementById(My + "" + Mx);
        tt.textContent = "";
        table[Mx][My] = undefined;
        Mx = null; My = null;
        MStage = false;
        //PlayerColor = colorSwitch(PlayerColor);
        colorOK();
            //}
            return ({
                table : table,
                Mx : Mx,
                My : My, 
                MStage : MStage
            });
    }
    
else if (PlayerColor != Ccolor) alert ("Ты куда едешь ?");
}
}

function Kinge(chessname){
    Ccname = ches.slice(ches.indexOf(" ")+1,ches.indexOf(" ",ches.indexOf(" ")+1));
    if (Ccname == "King") return (true);
    else return (false);
}

function colorOK(){
    for (i=0;i<=77;i++){
        y = (i-(i%10))/10;
        x = i%10;
        t = document.getElementById(y + "" + x);
        if ((x%2 == 0 && y%2 == 0)||(x%2 != 0 && y%2 != 0))
            t.style.backgroundColor = "rgb(134, 35, 35)";
        else
            t.style.backgroundColor = "rgb(233, 132, 92)";
        if ( x == 7) i+=2;
    }
}

function OnClickk (table) {
    if(table[4][1].MisReal(4,2,table) == true){
    table[4][2] = table[4][1];
    table[4][1] = undefined;
    return(table);}
}
