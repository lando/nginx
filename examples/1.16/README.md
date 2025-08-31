# NGINX 1.16 Example

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
# Should use 1.16.1 as the default version
lando exec defaults -- nginx -v 2>&1 | grep 1.16.1

# Should use the user specified patch version if given
lando exec patch -- nginx -v 2>&1 | grep 1.16.1

# Should serve from the app root by default
lando exec defaults -- curl http://localhost | grep ROOTDIR

# Should only serve over http by default
lando exec defaults -- curl https://localhost || echo $? | grep 7
```

## Destroy tests

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
lando destroy -y
lando poweroff
```
