// Self executing function so it can be initiated and called directly through node command line
(function() {
    var DocumentClient = require('documentdb').DocumentClient;
    var docdbcmd = {};
    
	var docdbcmdFunctions = {};
	
	docdbcmdFunctions.installRequiredModules = function (required) {

        var p = new Promise(function (resolve, reject) {
	
			if (!required || required.length === 0) { resolve(); return; }
			
            var npm = require('npm');
            npm.load({ loaded: false }, function (er) {

                if (er) { reject(er); return; }

                npm.commands.install(required, function (er) {
                    if (er) { reject(er); return; }

					var results = {};
                    for (var i=0; i < required.length; i++) results[required[i]] = require(required[i]);
                    resolve(results);
                });
            });
        });
        return p;
    }
        
    exports.run = docdbcmd.run = function(fileToExecute, host, key) {
        var client = new DocumentClient(host, { masterKey: key });
        var f = require(fileToExecute);
        return f.run(client, docdbcmdFunctions);
    }

    if (!module.parent) {
        // This means it was called directly from node command line, instead of require
        if(!process.argv || process.argv.length < 5) {
            console.error("Invalid arguments! You must call it as: ");
            console.error("node docdbcmd 'pathto.js' 'hostUrl' 'key'");
            process.exitCode = -1;
            return;
        }
        var res = docdbcmd.run(process.argv[2], process.argv[3], process.argv[4]);
        var isPromise = res && typeof res.then == 'function';
        
        if (isPromise) {
            res.then(function(val) {
                process.exitCode = 0;
                if(val && Number.isInteger(val)) {
                    process.exitCode = val;
                }
            }).catch(function(reason){
                console.error(reason);
                process.exitCode = 1;
            });
        } else if (Number.isInteger(res)) {
            process.exitCode = res;
        } else {
            process.exitCode = 0;
        }
    }
})();
