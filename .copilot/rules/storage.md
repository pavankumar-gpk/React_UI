# Storage Rules (React Project)

1. **Centralized StorageService**
   - Create a single StorageService that encapsulates all localStorage and sessionStorage operations.

2. **Never Direct Access**
   - NEVER access raw localStorage or sessionStorage directly anywhere else in the code.
   - Always go through StorageService.

3. **Error Handling**
   - All storage-related error handling lives inside StorageService only.