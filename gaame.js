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
            t.textContent =tablee[x][y].color + " " + tablee[x][y].name;
        }
        // ----------------------
        if (i == 0 || i == 7 || i == 70 || i == 77){
            table[x][y] = new Rook (c, x, y);
            t.textContent =tablee[x][y].color + " " + tablee[x][y].name;
        }
        //-----------------------
        if (i == 2 || i == 5 || i == 72 || i == 75 ){
            table[x][y] = new Bishop (c, x, y);
            t.textContent =tablee[x][y].color + " " + tablee[x][y].name;
        }
    }
    colorOK();
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

function colorSwitch(color){
    if (color == 'white'){
        color = 'black';
        return (color)
    }
    if (color == 'black'){
        color = 'white';
        return (color)
    }
}

function ChessOnClickk(id, PlayerColor, table, Mx, My, MStage, Tcolor){
    y = (id-(id%10))/10;
    x = id%10;

    //console.log ('Pc:' + PlayerColor + "  Tc:" +  Tcolor + "  Cc" + table[x][y].color);

    if ( table[x][y] != undefined && MStage == false && (PlayerColor == Tcolor && PlayerColor == table[x][y].color) ) {
        Mx = x; My = y;
        MStage = true;
        for (i=0;i<=77;i++){
            yt = (i-(i%10))/10;
            xt = i%10;

            if (MoveisReal(table[x][y], xt, yt, table) == true){
                tt = document.getElementById(yt + "" + xt);
                tt.style.backgroundColor="Green";
            }
            if (table[xt][yt] != undefined){
                if (KillisReal(table[x][y], xt, yt, table[xt][yt].color)==true){
                    tt = document.getElementById(yt + "" + xt);
                    tt.style.backgroundColor="Red";
                }}
        if ( xt == 7 ) i+=2;
        }
        return ({
            table : table,
            Mx : Mx,
            My : My, 
            MStage : MStage,
            Tcolor : Tcolor
        });
    }


    if (MStage == true && table[Mx][My] != undefined){
        if (MoveisReal(table[Mx][My], x, y, table) == true || KillisReal(table[Mx][My], x, y, table[x][y].color) == true){
            table[x][y] = table[Mx][My];
            table[x][y].posX=x;
            table[x][y].posY=y;
            table[Mx][My] = undefined;
            Mx = null; My = null;
            MStage = false;
            console.log ("1:" + Tcolor);
            Tcolor = colorSwitch(Tcolor);
            console.log ("2:" + Tcolor);
            colorOK();
            return ({
                table : table,
                Mx : Mx,
                My : My, 
                MStage : MStage,
                Tcolor : Tcolor
            });
        }
    }

    else {
        alert ("ta kuda");
        return ({
            table : table,
            Mx : Mx,
            My : My, 
            MStage : MStage,
            Tcolor : Tcolor
        });
    }

}









function MoveisReal (ches, newX, newY, arr){
    switch (ches.name) {
        case 'pawn':{
            if ((newX == ches.posX && newY == ches.posY-1 && ches.color == "white") 
            || (newX == ches.posX && newY == ches.posY+1 && ches.color == "black")
            || (ches.posY == 1 && newX == ches.posX && newY == ches.posY+2 && ches.color == "black")
            || (ches.posY == 6 && newX == ches.posX && newY == ches.posY-2 && ches.color == "white"))
            if ((arr[newX][newY])==undefined)
            return (true);
            else
            return (false);
        }
        default:{
            return(false)
      }
    }
}

function KillisReal (ches, newX, newY, Ecolor){
    switch (ches.name) {
        case 'pawn':{
            if (
                (((newX == ches.posX+1)||(newX == ches.posX-1)) && newY == ches.posY-1 && ches.color != Ecolor && ches.color == "white") 
            || (((newX == ches.posX+1)||(newX == ches.posX-1)) && newY == ches.posY+1 && ches.color != Ecolor && ches.color == "black"))
            return true;
            else
            return false;
        }
        default:{
            return(false)
      }
    }
}