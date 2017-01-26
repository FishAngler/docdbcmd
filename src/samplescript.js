exports.run = function(client, docdbcmdFunctions) {

    // You can return a promise, a number, or any other object
    // The shell is smart enough to work with any of those return types
    // It is the job of the shell to specify the right exitCode based on the return type.
    // Please note that the shell only takes into consideration a Promise or a Number, anything else 
    // is treated as success and sets the exitCode = 0;

    var promise = new Promise(
        function(resolve, reject) {

            //=====================  If you want to install a new module   ===============
            var deepEqual;
            
            docdbcmdFunctions.installRequiredModules(['deep-equal'])
                .then(function(results) { deepEqual = results['deep-equal']});

            //========================== Your Custom Code =================================
            
            var sproc = {
                id: "test",
                body: function() {
                    __.response.setBody("Hello world 4!");
                }
            };

            client.upsertStoredProcedure("dbs/fishangler/colls/Users", sproc, function(error, resource, responseHeaders) {
                if (error) {
                    reject(error);
                } else {
                    resolve(0);
                }
            });
            //========================== Your Custom Code ==================================
        }
    );
    return promise;
    //return 0;
    //return {};
    //return null;
}
