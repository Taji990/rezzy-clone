import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

interface RateLimitStore {
  [ip: string]: {
    count: number;
    resetTime: number;
  };
}

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  private store: RateLimitStore = {};
  private readonly limit = 100; // requests
  private readonly windowMs = 60000; // 1 minute

  use(req: Request, res: Response, next: NextFunction) {
    const ip = req.ip || req.connection.remoteAddress || 'unknown';
    const now = Date.now();

    if (!this.store[ip]) {
      this.store[ip] = { count: 1, resetTime: now + this.windowMs };
      return next();
    }

    if (now > this.store[ip].resetTime) {
      this.store[ip] = { count: 1, resetTime: now + this.windowMs };
      return next();
    }

    if (this.store[ip].count >= this.limit) {
      res.status(429).json({
        statusCode: 429,
        message: 'Too Many Requests',
        retryAfter: Math.ceil((this.store[ip].resetTime - now) / 1000),
      });
      return;
    }

    this.store[ip].count++;
    res.set('X-RateLimit-Limit', this.limit.toString());
    res.set('X-RateLimit-Remaining', (this.limit - this.store[ip].count).toString());
    res.set('X-RateLimit-Reset', this.store[ip].resetTime.toString());

    next();
  }
}
