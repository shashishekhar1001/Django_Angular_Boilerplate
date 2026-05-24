import { HttpErrorResponse } from '@angular/common/http';

/**
 * Extracts human-readable error messages from Django REST Framework error responses.
 * Handles multiple DRF error formats:
 * - { detail: "..." }  — general/single error
 * - { field: ["msg"] } — field-level validation errors
 * - { non_field_errors: ["..."] } — non-field errors
 * - Network/connection errors — no response from server
 * - HTTP status code errors (403, 404, 500, etc.)
 */
export function extractApiErrors(error: unknown): string[] {
  const messages: string[] = [];

  if (!error) {
    messages.push('An unexpected error occurred.');
    return messages;
  }

  // HttpErrorResponse from Angular HttpClient
  if (error instanceof HttpErrorResponse) {
    // Network error (no response received)
    if (error.status === 0) {
      messages.push('Unable to connect to the server. Please check your internet connection and try again.');
      return messages;
    }

    // Try to extract DRF-style error body
    const body = error.error;

    if (body && typeof body === 'object') {
      // Single detail message (most common for auth/perm errors)
      if (typeof body.detail === 'string') {
        messages.push(body.detail);
        return messages;
      }

      // Non-field errors (e.g., invalid credentials)
      if (Array.isArray(body.non_field_errors)) {
        messages.push(...body.non_field_errors.map(String));
        return messages;
      }

      // Field-level validation errors: { email: ["This field is required."], password: ["..."] }
      const fieldErrors: string[] = [];
      for (const [field, errors] of Object.entries(body)) {
        if (Array.isArray(errors)) {
          for (const err of errors) {
            if (typeof err === 'string') {
              const label = field
                .replace(/_/g, ' ')
                .replace(/\b\w/g, (c) => c.toUpperCase());
              fieldErrors.push(`${label}: ${err}`);
            }
          }
        } else if (typeof errors === 'object' && errors !== null) {
          // Nested errors (e.g., for nested serializers)
          for (const [, nestedErrors] of Object.entries(errors as Record<string, unknown>)) {
            if (Array.isArray(nestedErrors)) {
              for (const err of nestedErrors) {
                if (typeof err === 'string') {
                  fieldErrors.push(err);
                }
              }
            }
          }
        }
      }

      if (fieldErrors.length > 0) {
        messages.push(...fieldErrors);
        return messages;
      }
    }

    // Fallback based on HTTP status
    switch (error.status) {
      case 400:
        messages.push('The request was invalid. Please check your input and try again.');
        break;
      case 401:
        messages.push('Your session has expired. Please sign in again.');
        break;
      case 403:
        messages.push('You do not have permission to perform this action.');
        break;
      case 404:
        messages.push('The requested resource was not found.');
        break;
      case 409:
        messages.push('A conflict occurred. The resource may already exist.');
        break;
      case 429:
        messages.push('Too many requests. Please wait a moment and try again.');
        break;
      case 500:
        messages.push('A server error occurred. Please try again later.');
        break;
      case 502:
      case 503:
        messages.push('The server is temporarily unavailable. Please try again later.');
        break;
      default:
        messages.push(`An unexpected error occurred (status ${error.status}).`);
        break;
    }

    return messages;
  }

  // Standard Error object
  if (error instanceof Error) {
    messages.push(error.message || 'An unexpected error occurred.');
    return messages;
  }

  // Fallback
  messages.push('An unexpected error occurred.');
  return messages;
}
