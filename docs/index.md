---
title: NGINX Lando Plugin
description: Add a highly configurable nginx service to Lando for local development with all the power of Docker and Docker Compose. Learn how to change version, setup SSL, use a custom webroot or use custom Apache config.
next: ./config.html
---

# NGINX

[NGINX](https://www.nginx.com/resources/wiki/) is a very common web server and reverse proxy.

You can easily add it to your Lando app by adding an entry to the [services](https://docs.lando.dev/core/v3/services/lando.html) top-level config in your [Landofile](https://docs.lando.dev/core/v3).

```yaml
services:
  myservice:
    type: nginx
```

## Supported versions

*   **[1.25](https://hub.docker.com/r/bitnami/nginx)** **(default)**
*   [1.24](https://hub.docker.com/r/bitnami/nginx)
*   [1.23](https://hub.docker.com/r/bitnami/nginx)
*   [1.22](https://hub.docker.com/r/bitnami/nginx)
*   [1.21](https://hub.docker.com/r/bitnami/nginx)
*   [1.20](https://hub.docker.com/r/bitnami/nginx)
*   [1.19](https://hub.docker.com/r/bitnami/nginx)
*   [1.18](https://hub.docker.com/r/bitnami/nginx)
*   [1.17](https://hub.docker.com/r/bitnami/nginx)
*   [1.16](https://hub.docker.com/r/bitnami/nginx)
*   [custom](https://docs.lando.dev/core/v3/services/lando.html#overrides)

## Patch versions

::: warning Not officially supported!
While we allow users to specify patch versions for this service, they are not *officially* supported, so if you use one, YMMV.
:::

To use a patch version, you can do something as shown below:

```yaml
services:
  myservice:
    type: nginx:1.16.1
```

But make sure you use one of the available [patch tags](https://hub.docker.com/r/bitnami/nginx) for the underlying image we are using.

