//General purpose vector class
class Vec2{
    constructor(x, y){ //Defines parameters of vector
        this.x = x;
        this.y = y;
    }

    //Sum two vectors
    add(vec, newVec=false){
        if (newVec){ 
            return new Vec2(this.x + vec.x, this.y + vec.y);
        } else{
            this.x += vec.x;
            this.y += vec.y;
        }
    }

    //Subtract two vectors
    sub(vec, newVec=false){
        if (newVec){
            return new Vec2(this.x - vec.x, this.y - vec.y)
        } else{
            this.x -= vec.x;
            this.y -= vec.y;
        }
    }

    //Normalise vector
    normalise(){
        const length = Math.sqrt(this.x * this.x + this.y * this.y);
        this.x /= length;
        this.y /= length;
    }

    //Multiply vector by scalar
    mult(scalar){
        this.x *= scalar;
        this.y *= scalar;
    }

    //Gets length of vector
    length(){
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    //Interpolate between two vectors
    interpolate(endvec, percent){
        const newVec = new Vec2(0, 0);
        newVec.x = this.x + (endvec.x - this.x) * percent;
        newVec.y = this.y + (endvec.y - this.y) * percent;
        return newVec;
    }

    //Get angle from vector
    angle(){
        return Math.atan2(this.y, this.x);
    }

    //Create vector from angle
    static fromAngle(angle){
        return new Vec2(Math.cos(angle), Math.sin(angle));
    }

    //Create a copy of a vector
    clone(){
        return new Vec2(this.x, this.y);
    }
}

//Interpolates between two single values
function interpolate(start, end, percent){
    return start + (end - start) * percent;
}