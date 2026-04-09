import { defineConfig } from 'tsup';
import pkg from './package.json';
import { NO_BUNDLE_LIST } from '@artisans/anita';

/**
 * List of package names that shouldn't be bundled,
 * allowing you to extend the list locally.
 * If some package is misbehaving in the production build
 * try adding it here. If that works, please reach out
 * so we can add it centrally to Anita.
 *
 * ```ts
 * const noBundleList: Array<string> = [...NO_BUNDLE_LIST, 'some-package'];
 * ```
 */
const noBundleList: Array<string> = [...NO_BUNDLE_LIST];

const bundleModules = Object.keys(pkg.dependencies)
    .filter((packageName) => !noBundleList.includes(packageName))
    .map((packageName) => {
        return new RegExp(`^${packageName}$`);
    });

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    dts: false,
    sourcemap: false,
    clean: true,
    bundle: true,
    minify: true,
    minifyIdentifiers: false,
    splitting: false,
    noExternal: bundleModules
});
