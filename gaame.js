class Chess {
    constructor (name, color, posX, posY){
        this.name = name;
        icon = "";
        this.color = color;
        this.posX = posX;
        this.posY = posY;
    }

    setCords (newX, newY){
        this.posX = newX;
        this.posY = newY;
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
            table[x][y] = new Chess ('pawn', c, x, y);
            table[x][y].icon = 'icons/w_pawn.png'
            t.src = table[x][y].icon;
        }
        // ----------------------
        if (i == 0 || i == 7 || i == 70 || i == 77){
            table[x][y] = new Chess ('rook', c, x, y);
            t.textContent =tablee[x][y].color + " " + tablee[x][y].name;
        }
        //-----------------------
        if (i == 2 || i == 5 || i == 72 || i == 75 ){
            table[x][y] = new Chess ('bishop', c, x, y);
            t.textContent =tablee[x][y].color + " " + tablee[x][y].name;
        }
        //-----------------------
        if (i == 1 || i == 6 || i == 71 || i == 76 ){
            table[x][y] = new Chess ('horse', c, x, y);
            t.textContent = tablee[x][y].color + " " + tablee[x][y].name;
        }
        //-----------------------
        if (i == 3 || i == 73 ){
            table[x][y] = new Chess ('king', c, x, y);
            t.textContent = tablee[x][y].color + " " + tablee[x][y].name;
        }
        //-----------------------
        if (i == 4 || i == 74 ){
            table[x][y] = new Chess ('queen', c, x, y);
            t.textContent = tablee[x][y].color + " " + tablee[x][y].name;
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
                if (KillisReal(table[x][y], xt, yt, table, table[xt][yt].color)==true){
                    tt = document.getElementById(yt + "" + xt);
                    tt.style.backgroundColor="Red";
                }}
        if ( xt == 7 ) i+=2;
        }
        GO = false;
        return ({
            table : table,
            Mx : Mx,
            My : My, 
            MStage : MStage,
            Tcolor : Tcolor,
            GO : GO
        });
    }


    if (MStage == true && table[Mx][My] != undefined){
        if(x == Mx && y == My){
            MStage = false;
            Mx = null;
            My = null;
            colorOK();
            return ({
                table : table,
                Mx : Mx,
                My : My, 
                MStage : MStage,
                Tcolor : Tcolor,
                GO : GO
            });
        }

        else if (MoveisReal(table[Mx][My], x, y, table) == true || KillisReal(table[Mx][My], x, y, table, table[x][y].color) == true){
            if (table[x][y] != undefined && table[x][y].name == 'king'){
                table[x][y] = table[Mx][My];
                table[x][y].posX=x;
                table[x][y].posY=y;
                table[Mx][My] = undefined;
                Mx = null; My = null;
                MStage = false;
                Tcolor = colorSwitch(Tcolor);
                colorOK();
                GO = true
                return ({
                    table : table,
                    Mx : Mx,
                    My : My, 
                    MStage : MStage,
                    Tcolor : Tcolor,
                    GO : GO
                });
            }
            else {
            table[x][y] = table[Mx][My];
            table[x][y].posX=x;
            table[x][y].posY=y;
            table[Mx][My] = undefined;
            Mx = null; My = null;
            MStage = false;
            Tcolor = colorSwitch(Tcolor);
            colorOK();
            GO = false
            return ({
                table : table,
                Mx : Mx,
                My : My, 
                MStage : MStage,
                Tcolor : Tcolor,
                GO : GO
            });
            }
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

        if (ches.name == 'pawn'){
            if ((newX == ches.posX && newY == ches.posY-1 && ches.color == "white") 
            || (newX == ches.posX && newY == ches.posY+1 && ches.color == "black")
            || (ches.posY == 1 && newX == ches.posX && newY == ches.posY+2 && ches.color == "black")
            || (ches.posY == 6 && newX == ches.posX && newY == ches.posY-2 && ches.color == "white"))
            if ((arr[newX][newY])==undefined)
            return (true);
            else
            return (false);
        }

        else if (ches.name == 'rook'){
            
        if (newX == ches.posX && newY != ches.posY){
            while (newY != ches.posY){
                if(arr[newX][newY] != undefined) {return false;}
                if(arr[newX][newY] == undefined) {if (newY > ches.posY) newY -=1; if (newY < ches.posY) newY ++;}
                
            }return true;}
        if (newY == ches.posY && newX != ches.posX){
            while (newX != ches.posX){
                if(arr[newX][newY] != undefined) {return false; break;}
                if(arr[newX][newY] == undefined) {if (newX > ches.posX) newX -=1; if (newX < ches.posX) newX ++;}
                
            }return true;}

        else return false;
        }

        else if (ches.name == 'bishop'){
            if (newX!=ches.posX && newY!=ches.posY)
            if ((newX - ches.posX == newY - ches.posY )
            || (ches.posX - newX == newY - ches.posY)){
                
                if (newX > ches.posX && newY > ches.posY)
                while (newX!=ches.posX && newY!=ches.posY){
                    if (arr[newX][newY] != undefined) {return false; break;}
                    newX -=1; newY-= 1; 
                }
                if (newX > ches.posX && newY < ches.posY)
                while (newX!=ches.posX && newY!=ches.posY){
                    if (arr[newX][newY] != undefined) {return false; break;}
                    newX -=1; newY+= 1; 
                }
                if (newX < ches.posX && newY > ches.posY)
                while (newX!=ches.posX && newY!=ches.posY){
                    if (arr[newX][newY] != undefined) {return false; break;}
                    newX +=1; newY-= 1; 
                }
                if (newX < ches.posX && newY < ches.posY)
                while (newX!=ches.posX && newY!=ches.posY ){
                    if (arr[newX][newY] != undefined) {return false; break;}
                    newX +=1; newY+= 1; 
                }
                return true;
        }
        else return false;
        }

        else if (ches.name == 'horse'){
            if (((newX == ches.posX + 2 || newX == ches.posX - 2) && (newY == ches.posY+1 || newY == ches.posY-1)
            || (newX == ches.posX + 1 || newX == ches.posX - 1) && (newY == ches.posY+2 || newY == ches.posY-2))
            && arr[newX][newY]==undefined)
            return true;
            else return false;
        }

        else if (ches.name == 'king'){
            if((((newX == ches.posX+1)||(newX == ches.posX-1))&&((newY == ches.posY+1)||(newY == ches.posY-1))
            || (newX == ches.posX) && (newY == ches.posY+1 || newY == ches.posY-1)
            || (newY == ches.posY) && (newX == ches.posX+1 || newX == ches.posX-1)) && arr[newX][newY]==undefined)
            return true;
            else return false;
        }

        else if (ches.name == 'queen'){
            if (newX==ches.posX && newY==ches.posY) return false;
            else if (newX == ches.posX && newY != ches.posY){
                while (newY != ches.posY){
                    if(arr[newX][newY] != undefined) {return false; break;}
                    if(arr[newX][newY] == undefined) {if (newY > ches.posY) newY -=1; if (newY < ches.posY) newY ++;}
                    
                }return true;}
            else if (newY == ches.posY && newX != ches.posX){
                while (newX != ches.posX){
                    if(arr[newX][newY] != undefined) {return false; break;}
                    if(arr[newX][newY] == undefined) {if (newX > ches.posX) newX -=1; if (newX < ches.posX) newX ++;}
                    
                }return true;}
    
            else   if (newX!=ches.posX && newY!=ches.posY)
            if ((newX - ches.posX == newY - ches.posY )
            || (ches.posX - newX == newY - ches.posY)){
                
                if (newX > ches.posX && newY > ches.posY)
                while (newX!=ches.posX && newY!=ches.posY){
                    if (arr[newX][newY] != undefined) {return false; break;}
                    newX -=1; newY-= 1; 
                }
                if (newX > ches.posX && newY < ches.posY)
                while (newX!=ches.posX && newY!=ches.posY){
                    if (arr[newX][newY] != undefined) {return false; break;}
                    newX -=1; newY+= 1; 
                }
                if (newX < ches.posX && newY > ches.posY)
                while (newX!=ches.posX && newY!=ches.posY){
                    if (arr[newX][newY] != undefined) {return false; break;}
                    newX +=1; newY-= 1; 
                }
                if (newX < ches.posX && newY < ches.posY)
                while (newX!=ches.posX && newY!=ches.posY ){
                    if (arr[newX][newY] != undefined) {return false; break;}
                    newX +=1; newY+= 1; 
                }
            }
            
            else return false;
                return true;
        }
}

function KillisReal (ches, newX, newY, arr, Ecolor){
    switch (ches.name) {

        case 'pawn':{
            if (
                (((newX == ches.posX+1)||(newX == ches.posX-1)) && newY == ches.posY-1 && ches.color != Ecolor && ches.color == "white") 
            || (((newX == ches.posX+1)||(newX == ches.posX-1)) && newY == ches.posY+1 && ches.color != Ecolor && ches.color == "black"))
            return true;
            else
            return false;
        }

        case 'rook':{
            if (Ecolor != ches.color){
                if ((newX == ches.posX+1 && ches.posY == newY)
                || (newX == ches.posX-1 && ches.posY == newY)
                || (newX == ches.posX && ches.posY+1 == newY)
                || (newX == ches.posX && ches.posY-1 == newY)) return true;
            if(newX>ches.posX && newY == ches.posY && MoveisReal(ches, newX-1, newY, arr)==true) return true;
            if(newX<ches.posX && newY == ches.posY && MoveisReal(ches, newX+1, newY, arr)==true) return true;
            if(newX == ches.posX && newY > ches.posY && MoveisReal(ches, newX, newY-1, arr)==true) return true;
            if(newX == ches.posX && newY < ches.posY && MoveisReal(ches, newX, newY+1, arr)==true) return true;
            else return false;}
            else return false;
        }

        case 'bishop':{
            if (Ecolor != ches.color){
                if ((newX == ches.posX+1 && ches.posY+1 == newY)
                || (newX == ches.posX-1 && ches.posY+1 == newY)
                || (newX == ches.posX+1 && ches.posY-1 == newY)
                || (newX == ches.posX-1 && ches.posY-1 == newY)) return true;
            if(newX>ches.posX && newY > ches.posY && MoveisReal(ches, newX-1, newY-1, arr)==true) return true;
            if(newX<ches.posX && newY > ches.posY && MoveisReal(ches, newX+1, newY-1, arr)==true) return true;
            if(newX > ches.posX && newY < ches.posY && MoveisReal(ches, newX-1, newY+1, arr)==true) return true;
            if(newX < ches.posX && newY < ches.posY && MoveisReal(ches, newX+1, newY+1, arr)==true) return true;
            else return false;}
            else return false;
        }

        case 'horse':{
            if (((newX == ches.posX + 2 || newX == ches.posX - 2) && (newY == ches.posY+1 || newY == ches.posY-1)
            || (newX == ches.posX + 1 || newX == ches.posX - 1) && (newY == ches.posY+2 || newY == ches.posY-2))
            && Ecolor!=ches.color)
            return true;
            else return false;
        }

        case 'king':{
            if (((((newX == ches.posX+1)||(newX == ches.posX-1))&&((newY == ches.posY+1)||(newY == ches.posY-1))
            || (newX == ches.posX) && (newY == ches.posY+1 || newY == ches.posY-1)
            || (newY == ches.posY) && (newX == ches.posX+1 || newX == ches.posX-1))))
            if ( Ecolor != ches.color ) return true;
            else return false;
        }

        case 'queen':{
            if (Ecolor != ches.color){
                if 
                 ( ((newX > ches.posX && newY == ches.posY && MoveisReal(ches, newX-1,newY, arr)==true) 
                 || (newX < ches.posX && newY == ches.posY && MoveisReal(ches, newX+1,newY, arr)==true) 
                 ||(newX == ches.posX && newY > ches.posY && MoveisReal(ches, newX,newY-1, arr)==true) 
                 || (newX == ches.posX && newY < ches.posY && MoveisReal(ches, newX,newY+1, arr)==true))) return true;
                 else if  (((((newX == ches.posX+1)||(newX == ches.posX-1))&&((newY == ches.posY+1)||(newY == ches.posY-1))
                 || (newX == ches.posX) && (newY == ches.posY+1 || newY == ches.posY-1)
                 || (newY == ches.posY) && (newX == ches.posX+1 || newX == ches.posX-1)))) return true;
                else if
                 ( (newX > ches.posX && newY > ches.posY && MoveisReal(ches, newX-1,newY-1, arr)==true  && (ches.posX - newX)==(ches.posY - newY))
                 || (newX < ches.posX && newY > ches.posY && MoveisReal(ches, newX+1,newY-1, arr)==true && (ches.posX+ches.posY)-(newX+1+newY-1)==0)
                 || (newX > ches.posX && newY < ches.posY && MoveisReal(ches, newX-1,newY+1, arr)==true && (ches.posX+ches.posY)-(newX-1+newY+1)==0)
                 || (newX < ches.posX && newY < ches.posY && MoveisReal(ches, newX+1,newY+1, arr)==true && (ches.posX - newX)==(ches.posY - newY) )) return true;
                 else return false;}
            else return false; 
        }

        default:{
            return(false)
      }
    }
}