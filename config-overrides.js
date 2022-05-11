const { alias } = require("react-app-rewire-alias");

module.exports = function override(config) {
  alias({
    "@portal/UI": "./src/UI",
    "@portal/lib": "./src/lib",
    "@portal/graphql": "./src/graphql"
  })(config);

  return config;
};
