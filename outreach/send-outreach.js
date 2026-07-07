// Parse outreach md sections ("### Name → email" / "Subject: ..." / body) and send via gws.
const fs = require('fs');
const { execFileSync } = require('child_process');

const md = fs.readFileSync(require('path').join(__dirname, 'vendor-emails-2026-07-07.md'), 'utf8');
const sections = md.split(/^### /m).slice(1);
const DRY = process.argv.includes('--dry');

for (const sec of sections) {
  const lines = sec.split('\n');
  const header = lines[0]; // "Pictory → marketing@pictory.ai"
  const emailMatch = header.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+)/);
  if (!emailMatch) { console.log('SKIP (no email):', header.trim()); continue; }
  const to = emailMatch[1];
  const subjLine = lines.find((l) => l.startsWith('Subject: '));
  const subject = subjLine.replace('Subject: ', '').trim();
  const bodyStart = lines.indexOf(subjLine) + 1;
  const body = lines.slice(bodyStart).join('\n').trim() + '\n';

  const encSubject = `=?UTF-8?B?${Buffer.from(subject, 'utf8').toString('base64')}?=`;
  const encBody = Buffer.from(body, 'utf8').toString('base64');
  const mime =
    `From: Frank Shelby <shelbyaideals@gmail.com>\r\n` +
    `To: ${to}\r\n` +
    `Subject: ${encSubject}\r\n` +
    `MIME-Version: 1.0\r\n` +
    `Content-Type: text/plain; charset=UTF-8\r\n` +
    `Content-Transfer-Encoding: base64\r\n\r\n` +
    encBody;
  const raw = Buffer.from(mime, 'utf8').toString('base64url');

  if (DRY) { console.log('DRY →', to, '|', subject, '|', body.length, 'chars'); continue; }
  const out = execFileSync('gws', ['gmail', 'users', 'messages', 'send', '--params', '{"userId":"me"}', '--json', JSON.stringify({ raw })], { encoding: 'utf8' });
  const id = (out.match(/"id":\s*"([^"]+)"/) || [])[1];
  console.log('SENT →', to, '| msg id:', id);
}
