# NGINX Worker User Example

This example exists primarily to test that nginx worker processes run as `www-data`,
which is required for serving files owned by `www-data` with restrictive permissions.

See: https://github.com/lando/drupal/issues/124

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
# Should have nginx worker processes running as www-data
lando exec web -- ps aux | grep "nginx: worker" | grep -v grep | grep www-data

# Should serve files owned by www-data with 750/640 permissions without 403
lando exec web -- curl -s -o /dev/null -w "%{http_code}" http://localhost | grep 200
```

## Destroy tests

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
lando destroy -y
lando poweroff
```
