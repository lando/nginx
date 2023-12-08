'use strict';

// Modules
const _ = require('lodash');
const path = require('path');

// Builder
module.exports = {
  name: 'nginx',
  config: {
    version: '1.17',
    supported: ['1.14', '1.16', '1.17', '1.18', '1.19', '1.20', '1.21', '1.22', '1.23', '1.24', '1.25'],
    legacy: ['1.14'],
    pinPairs: {
      '1.25': 'bitnami/nginx:1.25.3-debian-11-r1',
      '1.24': 'bitnami/nginx:1.24.0-debian-11-r153',
      '1.23': 'bitnami/nginx:1.23.4-debian-11-r24',
      '1.22': 'bitnami/nginx:1.22.1-debian-11-r66',
      '1.21': 'bitnami/nginx:1.21.6-debian-11-r21',
      '1.20': 'bitnami/nginx:1.20.2-debian-11-r9',
      '1.19': 'bitnami/nginx:1.19.10-debian-10-r94',
      '1.18': 'bitnami/nginx:1.18.0-debian-10-r363',
      '1.17': 'bitnami/nginx:1.17.10-debian-10-r71',
      '1.16': 'bitnami/nginx:1.16.1-debian-10-r106',
      '1.14': 'bitnami/nginx:1.14.2-r125',
    },
    patchesSupported: true,
    confSrc: path.resolve(__dirname, '..', 'config'),
    defaultFiles: {
      params: 'fastcgi_params',
      server: 'nginx.conf',
      vhosts: 'default.conf.tpl',
    },
    finalFiles: {
      params: '/opt/bitnami/nginx/conf/fastcgi_params',
      server: '/opt/bitnami/nginx/conf/nginx.conf',
      vhosts: '/opt/bitnami/nginx/conf/lando.conf',
    },
    remoteFiles: {
      params: '/tmp/fastcgi_params.lando',
      server: '/tmp/server.conf.lando',
      vhosts: '/tmp/vhosts.conf.lando',
    },
    renderTemplate: '1.0.6',
    ssl: false,
    webroot: '.',
  },
  parent: '_webserver',
  builder: (parent, config) => class LandoNginx extends parent {
    constructor(id, options = {}) {
      options = _.merge({}, config, options);
      // Are we strapped?
      const isArmed = _.get(options, '_app._config.isArmed', false);
      // compute the minor version
      const mv = _(options.version.split('.')).thru(versions => [versions[0], versions[1]].join('.')).value();

      // Use different default for ssl
      if (options.ssl) options.defaultFiles.vhosts = 'default-ssl.conf.tpl';

      // If we are using the older 1.14 version we need different locations
      if (mv === '1.14') {
        options.finalFiles = _.merge({}, options.finalFiles, {
          server: '/opt/bitnami/extra/nginx/templates/nginx.conf.tpl',
          vhosts: '/opt/bitnami/extra/nginx/templates/default.conf.tpl',
        });
        options.defaultFiles = _.merge({}, options.defaultFiles, {server: 'nginx.conf.tpl'});
      }

      // attempt to install the render-template
      require('../utils/add-build-step')(
        [`/helpers/install-render-template.sh ${options.renderTemplate} ${isArmed ? 'arm64' : 'amd64'}`],
        options._app,
        options.name,
        'build_as_root_internal',
      );

      // Get the config files final destination
      // @TODO: we cp the files instead of directly mounting them to
      // prevent unexpected edits to this files
      // See: https://github.com/lando/lando/issues/2383
      const {params, server, vhosts} = options.finalFiles;

      // Build the default stuff here
      const nginx = {
        image: `bitnami/nginx:${options.version}`,
        command: `/launch.sh ${vhosts} ${server} ${params}`,
        environment: {
          NGINX_HTTP_PORT_NUMBER: '80',
          NGINX_DAEMON_USER: 'root',
          NGINX_DAEMON_GROUP: 'root',
          LANDO_NEEDS_EXEC: 'DOEEET',
        },
        ports: ['80'],
        user: 'root',
        volumes: [
          `${options.confDest}/launch.sh:/launch.sh`,
          `${options.confDest}/${options.defaultFiles.params}:${options.remoteFiles.params}:ro`,
          `${options.confDest}/${options.defaultFiles.vhosts}:${options.remoteFiles.vhosts}:ro`,
          `${options.confDest}/${options.defaultFiles.server}:${options.remoteFiles.server}:ro`,
        ],
      };

      // Send it downstream
      super(id, options, {services: _.set({}, options.name, nginx)});
    };
  },
};
