class Bullet
{
    constructor(x,y,w,h)
    {
        var options ={
            isStatic: true,
            friction: 1,
            density: 1,
        }
        this.image = loadImage('assets/laser.png');
        this.body = Bodies.rectangle(x,y,w,h,options)
        this.w = w;
        this.h = h
        this.trajectory = [];

        //flag value
       
        this.speed = 0.05;
        this.animation = [this.image];

        World.add(myWorld, this.body);
    }

    animate()
    {
        this.speed +=0.05;
    }

    remove(index)
    {
         this.isSink = true;
         Matter.Body.setVelocity(this.body, {x:0,y:0});

        
         this.speed = 0.05;
        // this.r =   150;
         
         setTimeout(()=>
         {
             Matter.World.remove(myWorld,this.body);
            // boats.splice(index,1);
            delete bullets[index];
         },1000)



    }

    shoot()
    {
       
       var loc = p5.Vector.fromAngle(sentry.angle);

       loc.mult(29);

       Body.setStatic(this.body, false);
       Body.setVelocity(this.body,{x:loc.x, y:loc.y});
      // Body.setVelocity(this.body,{x:0.03, y:0.3});
    }

    display()
    {
        var pos= this.body.position;
        var angle = this.body.angle;

        var index = floor(this.speed % this.animation.length)
        //1.4 = 1, 1.9 = 1
        //ceil : 1.4 = 2 1.9 =2
        push();
        translate(pos.x, pos.y)
        rotate(angle);
        imageMode(CENTER);
        image(this.animation[index],0,0,this.w, this.h);
        pop();


        if(this.body.velocity.x > 0  && this.body.position.x >2 )
        {
          

             var position = [this.body.position.x, this.body.position.y];
             this.trajectory.push(position);

        }

        // setting image to the trajectory

        for(var i=0; i<this.trajectory.length; i++)
        {
          image(this.image, this.trajectory[i][0], this.trajectory[i][1], 5, 5);
        }

       

      
    }
}