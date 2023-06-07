module.exports = function babelConfig(api) {
  const presets = {
    all: ['@babel/preset-env', '@babel/preset-react'],
    development: [
      //["@emotion/babel-preset-css-prop", { "autoLabel": "dev-only", "labelFormat": "[local]" }]
    ],
    production: [],
  };

  const plugins = {
    all: [],
    development: [
        'react-refresh/babel',
        //["@emotion", { "autoLabel": "dev-only", "labelFormat": "[local]" }],
    ],
    production: [],
  };

  const envName = api.env();
  if (envName !== 'production') {
    return {
      presets: [...presets.all, ...presets.development],
      plugins: [...plugins.all, ...plugins.development],
    }
  }
  else {
    return {
      presets: [...presets.all, ...presets.production],
      plugins: [...plugins.all, ...plugins.production],
    }
  }
}
