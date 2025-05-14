// src/setupTests.ts
import '@testing-library/jest-dom';


// Patch for TextEncoder/TextDecoder
import { TextEncoder, TextDecoder } from 'util';

Object.assign(global, {
  TextEncoder,
  TextDecoder,
});
