exports.run = function(client, docdbcmdFunctions) {

    // You can return a promise, a number, or any other object
    // The shell is smart enough to work with any of those return types
    // It is the job of the shell to specify the right exitCode based on the return type.
    // Please note that the shell only takes into consideration a Promise or a Number, anything else 
    // is treated as success and sets the exitCode = 0;

    var promise = new Promise(
        function(resolve, reject) {
            //========================== Your Custom Code =================================

            //=====================  If you want to install a new module   ===============
            // NOTE: this is not required, but you can require any module that is available through NPM
            docdbcmdFunctions.installRequiredModules(['deep-equal'])
                .then(function(results) { 
                    var deepEqual = results['deep-equal'];
                    // Some use of the required modules go here. 
                    
                    // Because we needed to install soem modules, our custom scripts go within the 
                    // 'then' function.
                    var sproc = {
                        id: "test",
                        body: function() {
                            __.response.setBody("Hello world!");
                        }
                    };

                    client.upsertStoredProcedure("dbs/fishangler/colls/Users", sproc, function(error, resource, responseHeaders) {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(0);
                        }
                    });
                });

            //========================== Your Custom Code ==================================
        }
    );
    return promise;
    //return 0;
    //return {};
    //return null;
}
