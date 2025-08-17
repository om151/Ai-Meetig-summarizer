import { useMemo, useState } from 'react'

const API_BASE = import.meta.env.VITE_API_BASE;

export default function App() {
  const [transcript, setTranscript] = useState('')
  const [instruction, setInstruction] = useState('Summarize in bullet points for executives')
  const [summary, setSummary] = useState('')
  const [emails, setEmails] = useState('')
  const [loadingG, setLoadingG] = useState(false)
  const [loadingE, setLoadingE] = useState(false)
  const [status, setStatus] = useState('')
  const [showPreview, setShowPreview] = useState(true)

  const htmlPreview = useMemo(() => markedToHtml(summary), [summary])

  const loadSample = () => {
    const sample = `Sarah: Let’s review the campaign performance.  
Alex: The Instagram ads got good engagement, but LinkedIn didn’t perform as expected.  
Maya: Should we shift more budget to Instagram?  
Sarah: Yes, let’s reallocate 20% from LinkedIn to Instagram.  
Alex: We also need new blog posts for SEO.  
Maya: I can draft 2 articles by next week.  
Sarah: Perfect. Also, prepare a report for the client meeting on Tuesday.  
Alex: Got it. I’ll prepare the slides.  
`
    setTranscript(sample)
  }

  const clearAll = () => { setTranscript(''); setInstruction(''); setSummary(''); setEmails(''); setStatus(''); }

  const onFile = async (file) => {
    const text = await file.text()
    setTranscript(text)
  }

  const generate = async () => {
    setLoadingG(true);
    setStatus('');
    try {
      const res = await fetch(`${API_BASE}/api/summary`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript, prompt: instruction })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed')
      setSummary(data.summary || '')
      setStatus('Summary generated.')
    } catch (e) {
      setStatus('Error: ' + e.message)
      console.log(e);
    } finally { setLoadingG(false) }
  }

  const sendEmail = async () => {
    setLoadingE(true);
    setStatus('');
    try {
      const res = await fetch(`${API_BASE}/api/send-email`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipients: emails,
          subject: 'Meeting Summary',
          summary: summary.replace(/[#*_`>-]/g, ''),
          html: htmlPreview
        })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed')
      setStatus('Email sent ✔️')
    } catch (e) {
      setStatus('Error: ' + e.message)
    } finally { setLoadingE(false) }
  }

  const copySummary = async () => {
    try {
       await navigator.clipboard.writeText(summary); setStatus('Copied to clipboard ✅') 
      } 
      catch {}
  }

  const downloadMd = () => {
    const blob = new Blob([summary], { type: 'text/markdown;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'meeting-summary.md'
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="max-w-[1100px] mx-auto my-6 p-4 font-sans">
  <h1 className="text-5xl font-bold mb-4 " style={{ lineHeight: '1.1em' }}>AI Meeting Summarizer</h1>

  {/* Toolbar */}
  <div className="flex gap-2 flex-wrap mb-3">
    <button className="px-3 py-2 rounded-lg border-black bg-white text-black hover:bg-gray-100 font-medium font-family-inherit cursor-pointer border-2 " onClick={loadSample}>
      Load sample
    </button>
    <button className="px-3 py-2 rounded-lg border-black bg-white text-black hover:bg-gray-100 font-medium font-family-inherit cursor-pointer border-2 " onClick={clearAll}>
      Clear
    </button>
    <button
      className="px-3 py-2 rounded-lg border-black bg-white text-black hover:bg-gray-100 font-medium font-family-inherit cursor-pointer border-2 "
      onClick={() => setShowPreview(v => !v)}
    >
      {showPreview ? 'Hide Preview' : 'Show Preview'}
    </button>
  </div>

  {/* Row */}
  <div className="grid gap-6 md:grid-cols-2">
    {/* Left card */}
    <div className="border border-gray-200 rounded-xl p-4">
      <label className="font-medium">Transcript (paste or upload .txt)</label>
      <div className="flex gap-2 items-center mt-2">
        <input
    type="file"
    accept=".txt"
    onChange={e => e.target.files?.[0] && onFile(e.target.files[0])}
    className="block w-full text-sm text-gray-500 
               file:mr-4 file:py-2 file:px-2
               file:rounded-md file:border-0
               file:text-sm file:font-medium
               file:bg-white file:text-gray-800
               hover:file:bg-gray-800
               hover:file:text-white
               cursor-pointer"
  />
      </div>
      <textarea
        value={transcript}
        onChange={e => setTranscript(e.target.value)}
        rows={12}
        placeholder="Paste your raw meeting transcript here..."
        className="w-full mt-2 border border-gray-300 rounded-lg p-2"
      />

      <div className="mt-4">
        <label className="font-medium">Custom instruction</label>
        <input
          type="text"
          value={instruction}
          onChange={e => setInstruction(e.target.value)}
          placeholder="e.g., Highlight only action items"
          className="w-full mt-2 border border-gray-300 rounded-lg p-2"
        />
      </div>

      <button
        className="px-3 py-2 mt-4 rounded-lg border border-black bg-black text-white disabled:opacity-60 disabled:cursor-default font-medium font-family-inherit cursor-pointer border-2 border-transparent"
        onClick={generate}
        disabled={loadingG || !transcript.trim()}
      >
        {loadingG ? 'Working…' : 'Generate Summary'}
      </button>

      <div className="min-h-6 mt-2 text-sm text-gray-300">{status}</div>
    </div>

    {/* Right card */}
    <div className="border border-gray-200 rounded-xl p-4">
      <label className="font-medium">Generated summary (editable)</label>
      <textarea
        value={summary}
        onChange={e => setSummary(e.target.value)}
        rows={12}
        placeholder="Your AI summary will appear here. You can edit before sharing."
        className="w-full mt-2 border border-gray-300 rounded-lg p-2"
      />

      <div className="flex gap-2 flex-wrap mt-2">
        <button
          className="px-3 py-2 rounded-lg border border-black bg-white text-black disabled:opacity-60 disabled:cursor-default font-medium font-family-inherit cursor-pointer border-2 border-transparent"
          onClick={copySummary}
          disabled={!summary.trim()}
        >
          Copy
        </button>
        <button
          className="px-3 py-2 rounded-lg border border-black bg-white text-black disabled:opacity-60 disabled:cursor-default font-medium font-family-inherit cursor-pointer border-2 border-transparent"
          onClick={downloadMd}
          disabled={!summary.trim()}
        >
          Download .md
        </button>
      </div>

      <div className="mt-4">
        <label className="font-medium">Share via email (comma-separated)</label>
        <input
          type="text"
          value={emails}
          onChange={e => setEmails(e.target.value)}
          placeholder="alice@acme.com, bob@acme.com"
          className="w-full mt-2 border border-gray-300 rounded-lg p-2"
        />
        <button
          className="px-3 py-2 mt-2 rounded-lg border border-black bg-black text-white disabled:opacity-60  font-medium font-family-inherit cursor-pointer border-2 border-transparent disabled:cursor-default"
          onClick={sendEmail}
          disabled={loadingE || !summary.trim() || !emails.trim()}
        >
          {loadingE ? 'Sending…' : 'Send Email'}
        </button>
      </div>
    </div>
  </div>

  {/* Preview */}
  {showPreview && (
    <div className="border border-gray-200 rounded-xl p-4 mt-4">
      <label className="font-medium">Preview (rendered HTML)</label>
      <div
        className="border border-dashed border-gray-200 rounded-xl p-3 bg-gray-50 mt-2 text-black"
        dangerouslySetInnerHTML={{ __html: htmlPreview }}
      />
      <p className="text-gray-500 text-xs mt-2">
        Tip: Email route sends both HTML and plain text versions for deliverability.
      </p>
    </div>
  )}
</div>

  )
}

// Minimal Markdown -> HTML converter (headings, bold/italic, lists, paragraphs)
function markedToHtml(md) {
  if (!md) return '<div />'
  let html = md
    .replace(/^###### (.*)$/gim, '<h6>$1</h6>')
    .replace(/^##### (.*)$/gim, '<h5>$1</h5>')
    .replace(/^#### (.*)$/gim, '<h4>$1</h4>')
    .replace(/^### (.*)$/gim, '<h3>$1</h3>')
    .replace(/^## (.*)$/gim, '<h2>$1</h2>')
    .replace(/^# (.*)$/gim, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
    .replace(/__(.*?)__/g, '<b>$1</b>')
    .replace(/\*(.*?)\*/g, '<i>$1</i>')
    .replace(/_(.*?)_/g, '<i>$1</i>')

  // Lists (supports lines beginning with - or *)
  html = html.split('\n').map(line => {
    const m = line.match(/^\s*[-*] (.*)$/)
    return m ? `<li>${m[1]}</li>` : line
  }).join('\n')
  if (/<li>/.test(html)) html = `<ul>${html}</ul>`

  // Paragraph breaks
  html = html.replace(/\n\n/g, '<br/><br/>')

  return `<div>${html}</div>`
}