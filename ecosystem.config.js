/**
 * @description pm2 configuration file.
 * @example
 *  production mode :: pm2 start ecosystem.config.js --only prod
 *  development mode :: pm2 start ecosystem.config.js --only dev
 */
module.exports = {
  apps: [
    {
      name: "beli-shop-fe", // pm2 start App name
      exec_mode: "cluster",
      instances: "max", // Or a number of instances
      script: "npx",
      args: " serve dist/ --single -p 3002", // Correct argument format for serving an SPA on port 3000
      env: {
        NODE_ENV: "production",
      },
      instance_var: "INSTANCE_ID", // instance variable
      instances: 1, // pm2 instance count
      autorestart: true, // auto restart if process crash
      watch: false, // files change automatic restart
      ignore_watch: ["node_modules", "logs"], // ignore files change
      max_memory_restart: "1G", // restart if process use more than 1G memory
      merge_logs: true, // if true, stdout and stderr will be merged and sent to pm2 log
      output: "./logs/access.log", // pm2 log file
      error: "./logs/error.log", // pm2 error log file
    },
  ],
  // deploy: {
  //     development: {
  //         user: "stackops",
  //         host: [
  //             {
  //                 host: "159.223.94.242",
  //                 port: "3000"
  //             }
  //         ],
  //         ref: "origin/main",
  //         repo: "git@gitlab.com:the-espresso/the-espresso-api.git",
  //         path: "/Apps/trbot-svc",
  //         "post-setup": "yarn install; yarn build; pm2 start ecosystem.config.json",
  //         "post-deploy":
  //             "yarn install; yarn build; pm2 startOrRestart ecosystem.config.json",
  //         ssh_options: ["StrictHostKeyChecking=no", "PasswordAuthentication=no"]
  //     }
  // }
};
