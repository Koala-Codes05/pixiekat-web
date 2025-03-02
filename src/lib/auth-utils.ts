import crypto from 'crypto';

// Types
export interface PendingVerification {
    code: string;
    userData: {
        name: string;
        email: string;
        hashedPassword: string;
    };
    expiresAt: number;
    attempts: number;
}

// Constants
export const MAX_VERIFICATION_ATTEMPTS = 5;
export const VERIFICATION_EXPIRY = 10 * 60 * 1000; // 10 minutes
export const ATTEMPT_COOLDOWN = 60 * 1000; // 1 minute

// Verification storage (should be replaced with Redis in production)
export const pendingVerifications = new Map<string, PendingVerification>();
export const failedAttempts = new Map<string, { count: number; lastAttempt: number }>();

// Generate a secure 8-character hex code
export function generateSecureCode(): string {
    return crypto.randomBytes(4).toString('hex');
}

// Clean up expired verifications periodically
setInterval(() => {
    const now = Date.now();
    for (const [email, data] of pendingVerifications.entries()) {
        if (data.expiresAt < now) {
            pendingVerifications.delete(email);
        }
    }
    
    // Clean up old failed attempts
    for (const [email, data] of failedAttempts.entries()) {
        if (now - data.lastAttempt > VERIFICATION_EXPIRY) {
            failedAttempts.delete(email);
        }
    }
}, 5 * 60 * 1000); // Clean every 5 minutes

// Check if too many attempts have been made
export function hasTooManyAttempts(email: string): boolean {
    const attempts = failedAttempts.get(email);
    if (!attempts) return false;
    
    // Reset attempts if cooldown has passed
    if (Date.now() - attempts.lastAttempt > ATTEMPT_COOLDOWN) {
        failedAttempts.delete(email);
        return false;
    }
    
    return attempts.count >= MAX_VERIFICATION_ATTEMPTS;
}

// Record a failed attempt
export function recordFailedAttempt(email: string): void {
    const current = failedAttempts.get(email);
    failedAttempts.set(email, {
        count: (current?.count || 0) + 1,
        lastAttempt: Date.now()
    });
}

// Get verification with built-in expiry check
export function getVerification(email: string): PendingVerification | null {
    const verification = pendingVerifications.get(email);
    if (!verification) return null;
    
    if (verification.expiresAt < Date.now()) {
        pendingVerifications.delete(email);
        return null;
    }
    
    return verification;
}
