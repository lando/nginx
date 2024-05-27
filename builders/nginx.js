'use strict';

// Modules
const _ = require('lodash');
const path = require('path');

// Builder
module.exports = {
  name: 'nginx',
  config: {
    version: '1.26',
    supported: ['1.16', '1.17', '1.18', '1.19', '1.20', '1.21', '1.22', '1.23', '1.24', '1.25', '1.26'],
    pinPairs: {
      '1.26': 'bitnami/nginx:1.26.0-debian-12-r1',
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
    renderArch: 'amd64',
    renderTemplate: '1.0.6',
    ssl: false,
    webroot: '.',
  },
  parent: '_webserver',
  builder: (parent, config) => class LandoNginx extends parent {
    constructor(id, options = {}) {
      options = _.merge({}, config, options);
      // Are we strapped?
      if (_.get(options, '_app._config.isArmed', false)) options.renderArch = 'arm64';
      // Use different default for ssl
      if (options.ssl) options.defaultFiles.vhosts = 'default-ssl.conf.tpl';

      // attempt to install the render-template
      require('../utils/add-build-step')(
        [`/helpers/install-render-template.sh ${options.renderTemplate} ${options.renderArch}`],
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
