import SimpleTableDemo from './simple-table-demo';
import { define } from '../../../src/index';

[SimpleTableDemo].forEach((component) => component.define());

define();
