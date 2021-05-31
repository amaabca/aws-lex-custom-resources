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
          console.log("Creating now...");
          Lex.putIntent(params, (err, data) => {
            if (err) {
              reject(err);
            } else {
              console.log("Created, waiting for it to show up.");
              getIntentReady(params.name, 0, resolve, reject);
            }
          });
        } else if (event.RequestType === 'Delete') {
          deleteIntent(params.name, 0, resolve, reject);
        } else if (event.RequestType === 'Update') {
          Lex.getIntent({ name: params.name, version: "$LATEST" }, (err, intentData) => { // might need to add version option here
            if (err) {
              reject(err);
            } else {
              params.checksum = intentData.checksum;
              Lex.putIntent(params, (err, data) => {
                if (err) {
                  reject(err);
                } else {
                  getIntentReady(params.name, 0, resolve, reject);
                }
              });
            }
          });
        }
      });
    })();
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
}

const getIntentGone = (name, retries, onSuccess, onFailure) => {
  setTimeout(() => {
    Lex.getIntent({ name: name, version: "$LATEST" }, (err, intentData) => {
      if (err) {
        console.error(`GET INTENT GONE ERROR: ${err}`);
        onSuccess("Deleted!");
      } else {
        console.log(intentData);
        retries++;

        if (retries >= process.env.RETRIES) {
          console.log("TIMED OUT");
          onFailure("TIMED OUT");
        } else {
          getIntentGone(name, retries, onSuccess, onFailure);
        }
      }
    })
  }, process.env.WAIT_TIME)
}

const deleteIntent = (name, retries, onSuccess, onFailure) => {
  setTimeout(() => {
    Lex.deleteIntent({ name: name }, (err, data) => {
      if (err) {
        console.error(`GET INTENT READY ERROR: ${err}`);
        retries++;
        if (retries >= process.env.RETRIES) {
          console.error("TIMED OUT");
        } else {
          deleteIntent(name, retries, onSuccess, onFailure);
        }
      } else {
        console.log(data);
        getIntentGone(name, 0, onSuccess, onFailure);
      }
    })
  }, process.env.WAIT_TIME)
}

const getIntentReady = (name, retries, onSuccess, onFailure) => {
  setTimeout(() => {
    Lex.getIntent({ name: name, version: "$LATEST" }, (err, intentData) => {
      if (err) {
        console.error(`GET INTENT READY ERROR: ${err}`);
        retries++;
        if (retries >= process.env.RETRIES) {
          console.error("TIMED OUT");
          deleteIntent(name, onFailure, onFailure); //pass onFailure twice as this is a fail case
        } else {
          getIntentReady(name, retries, onSuccess, onFailure);
        }
      } else {
        console.log(intentData);
        onSuccess(intentData);
      }
    })
  }, process.env.WAIT_TIME)
}
