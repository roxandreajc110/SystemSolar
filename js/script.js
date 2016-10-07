
var planet_name = ["earth","pluton","namekusei","mars","mercury","jupiter","uranus","venus","neptune"];
var Planet = function(){
  return {
    clockwise_translation: Math.round(Math.random()),
    size: Math.random() * (100 - 10) + 10,
    speed: Math.random() * (100 - 1) + 1, //deg/s
    color: "#AAA",
    orbit_size: Math.random() * (400 - 200) + 200,
    orbit_position: Math.random() * 360,
    name: planet_name.pop(),
    dom_orbit: null,
    dom_planet: null,
    rotation_process_id : null,
    getSize: function(){
      return this.size + "px";
    },
    getSpeed: function(){
      return this.speed + "deg";
    },
    getOrbitSize: function(){
      return this.orbit_size + "px";
    },
    pushDOMElement: function(dom_parent){
      //Create elements Html for insert a new planet
      var planet_orbit = document.createElement("li");
      var planet_body = document.createElement("span");
      planet_body.textContent = this.name;
      planet_body.setAttribute("class","planet");
      //decir que span es hijo de li
      planet_orbit.appendChild(planet_body);
      planet_body.style.width = this.getSize();
      planet_body.style.height = this.getSize();
      planet_orbit.style.position = "absolute";
      planet_orbit.style.width = this.getOrbitSize();
      planet_orbit.style.height = this.getOrbitSize();
      planet_orbit.style.top = 0;
      planet_orbit.style.left = 0;
      planet_body.style.position = "absolute";
      planet_orbit.style.transform = "rotate("+ this.orbit_position + "deg)";
      planet_orbit.style.transformOrigin = "top left";
      planet_body.style.bottom = 0;
      planet_body.style.right = 0;
      //agregar a html
      dom_parent.appendChild(planet_orbit);
      this.dom_orbit = planet_orbit;
      this.dom_planet = planet_body;
    },
    startRotation: function(){
      var self = this;
      var freq = 10;
      this.rotation_process_id = setInterval(function(){
        if(self.clockwise_translation === 1){
          self.orbit_position += self.speed/freq;}
        else{
      //  console.log(this);
          self.orbit_position -= self.speed/freq;
        }
        self.dom_orbit.style.transform = "rotate("+self.orbit_position+"deg)";
      },100);
    },
    addEventHandlertoStop: function(){
      var self = this;
      this.dom_planet.addEventListener("mouseover", function(){
        clearInterval(self.rotation_process_id);
      });
    }
  };
};


var number_of_planets = 8;
var planets = [];

while(number_of_planets-- >0){
  //var new_planet = Planet();
  //new_planet.pushDOMElement();
  planets.push(Planet());//agregar al array;

}

document.addEventListener("DOMContentLoaded", function(){
  var planetary_system = document.querySelector(".planets");
  for(var planet_pos in planets){
    planets[planet_pos].pushDOMElement(planetary_system);
    planets[planet_pos].startRotation();
    planets[planet_pos].addEventHandlertoStop();
  }
  var sun = document.querySelector("#sun");

  sun.addEventListener("click", function(){
    for(var planet_pos in planets){
      // planets[planet_pos].pushDOMElement(planetary_system);
      // planets[planet_pos].startRotation();
      // planets[planet_pos].addEventHandlertoStop();
    }




  });





});





console.log(planets);
