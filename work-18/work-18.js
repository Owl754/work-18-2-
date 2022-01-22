var cvs = document.getElementById("canvas"); //Определили холст на котором будем творить
var ctx = cvs.getContext("2d"); //Определили контекст холста

// Определяем картиночки!
var ball = new Image(); 
var bg = new Image();
var pad = new Image();

// Через src определяем путь, 

ball.src = "ball.png"
bg.src = "bg.jpg"
pad.src = "pad.png"

//Описание платформы
var padX = 300; //Координаты платформы по Х
var padY = 500; //Координаты платформы по Y
var padWidth= 200;  //Шир платформы
var padHeight = 50; //Выс платформы

var xPos = 0; //Координаты мяча по Х
var yPos = 0; //Координаты мяча по Y

// скорость мяча
var grav = 3; //По вертикали
var gravSide = 3; //По горизонтали





//Событие, если мы нажмём на клавишу А
document.addEventListener("keydown", function(event){
    if (event.code == 'KeyA'){
        movePadLeft(); //Мы сдвинем платформу влево
    }
});

//Событие, если мы нажмём на клавишу D
document.addEventListener("keydown", function(event){
    if (event.code == 'KeyD'){
        movePadRight(); //Мы сдвинем платформу вправо
    }
});

function movePadLeft(){
    padX -= 23; //Мы поменяем координату платформы. При выполнении платформа уйдет на 20 пикселей влево
}

function movePadRight(){
    padX += 23; //А здесь на 20 пикселей вправо
}

//Как мяч будет отталкиваться от стен
function bounce(){
        if(yPos+ball.height > cvs.height){  //Если мяч коснётся пола
            grav = -grav; //Гравитация мяча поменяется :)
        
        }
        if(yPos < 0){ //Если мяч коснётся потолка
            grav = -grav; //Мяч обратно поедет вниз
        }

        if(xPos+ball.width > cvs.width){ //Если мяч коснулся стены
           
            gravSide = -gravSide; //Мяч отобъёт в бок

        }
        if(xPos < 0){ //Если мяч коснулся стены
            gravSide = -gravSide; //Мяч отобъёт в бок
        }
        
        // отбивание мяча от платформы
        if(yPos+ball.height > padY && (xPos > padX && xPos < padX + padWidth || (xPos+ball.width > padX && xPos+ball.width < padX + padWidth))){
            grav = -grav;
        }
}

function knockPad(){
  if(padX < 0){  //Если платформа коснётся  левого края
    grav = -grav
      }
}

//Рисовка
function draw(){
    ctx.drawImage(bg, 0, 0); // задний фон 
    ctx.drawImage(ball, xPos, yPos); //Картиночка мяча. xPos и yPos - положение мяча
    ctx.fillRect(padX,padY,padWidth,padHeight); //Созд платформы
    ctx.fillStyle = "#2234056"; //Цвет платформы
    

    yPos += grav; //Мяч будет вечно летать
    xPos += gravSide; //Мяч будет вечно летать

    requestAnimationFrame(draw); //Говорим, что будет происходить анимация
    requestAnimationFrame(bounce); //Говорим, что будет происходить анимация
    requestAnimationFrame(knockPad); //Говорим, что будет происходить анимация

}

//Пропишем, что прорисовка будет происходить при загрузке всех картиночек
bg.onload = draw;
ball.onload = draw;
pad.onload = draw;