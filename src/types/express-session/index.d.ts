// src/types/express-session/index.d.ts
import * as expressSession from 'express-session';

declare module 'express-session' {
  interface SessionData {
    user: User | undefined;
  }
}
