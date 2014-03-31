//Lets create a simple particle system in HTML5 canvas and JS

//Initializing the canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//Canvas dimensions
var W = 500; var H = 500;
function explosion(epicenter,radius,particles_count)
{
    I={};
    I.x = epicenter.x;
    I.y = epicenter.y;
    I.radius = radius;
    I.particles_count =particles_count;
    I.particles = [];
    
    I.fill_particle = function()
    {
        var pcount = I.particles_count - I.particles.length;
        for(var i = 0; i < pcount; i++)
        {
        	particles.push(new create_particle());
        }

    }

    

}

//Lets create an array of particles
var particles = [];
fill_particle();
function fill_particle()
{
for(var i = 0; i < 50; i++)
{
	//This will add 50 particles to the array with random positions
	particles.push(new create_particle());
}

}

//Lets create a function which will help us to create multiple particles
function create_particle()
{
	//Random position on the canvas
	this.x = W/2;
	this.y = H/2;
	this.status =1;
	//Lets add random velocity to each particle
	this.vx = Math.random()*10-5;
	this.vy = Math.random()*10-5;
	
	//Random colors
	var r = Math.random()*255>>0;
	var g = Math.random()*255>>0;
	var b = Math.random()*255>>0;
	this.color = "rgba("+r+", "+g+", "+b+", 0.5)";
	
	//Random size
	this.radius = Math.random()*10+10;
}

var x = 100; var y = 100;

//Lets animate the particle
function draw()
{
	//Moving this BG paint code insde draw() will help remove the trail
	//of the particle
	//Lets paint the canvas black
	//But the BG paint shouldn't blend with the previous frame
	ctx.globalCompositeOperation = "source-over";
	//Lets reduce the opacity of the BG paint to give the final touch
	ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
	ctx.fillRect(0, 0, W, H);
	
	//Lets blend the particle with the BG
	ctx.globalCompositeOperation = "lighter";
	
	//Lets draw particles from the array now
	for(var t = 0; t < particles.length; t++)
	{
		var p = particles[t];
		
		ctx.beginPath();
		
		//Time for some colors
		var gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
		gradient.addColorStop(0, "white");
		gradient.addColorStop(0.4, "white");
		gradient.addColorStop(0.4, p.color);
		gradient.addColorStop(1, "black");
		
		ctx.fillStyle = gradient;
		ctx.arc(p.x, p.y, p.radius, Math.PI*2, false);
		ctx.fill();
		
		//Lets use the velocity now
        p.radius--;
		p.x += p.vx;
		p.y += p.vy;
		
		//To prevent the balls from moving out of the canvas
        /*
		if(p.x < -50) p.x = W+50;
		if(p.y < -50) p.y = H+50;
		if(p.x > W+50) p.x = -50;
		if(p.y > H+50) p.y = -50;
        */
        if(p.x<0||p.x>W || p.y<0||p.y>H || p.radius<3)
        {
             p.status = 0;   
        }
	}
    particles = particles.filter(function(item) {
            return item.status==1;
          });
    if(particles.length < 3)
    {
        fill_particle();
    }
}

setInterval(draw, 33);
//I hope that you enjoed t