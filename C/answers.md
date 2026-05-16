# Task C: Xero API Questions

## C1. How would you prove that our Xero API connection is working before checking invoices?

I would first call `GET https://api.xero.com/connections` with the current OAuth 2.0 access token.

This proves the token is valid and shows which tenants/organisations the user has connected. I would confirm that at least one active connection is returned, store or select the correct `tenantId`, and log the connection details needed for later Accounting API calls.

## C2. If `/connections` works but `GET /Invoices` fails, what would you check?

I would check the following:

- The request includes the correct `Authorization: Bearer <access_token>` header.
- The request uses the correct Accounting API base URL: `https://api.xero.com/api.xro/2.0/Invoices`.
- The correct tenant is being targeted with `xero-tenant-id`, unless using a custom connection where the access token is already tied to one organisation.
- The OAuth scopes include invoice/accounting access, such as `accounting.transactions` or the required invoice-specific scopes.
- The access token has not expired and refresh-token handling is working.
- The connected Xero organisation has invoice access available for its plan and the user has the right permissions.
- The response status and body, especially `401`, `403`, `404`, `429`, or validation errors.
- Rate-limit headers and whether the app is currently being throttled.

## C3. What endpoint would you call to check invoices?

I would call:

```http
GET https://api.xero.com/api.xro/2.0/Invoices
Authorization: Bearer <access_token>
xero-tenant-id: <tenant_id>
Accept: application/json
```

For production syncs, I would normally use pagination and, where appropriate, `If-Modified-Since` to fetch only changed invoices.

## C4. How would you check one specific invoice?

If I have the Xero invoice ID, I would call:

```http
GET https://api.xero.com/api.xro/2.0/Invoices/{InvoiceID}
Authorization: Bearer <access_token>
xero-tenant-id: <tenant_id>
Accept: application/json
```

If I only have an invoice number, I would query the invoices endpoint with a filter, for example:

```http
GET https://api.xero.com/api.xro/2.0/Invoices?where=InvoiceNumber=="INV-001"
```

The backend should URL-encode the `where` value before sending the request.

## C5. If the invoice API returns `429`, how should the backend handle it?

The backend should treat `429 Too Many Requests` as a retryable rate-limit response, not as a permanent invoice failure.

It should read the `Retry-After` response header, wait that many seconds before retrying, and use exponential backoff with jitter for repeated failures. It should also throttle requests per tenant, avoid concurrent retry storms, queue non-urgent invoice sync jobs, and return a friendly pending or retry-later response to the caller.

The backend should monitor Xero rate-limit headers, reduce unnecessary invoice polling with pagination and `If-Modified-Since`, and alert if the integration is repeatedly hitting limits.
