import { Request, Response, NextFunction } from "express";

export const trackUser = (req: Request, res: Response, next: NextFunction) => {
  // req.useragent might be undefined, so check first
  const deviceInfo = req.useragent;

  // Defensive check, fallback to empty object if undefined
  const platform = deviceInfo?.platform || "Unknown";
  const browser = deviceInfo?.browser || "Unknown";
  const os = deviceInfo?.os || "Unknown";

  // Get IP address - check forwarded header first, else socket IP
  const ip =
    (req.headers['x-forwarded-for'] as string) ||
    req.socket.remoteAddress ||
    req.ip ||
    "Unknown";

  // Attach deviceInfo and IP to request body
  req.body.deviceInfo = {
    platform,
    browser,
    os,
    ip,
  };

  next();
};
