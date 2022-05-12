const { alias } = require("react-app-rewire-alias");

module.exports = function override(config) {
  alias({
    "@portal/UI": "./src/UI",
    "@portal/lib": "./src/lib",
    "@portal/graphql": "./src/graphql",
    "@portal/utils": "./src/utils"
  })(config);

  return config;
};
