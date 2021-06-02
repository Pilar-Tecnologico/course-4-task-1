
const propertyObj = ["name", "lastname", "role", "team"];

const evaluateObj = (object) => {
    let value = true; 
    const temObject = Object.keys(object);
    
    if(temObject.length === propertyObj.length) {

        propertyObj.map(prop =>{

            if(!object.hasOwnProperty(prop)) {
                console.log('es sólo pasarla');
                value = false; 
            }
        })

    }else {
        value = false; 
    }

        return value; 
}

module.exports = {
    evaluateObj
}