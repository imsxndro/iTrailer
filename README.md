# iTrailer
iTrailer - Download trailers from any iTunes movies (FR only)

A Node.js web application that allows you to extract and download movie trailers from Apple TV URLs through a web interface. The application uses Puppeteer to scrape the trailer URL and `yt-dlp` to download the trailer.

FULLY MADE WITH ChatGPT (even the README.md, lol)

## ONLY WORK WITH FR market ([line 55 in server.js](https://github.com/imsxndro/iTrailer/blob/main/server.js)) by now...



## Features

- Web interface to input Apple TV movie URLs.
- Automatically extracts trailer URLs and downloads the video.
- Saves the trailer with a filename formatted as `name-of-the-movie_trailer.mp4`.

## Prerequisites

- Node.js (v14 or higher)
- `yt-dlp` npm package
- Puppeteer
- Express (for the web server)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/imsxndro/iTrailer.git
   cd iTrailer

2. **Install Dependencies:**

```bash
   npm install
```

3. **Usage:**
Start the Server:

```bash
node server.js
```
Open your web browser and navigate to http://localhost:3000.

Enter the Apple TV movie URL in the input field and click "Download Trailer."

The trailer will be processed and downloaded to the downloads directory with a filename formatted as name-of-the-movie_trailer.mp4.

## Code Structure

- **server.js**: The main server file that sets up the Express server and handles requests and downloading the trailer using yt-dlp.

- **public/index.html**: The HTML file that provides the web interface for inputting movie URLs.
