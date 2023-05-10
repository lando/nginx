nginx Example
=============

This example exists primarily to test the following documentation:

* [nginx Service](https://docs.devwithlando.io/tutorials/nginx.html)

Start up tests
--------------

Run the following commands to get up and running with this example.

```bash
# Should start up successfully
lando poweroff
lando start
```

Verification commands
---------------------

Run the following commands to validate things are rolling as they should.

```bash
# Should use 1.19.x as the default version
lando ssh -s defaults -c "nginx -v 2>&1 | grep 1.19"

# Should serve from the app root by default
lando ssh -s defaults -c "curl http://localhost | grep ROOTDIR"

# Should only serve over http by default
lando ssh -s defaults -c "curl https://localhost" || echo $? | grep 1
```

Destroy tests
-------------

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
lando destroy -y
lando poweroff
```
