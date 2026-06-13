# youtube-caption-node

A TypeScript-powered Node.js module to fetch and parse YouTube video transcripts/captions.

## Installation

```bash
npm install youtube-caption-node
```

## Usage

### TypeScript

```typescript
import { getTranscriptFromUrl } from 'youtube-caption-node';

const result = await getTranscriptFromUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ');

if ('error' in result) {
    console.log('Error:', result.error);
} else {
    console.log('Title:', result.title);
    console.log('Video ID:', result.videoId);
    console.log('Clean Transcript:', result.transcript_clean);
}
```

### JavaScript

```javascript
import { getTranscriptFromUrl } from 'youtube-caption-node';

const result = await getTranscriptFromUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ');

if (result.error) {
    console.log('Error:', result.error);
} else {
    console.log('Title:', result.title);
    console.log('Clean Transcript:', result.transcript_clean);
}
```

## API

### `getTranscriptFromUrl(url: string): Promise<TranscriptResponse>`

**Parameters:**
- `url` - YouTube video URL or video ID

**Success Response:**

TypeScript interface:
```typescript
interface TranscriptResult {
  title: string;
  videoId: string;
  language: string;
  languageName: string;
  transcript_raw: string;
  transcript_clean: string;
}
```

Example:
```json
{
  "title": "Video Title",
  "videoId": "dQw4w9WgXcQ",
  "language": "en",
  "languageName": "English",
  "transcript_raw": "Full raw transcript text...",
  "transcript_clean": "Cleaned and formatted transcript..."
}
```

**Error Response:**

TypeScript interface:
```typescript
interface TranscriptError {
  error: string;
  videoId: string | null;
}
```

Example:
```json
{
  "error": "No transcript available",
  "videoId": "dQw4w9WgXcQ"
}
```

## Supported URL Formats

- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/embed/VIDEO_ID`
- `VIDEO_ID` (direct video ID)

## TypeScript Types

```typescript
import { 
  getTranscriptFromUrl,
  TranscriptResponse,
  TranscriptResult,
  TranscriptError 
} from 'youtube-caption-node';
```

## Author

**Rohit Nishad**
- Website: [rohitnishad.com](https://rohitnishad.com)
- GitHub: [@merohitnishad](https://github.com/merohitnishad)
- npm: [rohitnishad](https://www.npmjs.com/~rohitnishad)

## Links

- [GitHub Repository](https://github.com/merohitnishad/youtube-captions-node)
- [npm Package](https://www.npmjs.com/package/youtube-caption-node)
- [Report Issues](https://github.com/merohitnishad/youtube-captions-node/issues)

## License

MIT © [Rohit Nishad](https://github.com/merohitnishad)

