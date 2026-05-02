# Matdaan Sathi (Election Assistant)

![Matdaan Sathi](https://img.shields.io/badge/Status-Active-success)

Matdaan Sathi is a comprehensive, interactive, and beautifully designed web application built to empower Indian citizens with essential knowledge about the electoral process. Recognizing that democracy thrives on informed participation, this platform bridges the gap between complex electoral rules and the everyday voter.

It features a Gamified Quiz Arena to test your knowledge, an Offline AI Chatbot ("VoteBot") that acts as a personal election guide, and interactive flashcards to demystify electoral terminology. Whether you are a first-time voter learning how to register, or an experienced citizen reviewing the Model Code of Conduct, Matdaan Sathi provides a reliable, secure, and engaging educational experience.

## Features

- **VoteBot (Offline AI Assistant):** A rule-based AI chatbot packed with a knowledge base of over 30+ Indian election topics (Registration, EVM, NOTA, Model Code of Conduct, etc.). Requires zero internet connection or API keys.
- **Gamified Quiz Arena:** Test your knowledge with a timer, real-time score tracking, dynamic animations, and a final confetti celebration.
- **Interactive Flashcards:** Learn key electoral terms (VVPAT, ECI, NOTA) through beautifully designed flip cards.
- **Responsive Design:** A polished "Official Modern Indian" theme (Navy Blue, Saffron, and White) that works seamlessly across desktop and mobile devices.

## Technology Stack

- **HTML5:** Semantic structure.
- **Vanilla CSS3:** Custom styling, animations, and responsive layouts without heavy frameworks.
- **Vanilla JavaScript:** State management, offline bot logic, and quiz gamification.
- **Lucide Icons:** Clean, modern iconography.
- **Docker & Nginx:** Ready for containerized deployment.

## Getting Started

### Run Locally

Since this is a static site, you can run it directly in your browser or use a local development server:

1. Clone the repository:
   ```bash
   git clone https://github.com/UdayKumbhar532/matdaan-sathi.git
   ```
2. Navigate to the project directory:
   ```bash
   cd matdaan-sathi
   ```
3. Open `index.html` in your favorite web browser.
   *(Alternatively, use `npx serve .` or VS Code Live Server for a better development experience).*

### Deploy to Google Cloud Run

This repository includes a `Dockerfile` and `nginx.conf` pre-configured to serve the application on Google Cloud Run.

1. Ensure you have the [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) installed and authenticated.
2. Set your Google Cloud Project:
   ```bash
   gcloud config set project YOUR_PROJECT_ID
   ```
3. Deploy directly from source:
   ```bash
   gcloud run deploy matdaan-sathi --source . --region us-central1 --allow-unauthenticated
   ```
