import { z } from "zod";

/**
 * Sanitize a string by removing potential XSS/injection characters
 */
export const sanitizeString = (input: string): string => {
  return input
    .replace(/[<>]/g, "") // Remove angle brackets
    .replace(/javascript:/gi, "") // Remove javascript: protocol
    .replace(/on\w+=/gi, "") // Remove event handlers
    .trim();
};

/**
 * Sanitize an object's string values
 */
export const sanitizeFormData = <T extends Record<string, unknown>>(data: T): T => {
  const sanitized = { ...data };
  for (const key in sanitized) {
    if (typeof sanitized[key] === "string") {
      (sanitized as any)[key] = sanitizeString(sanitized[key] as string);
    }
  }
  return sanitized;
};

/**
 * Rate limiter using sessionStorage to prevent abuse
 */
const rateLimitStore: Record<string, { count: number; resetAt: number }> = {};

export const checkRateLimit = (
  action: string,
  maxAttempts: number = 5,
  windowMs: number = 60000
): boolean => {
  const now = Date.now();
  const entry = rateLimitStore[action];

  if (!entry || now > entry.resetAt) {
    rateLimitStore[action] = { count: 1, resetAt: now + windowMs };
    return true;
  }

  if (entry.count >= maxAttempts) {
    return false;
  }

  entry.count++;
  return true;
};

// Common validation schemas
export const emailSchema = z.string().trim().email("Invalid email address").max(255, "Email too long");
export const passwordSchema = z.string().min(6, "Password must be at least 6 characters").max(128, "Password too long");
export const nameSchema = z.string().trim().min(1, "Name is required").max(100, "Name too long");
export const phoneSchema = z.string().trim().regex(/^[+]?[\d\s-]{7,20}$/, "Invalid phone number").optional().or(z.literal(""));
export const textSchema = z.string().trim().max(2000, "Text too long");
