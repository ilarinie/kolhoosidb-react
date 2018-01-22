require('jest-localstorage-mock');

const Enzyme = require('enzyme');
const EnzymeAdapter = require('enzyme-adapter-react-16');
require('raf/polyfill');

// Setup enzyme's react adapter
Enzyme.configure({ adapter: new EnzymeAdapter() });