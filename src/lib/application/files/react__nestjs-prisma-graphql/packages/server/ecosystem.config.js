module.exports = {
  apps: [
    {
      name: '@kunlunjs-schematics/react-nestjs_prisma',
      script: 'node dist/src/main.js',
      env: {
        NODE_ENV: 'production'
      }
      // watch: ['dist'],
      // ignore_watch: ['logs', 'node_modules']
    }
  ],

  deploy: {
    production: {
      'user': 'SSH_USERNAME',
      'host': 'SSH_HOSTMACHINE',
      'ref': 'origin/master',
      'repo': 'GIT_REPOSITORY',
      'path': 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy':
        'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
}
