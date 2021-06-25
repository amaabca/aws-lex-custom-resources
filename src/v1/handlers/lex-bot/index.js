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
          console.log("Creating bot");
          Lex.putBot(params, (err, data) => {
            if (err) {
              reject(err);
            } else {
              console.log("Call to create bot was successful");
              getBotReady(params.name, 0, resolve, reject);
            }
          });
        } else if (event.RequestType === 'Delete') {
          deleteBot(params.name, 0, resolve, reject);
        } else if (event.RequestType === 'Update') {
          Lex.getBot({ name: params.name, versionOrAlias: "$LATEST" }, (err, data) => {
            if (err) {
              reject(err);
            } else {
              params.checksum = data.checksum;
              Lex.putBot(params, (err, updateData) => {
                if (err) {
                  reject(err);
                } else {
                  getBotReady(params.name, 0, resolve, reject);
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

const deleteBot = (name, retries, onSuccess, onFailure) => {
  setTimeout(() => {
    Lex.deleteBot({ name: name }, (err, data) => {
      if (err) {
        console.error(`DELETE BOT ERROR: ${err}`);
        retries++;

        if (retries >= process.env.RETRIES) {
          console.error("TIMED OUT");
        } else {
          deleteBot(name, retries, onSuccess, onFailure);
        }
      } else {
        console.log(data);
        getBotGone(name, 0, onSuccess, onFailure);
      }
    })
  }, process.env.WAIT_TIME)
}




const getBotGone = (name, retries, onSuccess, onFailure) => {
  setTimeout(() => {
    Lex.getBot({ name: name, version: "$LATEST" }, (err, botData) => {
      if (err) {
        console.error(err);
        console.error("Not made yet!");
        onSuccess("Deleted!");
      } else {
        console.log(botData);
        retries++;

        console.log(`retries: ${retries}, timeout: ${process.env.RETRIES}`);

        if (retries >= process.env.RETRIES) {
          console.log("TIMED OUT");
          onFailure("TIMED OUT");
        } else {
          getBotGone(name, retries, onSuccess, onFailure);
        }
      }
    })
  }, process.env.WAIT_TIME)
}


const getBotReady = (name, retries, onSuccess, onFailure) => {
  setTimeout(() => {
    Lex.getBot({ name: name, versionOrAlias: "$LATEST" }, (err, botData) => {
      if (err) {
        console.error("Not made yet!");
        console.error(err);
        retries++;

        console.log(`retries: ${retries}, timeout: ${process.env.RETRIES}`);

        if (retries >= process.env.RETRIES) {
          console.log("TIMED OUT");
          deleteBot(name, onFailure, onFailure); //pass onFailure twice as this is a fail case
        } else {
          getBotReady(name, retries, onSuccess, onFailure);
        }
      } else {
        console.log(botData);
        onSuccess(botData);
      }
    })
  }, process.env.WAIT_TIME)
}
