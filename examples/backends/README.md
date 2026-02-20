# NGINX Backends Example

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
# Should serve frontend content from the app root
lando ssh -s frontend -c "curl -s http://localhost" | grep FRONTEND

# Should be able to reach backend1 through the frontend proxy
lando ssh -s frontend -c "curl -s http://localhost/backend1/" | grep BACKEND1

# Should be able to reach backend2 through the frontend proxy
lando ssh -s frontend -c "curl -s http://localhost/backend2/" | grep BACKEND2

# Should have backend1 as a dependency of frontend
lando info -s frontend --format json | grep backend1

# Should have backend2 as a dependency of frontend
lando info -s frontend --format json | grep backend2

# Should serve backend1 directly on its own port
lando ssh -s backend1 -c "curl -s http://localhost" | grep BACKEND1

# Should serve backend2 directly on its own port
lando ssh -s backend2 -c "curl -s http://localhost" | grep BACKEND2
```

## Destroy tests

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
lando destroy -y
lando poweroff
```
