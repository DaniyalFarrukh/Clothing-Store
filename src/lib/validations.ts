import { z } from "zod";

export const checkoutItemSchema = z.object({
  slug: z.string().trim().min(1).max(80),
  size: z.enum(["XS", "S", "M", "L", "XL", "ONE SIZE"]),
  color: z.string().trim().min(1).max(40),
  quantity: z.coerce.number().int().min(1).max(20),
});

export const checkoutSchema = z.object({
  customerName: z.string().trim().min(2, "Full name is required").max(80),
  email: z.string().trim().email("Valid email is required").max(120),
  phone: z
    .string()
    .trim()
    .min(7, "Valid phone number is required")
    .max(24)
    .regex(/^[+\d\s()-]+$/, "Invalid phone characters"),
  address: z.string().trim().min(6, "Street address is required").max(220),
  city: z.string().trim().min(2, "City is required").max(60),
  paymentMethod: z.enum(["cod"]),
  items: z.array(checkoutItemSchema).min(1, "Your bag is empty").max(30),
  website: z.string().max(0).optional().default(""),
  turnstileToken: z.string().max(2048).optional().default(""),
});

export const newsletterSchema = z.object({
  email: z.string().trim().email("Enter a valid email").max(120),
  website: z.string().max(0).optional().default(""),
  turnstileToken: z.string().max(2048).optional().default(""),
});

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  message: z.string().trim().min(5).max(500),
  website: z.string().max(0).optional().default(""),
  turnstileToken: z.string().max(2048).optional().default(""),
});
