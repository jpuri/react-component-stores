const context = require.context('./src/__tests__', true, /-test\.js$/);
context.keys().forEach(context);
