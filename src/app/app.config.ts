import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideFirebaseApp(() => initializeApp({ projectId: "simple-crm-rg", appId: "1:19491253434:web:f268a60d7287a7312da683", storageBucket: "simple-crm-rg.firebasestorage.app", apiKey: "AIzaSyDxgC_dTWqe4W5X_aJZj7Vs7gCL_6BP_98", authDomain: "simple-crm-rg.firebaseapp.com", messagingSenderId: "19491253434" })),
        provideFirestore(() => getFirestore())
    ]
};
