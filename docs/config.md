---
title: Configuration
description: Learn how to configure the Lando NGINX service.
---

# Configuration

Here are the configuration options, set to the default values, for this service. If you are unsure about where this goes or what this means we *highly recommend* scanning the [services documentation](https://docs.lando.dev/services/lando-3.html) to get a good handle on how the magicks work.

Also note that options, in addition to the [build steps](https://docs.lando.dev/services/lando-3.html#build-steps) and [overrides](https://docs.lando.dev/services/lando-3.html#overrides) that are available to every service, are shown below:

```yaml
services:
  myservice:
    type: nginx:1.18
    webroot: .
    ssl: false
    config:
      server: SEE BELOW
      vhosts: SEE BELOW
      params: SEE BELOW
```

## Using custom nginx config files

You may need to override our [default nginx config](https://github.com/lando/nginx/tree/main/builders) with your own custom [server](https://www.linode.com/docs/guides/how-to-configure-nginx/), [vhosts](https://www.linode.com/docs/guides/how-to-configure-nginx/) or [fastcgi_params](https://www.nginx.com/resources/wiki/start/topics/examples/full/) config.

If you do this, you must use files that exist inside your application and express them relative to your project root as shown below:

Note that the default files may change based on how you set `ssl`.

**A hypothetical project**

Note that you can put your configuration files anywhere inside your application directory. We use a `config` directory but you can call it whatever you want such as `.lando` in the example below:

```bash
./
|-- config
   |-- default.conf
   |-- nginx.conf
   |-- fastcgi_params
|-- index.html
|-- .lando.yml
```

**Landofile using custom nginx config**

```yaml
services:
  myservice:
    type: nginx
    config:
      server: config/nginx.conf
      vhosts: config/default.conf
      param: config/fastcgi_params
```
