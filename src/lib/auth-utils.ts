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
    createdAt: number;
}

interface FailedAttempt {
    count: number;
    lastAttempt: number;
    blockedUntil?: number;
}

// Constants
export const MAX_VERIFICATION_ATTEMPTS = 5;
export const VERIFICATION_EXPIRY = 10 * 60 * 1000; // 10 minutes
export const ATTEMPT_COOLDOWN = 60 * 1000; // 1 minute cooldown

const MAX_ATTEMPTS = 5; // Maximum failed attempts before blocking
const BLOCK_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds
const ATTEMPT_RESET = 30 * 60 * 1000; // Reset attempts after 30 minutes

// Verification storage (should be replaced with Redis in production)
export const pendingVerifications = new Map<string, PendingVerification>();
const failedAttempts = new Map<string, FailedAttempt>();

// Generate a secure 8-character hex code
export function generateSecureCode(): string {
    return crypto.randomBytes(4).toString('hex');
}

// Clean up expired verifications and attempts
export function cleanupExpiredData(): void {
    const now = Date.now();
    
    // Clean up old failed attempts
    for (const [email, data] of failedAttempts.entries()) {
        // Reset if block duration expired or no activity for ATTEMPT_RESET
        if ((data.blockedUntil && now >= data.blockedUntil) || 
            (now - data.lastAttempt > ATTEMPT_RESET)) {
            failedAttempts.delete(email);
        }
    }
    
    // Clean up expired verifications
    for (const [email, data] of pendingVerifications.entries()) {
        if (now - data.createdAt > VERIFICATION_EXPIRY) {
            pendingVerifications.delete(email);
        }
    }
}

export function hasTooManyAttempts(email: string): boolean {
    const attempt = failedAttempts.get(email);
    if (!attempt) return false;

    // Check if user is blocked
    if (attempt.blockedUntil && Date.now() < attempt.blockedUntil) {
        return true;
    }

    // If block duration has expired, reset attempts
    if (attempt.blockedUntil && Date.now() >= attempt.blockedUntil) {
        failedAttempts.delete(email);
        return false;
    }

    // Reset attempts if inactive for too long
    if (Date.now() - attempt.lastAttempt > ATTEMPT_RESET) {
        failedAttempts.delete(email);
        return false;
    }

    // Return true if max attempts reached (not yet blocked, but should be)
    return attempt.count >= MAX_ATTEMPTS;
}

export function recordFailedAttempt(email: string): void {
    const attempt = failedAttempts.get(email) || { count: 0, lastAttempt: 0 };
    
    // Reset attempts if block duration expired
    if (attempt.blockedUntil && Date.now() >= attempt.blockedUntil) {
        failedAttempts.delete(email);
        return;
    }

    // Reset if inactive for too long
    if (Date.now() - attempt.lastAttempt > ATTEMPT_RESET) {
        failedAttempts.delete(email);
        return;
    }

    attempt.count += 1;
    attempt.lastAttempt = Date.now();

    // Block user if max attempts reached
    if (attempt.count >= MAX_ATTEMPTS) {
        attempt.blockedUntil = Date.now() + BLOCK_DURATION;
    }

    failedAttempts.set(email, attempt);
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
