require('jest-localstorage-mock');
require('raf/polyfill');
const Enzyme = require('enzyme');
const EnzymeAdapter = require('enzyme-adapter-react-16');

// Setup enzyme's react adapter
Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('Test', () => {
    beforeAll(() => {
        Object.defineProperty(window, 'matchMedia', {
            value: jest.fn(() => { return { matches: true }; })
        });
    });
});