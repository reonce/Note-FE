import babel from 'rollup-plugin-babel'

export default {
  input: './src/index.js',
  output: {
    file:'./lib/bundle.js',
    format: 'cjs', // 打包的类型,这里选择commonJs方式
  },
  plugins:[babel()],
  external: ['react', 'styled-components'], // 定义外部的包
}
