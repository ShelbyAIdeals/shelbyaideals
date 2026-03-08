'use client';

import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

export default function SubmitToolForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    toolName: '',
    toolUrl: '',
    category: '',
    submitterEmail: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store submission in localStorage for now (will integrate with backend later)
    const submissions = JSON.parse(localStorage.getItem('toolSubmissions') || '[]');
    submissions.push({ ...form, date: new Date().toISOString() });
    localStorage.setItem('toolSubmissions', JSON.stringify(submissions));
    setSubmitted(true);
  };

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      {submitted ? (
        <div className="card p-8 text-center">
          <CheckCircle size={48} className="text-accent-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Tool submitted!</h2>
          <p className="text-void-300">
            We've added it to our queue. If we review it, we'll let you know.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="toolName" className="block text-sm font-semibold text-void-200 mb-1.5">
              Tool Name *
            </label>
            <input
              id="toolName"
              type="text"
              required
              value={form.toolName}
              onChange={(e) => update('toolName', e.target.value)}
              placeholder="e.g. Jasper AI"
              className="search-input"
            />
          </div>

          <div>
            <label htmlFor="toolUrl" className="block text-sm font-semibold text-void-200 mb-1.5">
              Website URL *
            </label>
            <input
              id="toolUrl"
              type="url"
              required
              value={form.toolUrl}
              onChange={(e) => update('toolUrl', e.target.value)}
              placeholder="https://example.com"
              className="search-input"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-semibold text-void-200 mb-1.5">
              Category *
            </label>
            <select
              id="category"
              required
              value={form.category}
              onChange={(e) => update('category', e.target.value)}
              className="search-input"
            >
              <option value="">Select a category</option>
              <option value="ai-writing-tools">AI Writing Tools</option>
              <option value="ai-design-tools">AI Design & Video</option>
              <option value="ai-coding-tools">AI Coding Tools</option>
              <option value="ai-automation">AI Automation</option>
              <option value="ai-seo-tools">AI SEO Tools</option>
              <option value="ai-productivity">AI Productivity</option>
            </select>
          </div>

          <div>
            <label htmlFor="submitterEmail" className="block text-sm font-semibold text-void-200 mb-1.5">
              Your Email (optional)
            </label>
            <input
              id="submitterEmail"
              type="email"
              value={form.submitterEmail}
              onChange={(e) => update('submitterEmail', e.target.value)}
              placeholder="you@email.com"
              className="search-input"
            />
            <p className="text-xs text-void-500 mt-1">We'll notify you when the review goes live.</p>
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-semibold text-void-200 mb-1.5">
              Notes (optional)
            </label>
            <textarea
              id="notes"
              rows={3}
              value={form.notes}
              onChange={(e) => update('notes', e.target.value)}
              placeholder="Why should we review this tool? Any specific features to test?"
              className="search-input resize-none"
            />
          </div>

          <button type="submit" className="btn-primary w-full gap-2">
            <Send size={16} />
            Submit Tool for Review
          </button>
        </form>
      )}
    </>
  );
}
