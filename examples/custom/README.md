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
# Should serve from webroot if specified
lando ssh -s custom -c "curl http://localhost" | grep WWWDIR
lando ssh -s custom_116 -c "curl http://localhost | grep WWWDIR"

# Should serve from https when specified
lando ssh -s custom -c "curl https://localhost | grep WWWDIR"
lando ssh -s custom_116 -c "curl https://localhost | grep WWWDIR"

# Should mount custom config to the correct locations and render the correct vars
lando ssh -s custom -c "cat /opt/bitnami/nginx/conf/nginx.conf" | grep LANDOSERVER
lando ssh -s custom -c "cat /opt/bitnami/nginx/conf/vhosts/lando.conf" | grep server_name | grep test.landonginxcustom.lndo.site
lando ssh -s custom -c "cat /opt/bitnami/nginx/conf/fastcgi_params" | grep LANDOPARAMS
lando ssh -s custom_116 -c "cat /opt/bitnami/nginx/conf/nginx.conf" | grep LANDOSERVER
lando ssh -s custom_116 -c "cat /opt/bitnami/nginx/conf/vhosts/lando.conf" | grep server_name | grep test.landonginxcustom.lndo.site
lando ssh -s custom_116 -c "cat /opt/bitnami/nginx/conf/fastcgi_params" | grep LANDOPARAMS
```

Destroy tests
-------------

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
lando destroy -y
lando poweroff
```
