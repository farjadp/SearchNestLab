// ============================================================================
// Hardware Source: apps/api/src/auth/firebase-auth.guard.ts
// Version: 1.1.0 — 2025-12-17
// Why: Protect routes using Firebase Auth tokens
// Env / Identity: N/A
// ============================================================================

import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
    constructor(private readonly firebase: FirebaseService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException();
        }

        try {
            const decodedToken = await this.firebase.getAuth().verifyIdToken(token);
            request['user'] = decodedToken;
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: any): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
