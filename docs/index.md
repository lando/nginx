---
title: NGINX Lando Plugin
description: Add a highly configurable nginx service to Lando for local development with all the power of Docker and Docker Compose. Learn how to change version, setup SSL, use a custom webroot or use custom Apache config.
next: ./config.html
---

# NGINX

[NGINX](https://www.nginx.com/resources/wiki/) is a very common web server and reverse proxy.

You can easily add it to your Lando app by adding an entry to the [services](https://docs.lando.dev/config/services.html) top-level config in your [Landofile](https://docs.lando.dev/config/lando.html).

```yaml
services:
  myservice:
    type: nginx
```

## Supported versions

*   [1.24](https://hub.docker.com/r/bitnami/nginx)
*   [1.23](https://hub.docker.com/r/bitnami/nginx)
*   [1.22](https://hub.docker.com/r/bitnami/nginx)
*   [1.21](https://hub.docker.com/r/bitnami/nginx)
*   [1.20](https://hub.docker.com/r/bitnami/nginx)
*   [1.19](https://hub.docker.com/r/bitnami/nginx)
*   [1.18](https://hub.docker.com/r/bitnami/nginx)
*   **[1.17](https://hub.docker.com/r/bitnami/nginx)** **(default)**
*   [1.16](https://hub.docker.com/r/bitnami/nginx)
*   [custom](https://docs.lando.dev/config/services.html#advanced)

## Legacy versions

You can still run these versions with Lando but for all intents and purposes they should be considered deprecated (e.g. YMMV and do not expect a ton of support if you have an issue).

*   [1.14](https://hub.docker.com/r/bitnami/nginx)

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

## Custom Installation

This plugin is included with Lando by default. That means if you have Lando version `3.0.8` or higher then this plugin is already installed!

However if you would like to manually install the plugin, update it to the bleeding edge or install a particular version then use the below. Note that this installation method requires Lando `3.5.0+`.

:::: code-group
::: code-group-item LANDO 3.21+
```bash:no-line-numbers
lando plugin-add @lando/nginx
```
:::
::: code-group-item HYPERDRIVE
```bash:no-line-numbers
# @TODO
# @NOTE: This doesn't actaully work yet
hyperdrive install @lando/nginx
```
:::
::: code-group-item DOCKER
```bash:no-line-numbers
# Ensure you have a global plugins directory
mkdir -p ~/.lando/plugins

# Install plugin
# NOTE: Modify the "npm install @lando/nginx" line to install a particular version eg
# npm install @lando/nginx@0.5.2
docker run --rm -it -v ${HOME}/.lando/plugins:/plugins -w /tmp node:18-alpine sh -c \
  "npm init -y \
  && npm install @lando/nginx --production --flat --no-default-rc --no-lockfile --link-duplicates \
  && npm install --production --cwd /tmp/node_modules/@lando/nginx \
  && mkdir -p /plugins/@lando \
  && mv --force /tmp/node_modules/@lando/nginx /plugins/@lando/nginx"

# Rebuild the plugin cache
lando --clear
```
:::
::::

You should be able to verify the plugin is installed by running `lando config --path plugins` and checking for `@lando/nginx`. This command will also show you _where_ the plugin is being loaded from.
