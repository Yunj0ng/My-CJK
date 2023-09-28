const { alias } = require("react-app-rewire-alias");
const webpack = require("webpack");

module.exports = function override(config) {
  alias({
    "@components": "src/components",
    "@pages": "src/pages",
    "@styles": "src/styles",
    "@mainBtn": "src/components/btn/MainBtn",
    "@pageBtn": "src/components/btn/PageBtn",
    "@authInput": "src/components/input/AuthInput",
    "@wordInput": "src/components/input/WordInput",
    "@layout": "src/components/Layout",
    "@modal": "src/components/Modal",
    "@noti": "src/components/Noti",
    "@showWordWrapper": "src/components/ShowWordWrapper",
    "@api": "src/api",
    "@context": "src/context",
    "@alert":"src/components/Alert",
    "@loading":"src/components/Loading"
  })(config);


  return config;
};
