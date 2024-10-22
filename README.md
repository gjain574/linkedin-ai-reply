# LinkedIn AI Reply Assistant

This project is a browser extension that adds an AI assistant to LinkedIn messaging, helping users compose better replies.

## Features

- Adds an AI assistant icon to LinkedIn message composition areas
- Opens a modal interface for AI-assisted message generation
- Integrates seamlessly with LinkedIn's existing UI

## Technical Overview

The extension is built using React, TypeScript & Tailwind CSS and is designed to work with LinkedIn's web interface.

### Key Components

1. **App.tsx**: The main React component that manages the modal state and listens for events from the content script.

2. **index.tsx**: The content script entry point that:
   - Initializes the extension UI
   - Injects the AI assistant icon into LinkedIn message containers
   - Manages communication between the LinkedIn page and the extension's React app

### How it Works

1. The extension injects a shadow DOM into LinkedIn pages.
2. It observes the page for new message containers and adds an AI assistant icon to each editable message container.
3. When the icon is clicked, it opens a modal (implemented in a separate `Modal` component).
4. The modal interface allows users to interact with the AI assistant for message composition.

## Development

To set up the project for development:

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development build: `npm run dev`