// src/types/express/index.d.ts
import express from 'express';

declare global {
  declare namespace Express {
    export interface Request {
      tenant: Tenant | undefined;
    }
  }
}
