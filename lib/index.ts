

const enum OperationMode {
   default_bot,
   compilation
}

// This is used by the aetheris android app and will not matter for npmjs users
// The last argument is being checked for a specific mode
switch(process.argv.at(-1)) {
   case(OperationMode.default_bot):
      
   break;
   case(OperationMode.compilation):
      
   break;
}