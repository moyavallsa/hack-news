#!/bin/bash

# Get the commit message from the command line argument, or use a default message
COMMIT_MESSAGE=${1:-"Update: Auto-deployment commit"}

# Add all changes
git add .

# Commit with the provided message
git commit -m "$COMMIT_MESSAGE"

# Push to GitHub
git push

echo "✨ Changes pushed to GitHub. Netlify deployment should start automatically." 