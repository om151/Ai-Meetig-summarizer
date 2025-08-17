# AI Meeting Summarizer Backend

This backend provides APIs to generate structured meeting summaries using Google Gemini AI and send them via email.

## API Endpoints

### 1. Generate Meeting Summary

**POST `/api/summary`**

- **Request Body:**
  ```json
  {
    "transcript": "Meeting transcript text",
    "prompt": "Custom prompt for summary"
  }
  ```
- **Response:**
  ```json
  {
    "summary": "Markdown formatted meeting summary"
  }
  ```

---

### 2. Send Meeting Summary via Email

**POST `/api/send-email`**

- **Request Body:**
  ```json
  {
    "recipients": ["email1@example.com", "email2@example.com"],
    "summary": "Plain text summary",
    "html": "<b>HTML/Markdown summary</b>"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Email sent",
    "info": { /* nodemailer info */ }
  }
  ```

---

## Example Usage

### Generate Summary

```http
POST /api/summary
Content-Type: application/json

{
  "transcript": "Project kickoff meeting transcript...",
  "prompt": "Summarize the meeting as per the app instructions."
}
```

### Send Email

```http
POST /api/send-email
Content-Type: application/json

{
  "recipients": ["om@example.com", "raj@example.com"],
  "summary": "Meeting summary in plain text...",
  "html": "<b>Meeting summary in HTML/markdown...</b>"
}
```

---