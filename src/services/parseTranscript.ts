import type { CaptionData, ParsedTranscript } from '../types.js';

/**
 * Combine all caption segments into full text
 * @param captionData - Caption data from YouTube (JSON3 format)
 * @returns Combined text from all caption segments
 */
export function combineCaptionText(captionData: CaptionData): string {
    if (!captionData || !captionData.events) {
        return '';
    }

    const textSegments: string[] = [];

    for (const event of captionData.events) {
        // Each event has a 'segs' array containing text segments
        if (event.segs) {
            for (const seg of event.segs) {
                if (seg.utf8) {
                    textSegments.push(seg.utf8);
                }
            }
        }
    }

    // Join all segments with spaces and clean up extra whitespace
    return textSegments.join(' ').replace(/\s+/g, ' ').trim();
}

/**
 * Parse caption data and extract segments with timestamps
 * @param captionData - Caption data from YouTube
 * @returns Parsed transcript with segments
 */
export function parseTranscript(captionData: CaptionData): ParsedTranscript {
    if (!captionData || !captionData.events) {
        return {
            segments: [],
            fullText: ''
        };
    }

    const segments = [];

    for (const event of captionData.events) {
        if (event.segs) {
            const timestamp = event.tStartMs || 0;
            const duration = event.dDurationMs || 0;

            for (const seg of event.segs) {
                if (seg.utf8) {
                    segments.push({
                        text: seg.utf8,
                        timestamp: timestamp,
                        duration: duration
                    });
                }
            }
        }
    }

    const fullText = combineCaptionText(captionData);

    return {
        segments,
        fullText
    };
}
