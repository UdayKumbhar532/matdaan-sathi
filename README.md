<div align="center">
  <img src="https://img.icons8.com/color/96/000000/india-map.png" alt="India Map Icon"/>
  <h1>🇮🇳 Matdaan Sathi (Election Assistant)</h1>
  <p><b>Empowering Indian Citizens with Electoral Knowledge & Resources</b></p>

  [![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)](#)
  [![Platform](https://img.shields.io/badge/Platform-Web-blue?style=for-the-badge)](#)
  [![Cloud Run](https://img.shields.io/badge/Deployed_on-Google_Cloud-orange?style=for-the-badge)](https://matdaan-sathi-831458481896.us-central1.run.app)
  
  <br />

  <h3>🌟 <a href="https://matdaan-sathi-831458481896.us-central1.run.app"><b>Try the Live Application Here</b></a> 🌟</h3>
</div>

<br />

## 📖 About The Project

**Matdaan Sathi** is a comprehensive, interactive, and beautifully designed web application built to empower Indian citizens with essential knowledge about the electoral process. Recognizing that democracy thrives on informed participation, this platform bridges the gap between complex electoral rules and the everyday voter.

Whether you are a first-time voter learning how to register, or an experienced citizen reviewing the Model Code of Conduct, Matdaan Sathi provides a reliable, secure, and engaging educational experience—right from your browser.

---

## ✨ Key Features

### 🤖 VoteBot (Offline AI Assistant)
A lightning-fast, rule-based AI chatbot packed with a knowledge base of over 30+ Indian election topics. 
- Ask questions like: *"How to register to vote?"*, *"What is NOTA?"*, or *"What is the Model Code of Conduct?"*
- **Privacy First:** Operates 100% offline in your browser. Zero internet connection or API keys required after loading.

### 🎮 Gamified Quiz Arena
Test your knowledge in a high-stakes, time-based quiz environment!
- Live countdown timer and visual progress tracking.
- Immersive HUD-style scoring and dynamic animations.
- Rank-based badges and a confetti celebration upon completion.

### 🎴 Interactive Flashcards
A sleek, flip-card interface designed for quick micro-learning.
- Learn crucial terms like **VVPAT**, **ECI**, **EVM**, and the **Representation of the People Act**.
- Touch-friendly design for mobile users.

### 🎨 Premium UI/UX Design
- **"Official Modern Indian" Theme:** A stunning palette utilizing Navy Blue, Saffron, and White, reflecting institutional trust.
- Fully responsive architecture that looks beautiful on desktop, tablet, and mobile.

---

## 🛠️ Technology Stack

Matdaan Sathi is built with high performance and accessibility in mind, relying on vanilla web technologies to ensure maximum compatibility.

- **HTML5:** Semantic, accessible page structure.
- **Vanilla CSS3:** Advanced animations, glassmorphism UI traits, and responsive layouts without heavy CSS frameworks.
- **Vanilla JavaScript:** Efficient DOM manipulation, state management, offline bot logic, and quiz gamification.
- **Lucide Icons:** Clean, modern iconography.
- **Docker & Nginx:** Containerized for easy cloud deployment.

---

## 🚀 Getting Started

### Run Locally (Development)

Since this is a static, client-side application, running it locally is incredibly simple:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/UdayKumbhar532/matdaan-sathi.git
   ```
2. **Navigate to the folder:**
   ```bash
   cd matdaan-sathi
   ```
3. **Open the App:**
   Simply double-click `index.html` to open it in your web browser. 
   *(For the best experience, serve it via a local server like `npx serve .` or VS Code Live Server).*

---

## ☁️ Deployment

This project is currently deployed and hosted on **Google Cloud Run**.

The repository includes a highly optimized `Dockerfile` and `nginx.conf` designed to securely serve the static files on scalable cloud infrastructure.

### Deploying to your own Cloud Run:

1. Ensure the [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) is installed and authenticated.
2. Set your Google Cloud Project:
   ```bash
   gcloud config set project YOUR_PROJECT_ID
   ```
3. Deploy directly from the source code:
   ```bash
   gcloud run deploy matdaan-sathi --source . --region us-central1 --allow-unauthenticated
   ```

---

<div align="center">
  <p><i>"Democracy is not just a form of government. It is primarily a mode of associated living, of conjoint communicated experience."</i></p>
  <p><b>— Dr. B.R. Ambedkar</b></p>
</div>
