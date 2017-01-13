# docdbcmd
Shell for running DocumentDb statements for automating commands to run against a documentdb database given a javascript file. The idea is for developers to focus on creating JavaScript files that use the [DocumentDB Node.js SDK](https://github.com/Azure/azure-documentdb-node) without worrying about all the boilerplate code needed to execute the scripts.

Installation
------------

You can install docdbcmd through NPM. Since docdbcmd was meant to be used as a stand alone shell script, you have to install it globally with -g argument. This way you don't require a package.json on your folder and can be ran from any location.

```
npm install -g docdbcmd
```

Usage
-----

If your npm global modules are part of your PATH, then you can run it as such:

```
node docdbcmd "path\to\file.js" "https://docdbendpoint.documents.azure.com:443/" "key"
```

Otherwise you have to specify the full path (your folders might be different):

### Windows ###

```
node C:\Users\username\AppData\Roaming\npm\node_modules\docdbcmd "path\to\file.js" "https://docdbendpoint.documents.azure.com:443/" "key"
```

### Mac ###

```
node /usr/local/lib/node_modules/docdbcmd "path\to\file.js" "https://docdbendpoint.documents.azure.com:443/" "key"
```

### Global Modules Location ###

You can find your global modules folder by running:
```
npm list -g
```

Sample Script
-------------
**docdbcmd** expects the js script passed in as an argument to have a single function called `run` that takes in a single parameter called `client` of type [DocumentClient](http://azure.github.io/azure-documentdb-node/DocumentClient.html). From there it is up to the script to specify what to do. **docdbcmd** is also smart enough to know if the script returns a promise, a number, or something else and sets `process.exitCode` accordingly. Look at the [samplescript.js](https://github.com/FishAngler/docdbcmd/blob/master/src/samplescript.js) for an example of the type of script you can run.
