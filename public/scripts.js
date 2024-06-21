// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEgR2O0cspIp_8IdjG0_sGpVH3adJf1Wg",
  authDomain: "drivegenie-55a45.firebaseapp.com",
  projectId: "drivegenie-55a45",
  storageBucket: "drivegenie-55a45.appspot.com",
  messagingSenderId: "1082961364837",
  appId: "1:1082961364837:web:10281217fbcb234b80038c",
  measurementId: "G-XT7JM9HYX8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);

// Reference to authentication buttons
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');

// Event listeners for authentication buttons
loginBtn.addEventListener('click', () => {
    // Redirect to login page or show login modal
    window.location.href = 'login.html';
});

signupBtn.addEventListener('click', () => {
    // Redirect to signup page or show signup modal
    window.location.href = 'signup.html';
});

// Event listeners for dashboard navigation
document.getElementById('exploreModules').addEventListener('click', () => {
    // Redirect to explore modules page
    window.location.href = 'modules.html';
});

document.getElementById('trackPerformance').addEventListener('click', () => {
    // Redirect to track performance page
    window.location.href = 'performance.html';
});

document.getElementById('leaderboard').addEventListener('click', () => {
    // Redirect to leaderboard page
    window.location.href = 'leaderboard.html';
});

// Example: Display user profile info
onAuthStateChanged(auth, (user) => {
    if (user) {
        const profileInfo = document.getElementById('profileInfo');
        profileInfo.innerHTML = `<p>Welcome, ${user.displayName}!</p>`;
    } else {
        window.location.href = 'login.html';
    }
});

// Example: Loading training modules from Firebase Realtime Database
const trainingModulesRef = ref(database, 'trainingModules');
onValue(trainingModulesRef, (snapshot) => {
    const trainingModules = snapshot.val();
    const trainingModulesContainer = document.getElementById('trainingModules');

    for (let key in trainingModules) {
        const module = trainingModules[key];
        const moduleCard = document.createElement('div');
        moduleCard.classList.add('moduleCard');
        moduleCard.innerHTML = `
            <h3>${module.title}</h3>
            <p>${module.description}</p>
            <button>Start</button>
        `;
        trainingModulesContainer.appendChild(moduleCard);
    }
});
