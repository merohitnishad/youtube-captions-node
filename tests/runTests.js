import { getTranscriptFromUrl } from '../dist/index.js';

// Test videos
const testVideos = [
    {
        name: 'Video with captions (Test 1)',
        url: 'https://www.youtube.com/watch?v=Qqyp00JPJZI'
    },
    {
        name: 'Video with captions (Test 2)',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },
    {
        name: 'Direct video ID',
        url: 'Qqyp00JPJZI'
    }
];

async function runTests() {
    console.log('='.repeat(80));
    console.log('TRANSCRIPT ENGINE - TEST SUITE');
    console.log('='.repeat(80));
    console.log('');

    for (let i = 0; i < testVideos.length; i++) {
        const test = testVideos[i];
        console.log(`\n${'='.repeat(80)}`);
        console.log(`TEST ${i + 1}: ${test.name}`);
        console.log(`URL: ${test.url}`);
        console.log('='.repeat(80));

        try {
            const result = await getTranscriptFromUrl(test.url);

            if (result.error) {
                console.log('\n❌ ERROR:');
                console.log(JSON.stringify(result, null, 2));
            } else {
                console.log('\n✅ SUCCESS:');
                console.log('\n--- METADATA ---');
                console.log(`Title: ${result.title}`);
                console.log(`Video ID: ${result.videoId}`);
                console.log(`Language: ${result.languageName} (${result.language})`);

                console.log('\n--- STATISTICS ---');
                console.log(`Raw transcript length: ${result.transcript_raw.length} characters`);
                console.log(`Clean transcript length: ${result.transcript_clean.length} characters`);
                console.log(`Word count: ${result.transcript_clean.split(/\s+/).length} words`);

                console.log('\n--- RAW TRANSCRIPT (first 200 chars) ---');
                console.log(result.transcript_raw.substring(0, 200) + '...');

                console.log('\n--- CLEAN TRANSCRIPT (first 400 chars) ---');
                console.log(result.transcript_clean.substring(0, 400) + '...');

                console.log('\n--- FULL JSON OUTPUT ---');
                console.log(JSON.stringify(result, null, 2));
            }

        } catch (error) {
            console.log('\n❌ UNEXPECTED ERROR:');
            console.log(error.message);
            console.log(error.stack);
        }

        console.log('');
    }

    console.log('\n' + '='.repeat(80));
    console.log('TEST SUITE COMPLETED');
    console.log('='.repeat(80));
}

// Run the tests
runTests().catch(error => {
    console.error('Fatal error running tests:', error);
    process.exit(1);
});
