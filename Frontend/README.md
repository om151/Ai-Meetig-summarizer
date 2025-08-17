# AI Meeting Summarizer Frontend

This is a React + Vite frontend for the AI Meeting Summarizer app. It allows users to generate structured meeting summaries using Google Gemini AI and share them via email.

## Features

- **Paste or Upload Transcript:** Paste meeting transcript or upload a `.txt` file.
- **Custom Instructions:** Add instructions for summary generation (e.g., "Highlight only action items").
- **AI-Powered Summary:** Generates a clean, markdown-formatted summary using the backend API.
- **Editable Output:** Edit the generated summary before sharing.
- **Copy & Download:** Copy summary to clipboard or download as `.md` file.
- **Email Sharing:** Send summary via email to multiple recipients.
- **Live Preview:** See rendered HTML preview of the markdown summary.



## Usage

1. Paste or upload your meeting transcript.
2. Optionally, modify the instruction for summary generation.
3. Click **Generate Summary**.
4. Edit, copy, download, or share the summary via email.
5. Use the preview to see how the summary will look in HTML.

## API Endpoints Used

- `POST /api/summary` – Generates meeting summary.
- `POST /api/send-email` – Sends summary via email.

See [../Backend/README.md](../Backend/README.md) for backend