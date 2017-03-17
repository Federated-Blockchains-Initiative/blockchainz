let fs = require('fs');

let utility = {
    writeToFile: function(path, content, callback) {
        try {
            fs.writeFile(path, content, function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log("The file " + path + " was saved!");
            });
        }
        catch (e) {
            console.log(e);
        }
        if (callback) {
            callback();
        }
    }
};

module.exports = utility;
