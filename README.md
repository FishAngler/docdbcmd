# docdbcmd
Shell for running DocumentDb statements for automating commands to run against a documentdb database given a javascript file. The idea is for developers to focus on creating JavaScript files that use the [DocumentDB Node.js SDK](https://github.com/Azure/azure-documentdb-node) without worrying about all the boilerplate code needed to execute the scripts.

Installation
------------

You can install docdbcmd through NPM.

```
npm install docdbcmd
```

Usage
-----

Now you can run it as such from the path where it was installed

```
node node_modules\docdbcmd "path\to\file.js" "https://docdbendpoint.documents.azure.com:443/" "key"
```

Sample Script
-------------
**docdbcmd** expects the js script passed in as an argument to have a single function called `run` that takes in a single parameter called `client` of type [DocumentClient](http://azure.github.io/azure-documentdb-node/DocumentClient.html). From there it is up to the script to specify what to do. **docdbcmd** is also smart enough to know if the script returns a promise, a number, or something else and sets `process.exitCode` accordingly. Look at the [samplescript.js](https://github.com/FishAngler/docdbcmd/blob/master/src/samplescript.js) for an example of the type of script you can run.
