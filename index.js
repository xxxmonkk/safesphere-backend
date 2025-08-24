const express = require('express');
const admin = require('firebase-admin');
require('dotenv').config();

const app = express();
app.use(express.json());

// Initialize Firebase (assuming service-account.json is set up)
admin.initializeApp({
    credential: admin.credential.cert(require('./service-account.json')),
});
const db = admin.firestore();

// Ping endpoint for API team testing
app.get('/ping', (req, res) => {
    try {
        res.status(200).json({ status: 'ok' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Sample Firebase route to verify setup
app.get('/health', async (req, res) => {
    try {
        // Test Firestore connectivity
        await db.collection('test').doc('health').set({ status: 'checked', timestamp: admin.firestore.FieldValue.serverTimestamp() });
        res.status(200).json({ status: 'ok', firebase: 'connected' });
    } catch (error) {
        res.status(500).json({ error: 'Firebase connection failed', details: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
