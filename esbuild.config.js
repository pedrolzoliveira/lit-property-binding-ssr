// esbuild.config.js
import esbuild from 'esbuild'

esbuild.build({
  entryPoints: ['./src/elements/my-list.js'], // Your application's entry point
  bundle: true, // Enable bundling
  outfile: './dist/bundle.js', // Output bundle file
}).catch(() => process.exit(1))
