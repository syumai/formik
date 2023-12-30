const fm = require('gray-matter');

// makes mdx in next.js suck less by injecting necessary exports so that
// the docs are still readable on github
// (Shamelessly stolen from Expo.io docs)
// @see https://github.com/expo/expo/blob/master/docs/common/md-loader.js
module.exports = async function (src) {
  const callback = this.async();
  const { content, data } = fm(src);
  const layout = data.layout || 'Docs';
  const code =
    `import { Layout${layout} } from 'components/Layout${layout}';

export default function Wrapper ({ children, ...props }) { return (
  <Layout${layout} meta={${JSON.stringify(
    data
  )}} {...props}>{children}</Layout${layout}>
);
}


` + content;

  return callback(null, code);
};
