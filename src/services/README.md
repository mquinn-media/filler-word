# Firefiles.ai API Service

This module provides a service layer for interacting with the Firefiles.ai API.

## Usage

```javascript
import firefilesService from './services/firefilesService';

// Upload a file
const file = document.getElementById('fileInput').files[0];
const uploadResult = await firefilesService.uploadFile(file);

// Get file information
const fileInfo = await firefilesService.getFile(fileId);

// List all files
const files = await firefilesService.listFiles();

// Process a file
const result = await firefilesService.processFile(fileId, { /* options */ });

// Delete a file
await firefilesService.deleteFile(fileId);
```

## Available Methods

- `uploadFile(file)` - Upload a file to Firefiles
- `getFile(fileId)` - Get information about a specific file
- `listFiles()` - List all files
- `processFile(fileId, options)` - Process/analyze a file
- `deleteFile(fileId)` - Delete a file

## Security Note

The API key is currently hardcoded in the service. For production, consider:
- Using environment variables
- Implementing key rotation
- Server-side proxy for API calls
