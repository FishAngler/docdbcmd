# docdbcmd
Shell for running DocumentDb statements for automating commands to run against a documentdb database given a javascript file

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
