# iTrailer
iTrailer - Download trailers from any iTunes movies

A Node.js web application that allows you to extract and download movie trailers from Apple TV URLs through a web interface. The application uses Puppeteer to scrape the trailer URL and `yt-dlp` to download the trailer.

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
   cd your-repo-name
