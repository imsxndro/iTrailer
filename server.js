const express = require('express');
const puppeteer = require('puppeteer');
const { exec } = require('child_process');
const path = require('path');
const { promises: fs } = require('fs');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

async function downloadTrailer(url, movieId, movieTitle) {
    // Define the output directory and file
    const outputDir = path.join(__dirname, 'downloads');
    await fs.mkdir(outputDir, { recursive: true });
    const outputFile = path.join(outputDir, `${movieTitle}_trailer.mp4`);

    // Construct the yt-dlp command
    const command = `yt-dlp -f bestvideo+bestaudio/best -o "${outputFile}" "${url}" --force-generic`;

    return new Promise((resolve, reject) => {
        const downloadProcess = exec(command, { shell: true });

        downloadProcess.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });

        downloadProcess.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });

        downloadProcess.on('close', (code) => {
            if (code === 0) {
                resolve('Download complete!');
            } else {
                reject(`Download process exited with code ${code}`);
            }
        });
    });
}

app.post('/download', async (req, res) => {
    const movieUrl = req.body.url;
    const movieIdMatch = movieUrl.match(/umc\.cmc\.(\w+)/);
    const movieTitleMatch = movieUrl.match(/\/movie\/(.*?)\/umc\.cmc\./);

    if (!movieIdMatch || !movieTitleMatch) {
        return res.status(400).json({ error: 'Movie ID or Title not found in the URL.' });
    }

    const movieId = movieIdMatch[1];
    const movieTitle = movieTitleMatch[1].replace(/-/g, ' ').toLowerCase(); // Replace dashes with spaces and convert to lowercase

    const trailerCollectionUrl = `https://tv.apple.com/fr/collection/bandes-annonces/uts.col.Trailers.umc.cmc.${movieId}`;

    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(trailerCollectionUrl, { waitUntil: 'networkidle2' });

        const links = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('a')).map(link => link.href);
        });

        const trailerUrl = links.find(link => link.includes('/clip/'));

        if (trailerUrl) {
            await downloadTrailer(trailerUrl, movieId, movieTitle);
            res.json({ message: 'Trailer downloaded successfully!' });
        } else {
            res.status(404).json({ error: 'Trailer URL not found on the trailers page.' });
        }

        await browser.close();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
