// ============================================================================
// Hardware Source: apps/api/src/users/users.service.ts
// Version: 1.1.0 — 2025-12-17
// Why: Manage user profiles in Firestore
// Env / Identity: N/A
// ============================================================================

import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { User } from '@searchnest/schema';

@Injectable()
export class UsersService {
    constructor(private readonly firebase: FirebaseService) { }

    async createOrUpdate(id: string, email: string, name?: string): Promise<void> {
        const db = this.firebase.getFirestore();
        const userRef = db.collection('users').doc(id);

        await userRef.set({
            email,
            name,
            updatedAt: new Date(),
        }, { merge: true });
    }

    async findOne(id: string) {
        const doc = await this.firebase.getFirestore().collection('users').doc(id).get();
        if (!doc.exists) return null;
        return { id: doc.id, ...doc.data() };
    }
}
