# AI Meeting Summarizer

A full-stack application to generate, edit, and share structured meeting summaries using Google Gemini AI. Includes a React + Vite frontend and an Express backend with email sharing.

---

## Features

- **Paste or Upload Transcript:** Paste meeting transcript or upload a `.txt` file.
- **Custom Instructions:** Add instructions for summary generation.
- **AI-Powered Summary:** Generates markdown-formatted summaries using Gemini AI.
- **Editable Output:** Edit the summary before sharing.
- **Copy & Download:** Copy summary to clipboard or download as `.md`.
- **Email Sharing:** Send summary via email to multiple recipients.
- **Live Preview:** See rendered HTML preview of the markdown summary.

---

## Getting Started

### 1. Clone the Repository

```sh
git clone https://github.com/your-username/Ai-Meetig-summarizer.git
cd ai-meeting-summarizer
```

---

## Backend Setup

1. **Install dependencies:**
   ```sh
   cd Backend
   npm install
   ```

2. **Configure environment variables:**
   - Copy `.env` and set your Google Gemini API key and Gmail credentials:
     ```
     GEMINI_API_KEY=your_google_gemini_api_key
     EMAIL_USER=your_gmail_address@gmail.com
     EMAIL_PASS=your_gmail_app_password
     ```

3. **Start the backend server:**
   ```sh
   npm run dev
   ```
   - Server runs on [http://localhost:8080](http://localhost:8080)

4. **API Endpoints:**
   - `POST /api/summary`  
     Request: `{ transcript, prompt }`  
     Response: `{ summary }`
   - `POST /api/send-email`  
     Request: `{ recipients, summary, html }`  
     Response: `{ message, info }`

See [Backend/README.md](Backend/README.md) for API details.

---

## Frontend Setup

1. **Install dependencies:**
   ```sh
   cd Frontend
   npm install
   ```

2. **Configure API base (optional):**
   - Create `.env` and set:
     ```
     VITE_API_BASE=http://localhost:8080
     ```
   - Defaults to `http://localhost:8080` if not set.

3. **Start the frontend dev server:**
   ```sh
   npm run dev
   ```
   - App runs on [http://localhost:5173](http://localhost:5173) (default Vite port)

---

## Usage

1. Start both backend and frontend servers.
2. Open the frontend in your browser.
3. Paste or upload a meeting transcript.
4. Optionally, modify the instruction for summary generation.
5. Click **Generate Summary**.
6. Edit, copy, download, or share the summary via email.
7. Use the preview to see how the summary will look in HTML.

---

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Express, Google Gemini AI, Nodemailer

---