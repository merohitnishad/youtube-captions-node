import type { TranscriptOutput } from '../types.js';

/**
 * Clean transcript text by removing artifacts, tags, and formatting
 * @param text - Raw transcript text
 * @returns Cleaned and formatted transcript
 */
export function cleanTranscript(text: string): string {
    if (!text) return '';

    // Remove common caption artifacts and tags
    let cleaned = text
        // Remove tags like [Music], [Applause], [Laughter], etc.
        .replace(/\[[\w\s]+\]/g, '')
        // Remove speaker markers like >>
        .replace(/\>\>/g, '')
        // Remove timestamps (various formats)
        .replace(/\d{1,2}:\d{2}(?::\d{2})?/g, '')
        // Remove multiple spaces
        .replace(/\s+/g, ' ')
        // Remove leading/trailing whitespace
        .trim();

    // Split into sentences and create paragraphs
    // Split on periods followed by space and capital letter, or on multiple spaces
    const sentences = cleaned.split(/(?<=[.!?])\s+(?=[A-Z])/);

    // Group sentences into paragraphs (roughly 3-5 sentences per paragraph)
    const paragraphs: string[] = [];
    let currentParagraph: string[] = [];

    for (let i = 0; i < sentences.length; i++) {
        currentParagraph.push(sentences[i]);

        // Create a new paragraph every 4-5 sentences or at natural breaks
        if (currentParagraph.length >= 4 || i === sentences.length - 1) {
            paragraphs.push(currentParagraph.join(' ').trim());
            currentParagraph = [];
        }
    }

    // Join paragraphs with double newlines
    return paragraphs.filter(p => p.length > 0).join('\n\n');
}

/**
 * Generate both raw and clean versions of the transcript
 * @param rawText - Raw combined transcript text
 * @returns Object containing both raw and clean versions
 */
export function generateTranscripts(rawText: string): TranscriptOutput {
    return {
        transcript_raw: rawText,
        transcript_clean: cleanTranscript(rawText)
    };
}
