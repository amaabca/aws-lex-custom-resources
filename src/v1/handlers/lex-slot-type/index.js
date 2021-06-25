const AWS = require('aws-sdk');
const Lex = new AWS.LexModelBuildingService();

exports.handler = async (event, context) => {
  try {
    return await (() => {
      return new Promise((resolve, reject) => {
        console.log(event, context);
        let params = JSON.parse(event.ResourceProperties.props);
        console.log(params);

        if (event.RequestType === 'Create') {
          console.log("Creating SlotType");
          Lex.putSlotType(params, (err, data) => {
            if (err) {
              reject(err);
            } else {
              console.log("Call to create SlotType was successful");
              getSlotTypeReady(params.name, 0, resolve, reject);
            }
          });
        } else if (event.RequestType === 'Delete') {
          deleteSlotType(params.name, 0, resolve, reject);
        } else if (event.RequestType === 'Update') {
          Lex.getSlotType({ name: params.name, version: "$LATEST" }, (err, slotTypeData) => {
            if (err) {
              reject(err);
            } else {
              params.checksum = slotTypeData.checksum;
              Lex.putSlotType(params, (err, putData) => {
                if (err) {
                  reject(err);
                } else {
                  getSlotTypeReady(params.name, 0, resolve, reject);
                }
              });
            }
          })
        }
      });
    })();
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
}

const deleteSlotType = (name, retries, onSuccess, onFailure) => {
  setTimeout(() => {
    Lex.deleteSlotType({ name: name }, (err, data) => {
      if (err) {
        console.error(`DELETE SLOTTYPE ERROR: ${err}`);
        retries++;
      } else {
        console.log(data);
        getSlotTypeGone(name, 0, onSuccess, onFailure);
      }

      if (retries >= process.env.RETRIES) {
        console.error("TIMED OUT");
      } else {
        deleteSlotType(name, retries, onSuccess, onFailure);
      }
    })
  }, process.env.WAIT_TIME)
}




const getSlotTypeGone = (name, retries, onSuccess, onFailure) => {
  setTimeout(() => {
    Lex.getSlotType({ name: name, version: "$LATEST" }, (err, slotData) => {
      if (err) {
        console.error(err);
        console.error("Not made yet!");
        onSuccess("Deleted!");
      } else {
        console.log(slotData);
        retries++;

        console.log(`retries: ${retries}, timeout: ${process.env.RETRIES}`);

        if (retries >= process.env.RETRIES) {
          console.log("TIMED OUT");
          onFailure("TIMED OUT");
        } else {
          getSlotTypeGone(name, retries, onSuccess, onFailure);
        }
      }
    })
  }, process.env.WAIT_TIME)
}


const getSlotTypeReady = (name, retries, onSuccess, onFailure) => {
  setTimeout(() => {
    Lex.getSlotType({ name: name, version: "$LATEST" }, (err, slotData) => {
      if (err) {
        console.error("Not made yet!");
        console.error(err);
        retries++;

        console.log(`retries: ${retries}, timeout: ${process.env.RETRIES}`);

        if (retries >= process.env.RETRIES) {
          console.log("TIMED OUT");
          deleteSlotType(name, onFailure, onFailure); //pass onFailure twice as this is a fail case
        } else {
          getSlotTypeReady(name, retries, onSuccess, onFailure);
        }
      } else {
        console.log(slotData);
        onSuccess(slotData);
      }
    })
  }, process.env.WAIT_TIME)
}
