var font;

function preload() {
  font = loadFont("fonts/Goldana Base.otf");
  this.words = [];
  this.words.push("BUTTER");
  this.words.push("TOAST");
  this.words.push("BACON");
  this.words.push("BOOM");
  this.words.push("NOOB");
  this.words.push("EIS");
  this.words.push("CRÊPE");
}

function setup() {
  var myCanvas = createCanvas(800, 300);
  background(51);

  this.vehicles = [];

  var points = font.textToPoints("CLICK", 100, 230, 300);

  for (var i in points){
    var pt = points[i];
    var vehicle = new Vehicle(pt.x, pt.y);
    this.vehicles.push(vehicle);
  }
}

function getRandomWord() {
  return this.words[Math.floor((Math.random() * this.words.length))];
}

function mousePressed() {
  var points = font.textToPoints(getRandomWord(), 100, 230, 300);

  for (var i in points){
    if (this.vehicles[i]){
      this.vehicles[i].target = createVector(points[i].x, points[i].y);
      this.vehicles[i].vel = p5.Vector.random2D().mult(10);
      this.vehicles[i].delete = false;
    } else {
      var pt = points[i];
      var vehicle = new Vehicle(pt.x, pt.y);
      this.vehicles.push(vehicle);
    }
  }

  if(points.length < this.vehicles.length){
    for (var i = points.length; i < this.vehicles.length; i++){
      this.vehicles[i].target = createVector(points[i % points.length].x, points[i % points.length].y);
      this.vehicles[i].vel = p5.Vector.random2D().mult(10);
      this.vehicles[i].delete = true;
    }
  }

}

function draw() {
  background(51);
  for (var i in this.vehicles){
    var vehicle = this.vehicles[i];
    vehicle.behaviors();
    vehicle.update();
    vehicle.show();

    if (vehicle.delete && vehicle.vel.mag() < 0.3){
      this.vehicles.splice(i, 1);
    }
  }
}