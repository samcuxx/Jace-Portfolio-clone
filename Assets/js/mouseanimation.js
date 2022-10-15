var canvas = document.querySelector("canvas");
const wrapper = document.querySelector(".wrapper");
canvas.width = wrapper.clientWidth;
canvas.height = wrapper.clientHeight;

var c = canvas.getContext("2d");

let mouse = {
    x: undefined,
    y: undefined,
    out: false,
}

let maxRadius = 40;
let minRadius = 2;

var colorArray = [
    "#A93CE6",
    "#803EF0", 
    "#5243D9", 
    "#3E5CF0", 
    "#3C85E6", 
];

window.addEventListener("mousemove", function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
    mouse.out = false;
})

window.addEventListener("touchmove", function(event) {
    mouse.x = event.touches[0].clientX;
    mouse.y = event.touches[0].clientY;
    mouse.out = false;
})

window.addEventListener("mouseout", function(){
    mouse.out = true;
})

window.addEventListener("touchend", function() {
    mouse.out = true;
})

window.addEventListener("resize", function(){
    canvas.width = wrapper.clientWidth;
    canvas.height = wrapper.clientHeight;
    init();
})

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color =    colorArray[Math.floor(Math.random()*colorArray.length)]; 

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c.fillStyle = this.color;
        c.fill();
    }
    this.update = function() {
        if (this.x + this.radius> innerWidth || this.x - this.radius <= 0) {
            this.dx = -this.dx;
        } 
        if (this.y + this.radius > innerHeight || this.y - this.radius <= 0 ){
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        // Interactivity
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50
            && mouse.y - this.y < 50 && mouse.y - this.y > -50 
            && mouse.out === false
            ) {
                if (this.radius < maxRadius){
                    this.radius += 1;
                }
         
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }

        if (mouse.out === true && this.radius > this.minRadius) {
            this.radius -= 1;
        }
        

        this.draw();
    }
}



let circleArray = [];

function init() {
    circleArray = [];
    for (let i = 0; i< 1000; i++) {
    const radius = Math.random()*0 + 0;
    let x = Math.random()*(canvas.width - 2*radius) + radius;
    let dx = (Math.random() - 0.5)*4;
    let y = Math.random()*(canvas.height - 2*radius) + radius;
    let dy = (Math.random() - 0.5)*4;
    circleArray.push(new Circle(x, y, dx, dy, radius));
}
}



function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
  
    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
    
}

animate();
init();
