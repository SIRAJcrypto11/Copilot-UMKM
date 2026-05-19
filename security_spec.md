# Security Specification - SNIShop AI Copilot

## Data Invariants
1. A Business must always be associated with a valid `userId` matching the creator's UID.
2. Users can only read and write their own business data.
3. Timestamps `createdAt` and `updatedAt` must be server-generated.
4. Business IDs must be valid alphanumeric strings.

## The Dirty Dozen Payloads
1. Attempt to create a business with someone else's `userId`.
2. Attempt to read a business document owned by another user.
3. Attempt to update the `userId` field of an existing business.
4. Attempt to inject a 2MB metadata string into a product name.
5. Attempt to create a business without the required `products` array.
6. Attempt to update `createdAt` after initial creation.
7. Attempt to delete a business document owned by another user.
8. Attempt to list all businesses (query scraping).
9. Attempt to update a business document with a malicious script in the `name` field.
10. Attempt to bypass `userId` check by providing a null `userId`.
11. Attempt to create a business with a future `createdAt` timestamp.
12. Attempt to update `updatedAt` with a client-side timestamp instead of `request.time`.

## Test Scenarios
- [x] Read: Deny if `resource.data.userId != request.auth.uid`.
- [x] Create: Deny if `request.resource.data.userId != request.auth.uid`.
- [x] Update: Deny if `request.resource.data.userId != resource.data.userId`.
- [x] Delete: Deny if `resource.data.userId != request.auth.uid`.
