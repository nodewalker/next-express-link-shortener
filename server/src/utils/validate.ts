import express from "express";
import { ContextRunner } from "express-validator";

export const validate = (validations: ContextRunner[]) => {
  return async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const errors: any[] = [];
    for (const validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) {
        errors.push(...result.array());
      }
    }
    if (errors.length) return res.status(400).json({ errors: errors });
    next();
  };
};
