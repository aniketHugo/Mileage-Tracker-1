
const EditRefuelDB = async (
    realm,
    refuelId,
    refuelDate,
    startReading,
    endReading,
    consumed,
    price) => {
    try {
        const objectToUpdate = realm.objectForPrimaryKey('Refuel', refuelId);
        console.log("Tp == ",typeof(new Date()))
        if (objectToUpdate) {
            console.log("Found ",objectToUpdate);
            realm.write(() => {
                objectToUpdate.refuelDate = refuelDate;
                objectToUpdate.startReading = parseFloat(startReading);
                objectToUpdate.endReading = parseFloat(endReading);
                objectToUpdate.consumed = parseFloat(consumed);
                objectToUpdate.price = parseFloat(price);
            });
        }
        else{
            console.log("Not found",objectToUpdate)
        }

        console.log('Refuel Updated:');
    } catch (error) {
        console.error('Error editing Refuel to database:', error);
    }
};

// Example function to generate a unique ID (you can implement your logic)


export default EditRefuelDB;
