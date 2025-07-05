import { Token } from './constants';

export abstract class Lexer {
   public static process(source: string): Token[] {
      const splitLines: string[] = source.split(/(?<=\n)/g);
      const tokens: Token[] = [];
      let escaped: boolean, depth: number = 0;
      
      for(let y = 0; i < splitLines.length; y++) {
         for(let x = 0; x < splitLines[y].length; x++) {
            const [char, lookahead] = [splitLines[y][x], splitLines[y][x + 1]];
            
            switch(char) {
               
            }
            escaped = false;
         }
      }
      
      return tokens;
   }
}