---
title: NGINX Lando Plugin
description: Add a highly configurable nginx service to Lando for local development with all the power of Docker and Docker Compose. Learn how to change version, setup SSL, use a custom webroot or use custom Apache config.
next: ./config.html
---

# NGINX

[NGINX](https://www.nginx.com/resources/wiki/) is a very common web server and reverse proxy.

You can easily add it to your Lando app by adding an entry to the [services](https://docs.lando.dev/services/lando-3.html) top-level config in your [Landofile](https://docs.lando.dev/landofile/).

```yaml
services:
  myservice:
    type: nginx:1.29
```

## Supported versions

*   [1](https://hub.docker.com/r/bitnamilegacy/nginx/tags?name=1.29)
*   [1.29](https://hub.docker.com/r/bitnamilegacy/nginx/tags?name=1.29)
*   [1.28](https://hub.docker.com/r/bitnamilegacy/nginx/tags?name=1.28)
*   [1.27](https://hub.docker.com/r/bitnamilegacy/nginx/tags?name=1.27)
*   [1.26](https://hub.docker.com/r/bitnamilegacy/nginx/tags?name=1.26)
*   [1.25](https://hub.docker.com/r/bitnamilegacy/nginx/tags?name=1.25)
*   [1.24](https://hub.docker.com/r/bitnamilegacy/nginx/tags?name=1.24)
*   [1.23](https://hub.docker.com/r/bitnamilegacy/nginx/tags?name=1.23)
*   [1.22](https://hub.docker.com/r/bitnamilegacy/nginx/tags?name=1.22)
*   [1.21](https://hub.docker.com/r/bitnamilegacy/nginx/tags?name=1.21)
*   [1.20](https://hub.docker.com/r/bitnamilegacy/nginx/tags?name=1.20)
*   [1.19](https://hub.docker.com/r/bitnamilegacy/nginx/tags?name=1.19)
*   [1.18](https://hub.docker.com/r/bitnamilegacy/nginx/tags?name=1.18)
*   [1.17](https://hub.docker.com/r/bitnamilegacy/nginx/tags?name=1.17)
*   [1.16](https://hub.docker.com/r/bitnamilegacy/nginx/tags?name=1.16)
*   [custom](https://docs.lando.dev/services/lando-3.html#overrides)

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

But make sure you use one of the available [patch tags](https://hub.docker.com/r/bitnamilegacy/nginx) for the underlying image we are using.

