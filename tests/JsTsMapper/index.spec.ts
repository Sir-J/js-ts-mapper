import 'es6-shim';
import 'reflect-metadata';
import 'ts-helpers';
import 'moment';
import { JsTsMapper } from '../../src/mapper';

describe('Tests for JsTsMapper', () => {
  let mapper: JsTsMapper = new JsTsMapper(); 
  let context = require.context('./scenarios', true, /\.ts$/);
  context.keys().forEach((path) => {
    context(path).run(mapper);
  }); 
});
