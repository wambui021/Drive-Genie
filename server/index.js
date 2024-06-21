const express = require('express');
const firebaseAdmin = require('firebase-admin');
const path = require('path');

const app = express();
const port = 3000;

// Firebase Admin SDK initialization
const serviceAccountPath = path.resolve('C:/Users/USER/Downloads/drivegenie-55a45-firebase-adminsdk-mfyms-8fd625e998.json');
const serviceAccount = require(serviceAccountPath);
firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: "https://drivegenie-55a45-default-rtdb.firebaseio.com"
});

// Middleware to serve static files
app.use(express.static(path.join(__dirname, '../public')));

// Example API endpoint for fetching training modules
app.get('/api/training-modules', async (req, res) => {
    try {
        const snapshot = await firebaseAdmin.database().ref('trainingModules').once('value');
        const modules = snapshot.val();
        res.json(modules);
    } catch (error) {
        console.error('Error fetching training modules:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route all other requests to index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// Start server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
