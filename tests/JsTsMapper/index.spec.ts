import 'es6-shim';
import 'reflect-metadata';
import 'ts-helpers';
import 'moment';
import { UtilTestTools } from '../services/utils.srv';

describe('Tests for JsTsMapper', () => {
  let tools: UtilTestTools = new UtilTestTools(); 
  let context = require.context('./scenarios', true, /\.ts$/);
  context.keys().forEach((path) => {
    context(path).run(tools);
  }); 
});
