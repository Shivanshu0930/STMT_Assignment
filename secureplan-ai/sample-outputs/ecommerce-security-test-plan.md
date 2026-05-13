# Ecommerce Security Test Plan

## Executive Summary

This sample report demonstrates how SecurePlan AI generates an OWASP-aligned security test plan for an ecommerce-style application.

## Priority Areas

- Authentication and session handling.
- Access control for account, cart, and order routes.
- Input validation for search and checkout fields.
- Business logic validation for price, quantity, and discount handling.
- Security headers and browser storage.

## Sample Scenario

### SEC-001 - Verify checkout totals cannot be manipulated

- Category: A04 Insecure Design
- Priority: High
- Expected Result: Server-side validation recalculates order totals and rejects unauthorized client-side changes.

