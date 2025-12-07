import { extractVideoId, fetchVideoInfo, fetchCaptionData } from './services/fetchTranscript.js';
import { parseTranscript } from './services/parseTranscript.js';
import { generateTranscripts } from './services/cleanTranscript.js';
import type { TranscriptResponse } from './types.js';

/**
 * Get transcript from a YouTube video URL
 * @param url - YouTube video URL or video ID
 * @returns Transcript data including title, videoId, raw and clean transcripts
 */
export async function getTranscriptFromUrl(url: string): Promise<TranscriptResponse> {
    try {
        // Extract video ID from URL
        const videoId = extractVideoId(url);
        if (!videoId) {
            return {
                error: 'Invalid YouTube URL',
                videoId: null
            };
        }

        // Fetch video information and caption tracks
        const playerResponse = await fetchVideoInfo(videoId);

        // Get video title
        const videoTitle = playerResponse?.videoDetails?.title || 'Unknown Title';

        // Get caption tracks
        const captionTracks = playerResponse?.captions?.playerCaptionsTracklistRenderer?.captionTracks;

        if (!captionTracks || captionTracks.length === 0) {
            return {
                error: 'No transcript available',
                videoId: videoId
            };
        }

        // Get the first available caption track (usually auto-generated or English)
        const captionTrack = captionTracks[0];

        // Fetch the caption data
        const captionData = await fetchCaptionData(captionTrack.baseUrl, videoId);

        // Parse the caption data
        const parsed = parseTranscript(captionData);

        // Generate raw and clean transcripts
        const transcripts = generateTranscripts(parsed.fullText);

        return {
            title: videoTitle,
            videoId: videoId,
            language: captionTrack.languageCode,
            languageName: captionTrack.name?.simpleText || 'Unknown',
            transcript_raw: transcripts.transcript_raw,
            transcript_clean: transcripts.transcript_clean
        };

    } catch (error) {
        // Return error in JSON format
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return {
            error: errorMessage,
            videoId: extractVideoId(url)
        };
    }
}

// Export for CommonJS compatibility
export default getTranscriptFromUrl;

// Export types for TypeScript consumers
export type { TranscriptResponse, TranscriptResult, TranscriptError } from './types.js';
