#!/bin/bash

# Errors and logz
set -e

# Set defaults
: ${VHOST:="$1"}
: ${SERVER:="$2"}
: ${PARAMS:="$3"}
: ${VHOST_SOURCE:="/tmp/vhosts.conf.lando"}
: ${SERVER_SOURCE:="/tmp/server.conf.lando"}
: ${PARAMS_SOURCE:="/tmp/fastcgi_params.lando"}

# Get the lando logger
. /helpers/log.sh

# Set the module
LANDO_MODULE="landonginx"

# Ensure legacy vhost directory
mkdir -p /opt/bitnami/nginx/conf/vhosts
lando_debug "Created directory /opt/bitnami/nginx/conf/vhosts..."
ln -sf "${NGINX_CONFDIR}/server_blocks" "${NGINX_CONFDIR}/vhosts"
lando_debug "Ensured legacy vhosts directory remains symlinked for backwards compatibility..."
lando_debug $(cat /opt/bitnami/nginx/conf/nginx.conf)

# Move the server and params config into the correct place
if [ -f "$SERVER_SOURCE" ]; then
  lando_info "copying $SERVER_SOURCE to $SERVER"
  cp -f "$SERVER_SOURCE" "$SERVER"
fi
if [ -f "$PARAMS_SOURCE" ]; then
  lando_info "copying $PARAMS_SOURCE to $PARAMS"
  cp -f "$PARAMS_SOURCE" "$PARAMS"
fi

# Replace LANDO_WEBROOT in the vhost template
lando_info "Using sed to place correct webroot in vhost template"
sed 's@{{LANDO_WEBROOT}}@'"${LANDO_WEBROOT}"'@g' "$VHOST_SOURCE" > /opt/bitnami/nginx/conf/vhosts/lando.conf

lando_info "Rendered template /tmp/vhosts.lando to /opt/bitnami/nginx/conf/vhosts/lando.conf"
lando_debug $(cat /opt/bitnami/nginx/conf/vhosts/lando.conf)

# Detect and run the correct entrypoint script. THANKS BITNAMI!
if [ -f "/opt/bitnami/scripts/nginx/entrypoint.sh" ]; then
  /opt/bitnami/scripts/nginx/entrypoint.sh /opt/bitnami/scripts/nginx/run.sh
else
  /entrypoint.sh /run.sh
fi
