# NGINX 1.29 Example

This example exists primarily to test the following documentation:

* [nginx Service](https://docs.lando.dev/plugins/nginx)

## Start up tests

Run the following commands to get up and running with this example.

```bash
# Should start up successfully
lando poweroff
lando start
```

## Verification commands

Run the following commands to validate things are rolling as they should.

```bash
# Should use 1.29.1 as the default version
lando exec defaults -- nginx -v 2>&1 | grep 1.29.1

# Should serve from the app root by default
lando exec defaults -- curl -s http://localhost | grep ROOTDIR

# Should only serve over http by default
lando exec defaults -- curl -s --write-out "%{exitcode}" https://localhost || echo $? | grep 7

# Should have nginx worker processes running as www-data
lando exec defaults -- ps aux | grep "nginx: worker" | grep -v grep | grep www-data

# Should serve files owned by www-data with restrictive permissions without 403
lando exec defaults -- curl -s -o /dev/null -w "%{http_code}" http://localhost/wwwdata-test/index.html | grep 200
```

## Destroy tests

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
lando destroy -y
lando poweroff
```
