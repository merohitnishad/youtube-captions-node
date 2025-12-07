import fetch from 'node-fetch';
import type { PlayerResponse, CaptionData } from '../types.js';

/**
 * Extract video ID from various YouTube URL formats
 * @param url - YouTube URL or video ID
 * @returns Extracted video ID or null if invalid
 */
export function extractVideoId(url: string): string | null {
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
        /^([a-zA-Z0-9_-]{11})$/  // Direct video ID
    ];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
            return match[1];
        }
    }

    return null;
}

/**
 * Fetch video information and caption tracks from YouTube
 * @param videoId - YouTube video ID
 * @returns Video info and caption tracks
 */
export async function fetchVideoInfo(videoId: string): Promise<PlayerResponse> {
    const videoInfoUrl = 'https://www.youtube.com/youtubei/v1/player?key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8';

    const requestBody = {
        context: {
            client: {
                clientName: 'WEB',
                clientVersion: '2.20251202.01.00',
                hl: 'en',
                gl: 'US'
            }
        },
        videoId: videoId
    };

    const response = await fetch(videoInfoUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36',
            'Accept': '*/*',
            'Accept-Language': 'en-US,en;q=0.9',
            'Origin': 'https://www.youtube.com',
            'Referer': `https://www.youtube.com/watch?v=${videoId}`
        },
        body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch video info: ${response.status} ${response.statusText}`);
    }

    return await response.json() as PlayerResponse;
}

/**
 * Fetch caption data from YouTube
 * @param baseUrl - Caption track base URL
 * @param videoId - YouTube video ID
 * @returns Caption data in JSON format
 */
export async function fetchCaptionData(baseUrl: string, videoId: string): Promise<CaptionData> {
    const captionUrl = baseUrl + '&fmt=json3';

    const captionResponse = await fetch(captionUrl, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36',
            'Accept': '*/*',
            'Accept-Language': 'en-US,en;q=0.9',
            'Referer': `https://www.youtube.com/watch?v=${videoId}`
        }
    });

    if (!captionResponse.ok) {
        throw new Error(`Failed to fetch captions: ${captionResponse.status} ${captionResponse.statusText}`);
    }

    const captionText = await captionResponse.text();

    try {
        return JSON.parse(captionText) as CaptionData;
    } catch (e) {
        // Return raw text if JSON parsing fails (might be XML)
        return { raw: captionText, format: 'xml' };
    }
}
