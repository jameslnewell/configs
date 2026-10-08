import {greeting} from 'custom-conditions/greeting';

// type-aware rules report the unsafe call if TypeScript can't resolve the import
console.log(greeting.toUpperCase());
