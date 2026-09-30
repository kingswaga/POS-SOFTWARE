const path = require('path')

/**
 * Explicitly set the outputFileTracingRoot so Next.js doesn't infer
 * the repository root when multiple lockfiles exist.
 */
module.exports = {
  outputFileTracingRoot: path.resolve(__dirname),
}
