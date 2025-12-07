/**
 * Shared type definitions for transcript-engine
 */

/**
 * Successful transcript result
 */
export interface TranscriptResult {
    title: string;
    videoId: string;
    language: string;
    languageName: string;
    transcript_raw: string;
    transcript_clean: string;
}

/**
 * Error result when transcript cannot be fetched
 */
export interface TranscriptError {
    error: string;
    videoId: string | null;
}

/**
 * Union type for all possible results
 */
export type TranscriptResponse = TranscriptResult | TranscriptError;

/**
 * Individual caption segment with timestamp
 */
export interface CaptionSegment {
    text: string;
    timestamp: number;
    duration: number;
}

/**
 * Parsed transcript with segments and full text
 */
export interface ParsedTranscript {
    segments: CaptionSegment[];
    fullText: string;
}

/**
 * Caption track info from YouTube API
 */
export interface CaptionTrack {
    baseUrl: string;
    languageCode: string;
    name?: {
        simpleText?: string;
    };
}

/**
 * YouTube video details
 */
export interface VideoDetails {
    title?: string;
    videoId?: string;
}

/**
 * YouTube player response structure
 */
export interface PlayerResponse {
    videoDetails?: VideoDetails;
    captions?: {
        playerCaptionsTracklistRenderer?: {
            captionTracks?: CaptionTrack[];
        };
    };
}

/**
 * Caption event segment
 */
export interface CaptionEventSegment {
    utf8?: string;
}

/**
 * Caption event
 */
export interface CaptionEvent {
    segs?: CaptionEventSegment[];
    tStartMs?: number;
    dDurationMs?: number;
}

/**
 * Caption data structure (JSON3 format from YouTube)
 */
export interface CaptionData {
    events?: CaptionEvent[];
    raw?: string;
    format?: string;
}

/**
 * Transcript output with raw and clean versions
 */
export interface TranscriptOutput {
    transcript_raw: string;
    transcript_clean: string;
}
