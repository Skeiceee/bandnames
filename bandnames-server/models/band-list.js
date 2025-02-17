const Band = require("./band");

class BandList {

    constructor(){
        this.bands = [
            new Band('Mac Miller'),
            new Band('Tyler, The Creator'),
            new Band('Travis Scott'),
            new Band('Black Eyed Peas')
        ]
    }

    getBands(){
        return this.bands;
    }

    addBand( name ){
        let newBand = new Band(name);
        this.bands.push(newBand);
        return this.bands;
    }

    removeBand(id){
        this.bands = this.bands.filter(band => band.id !== id);
    }

    increaseVotes(id){
        this.bands = this.bands.map( band => {
            if(band.id === id){
                band.votes += 1;
            }
            return band;
        })
    }

    changeName(id, newName){
        this.bands = this.bands.map(band => {
            if(band.id === id){
                band.name = newName;
            }
            return band;
        })
    }

}

module.exports = BandList;