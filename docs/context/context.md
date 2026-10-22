# Clothset — Product Context

## Product Overview

Clothset is a digital wardrobe management application that helps users organize their clothes, accessories, and other wearable items into separate wardrobes. Users can manage their personal collections, track their items, and organize their clothing based on their needs.

The application will use subscription plans to determine how many wardrobes a user can create or access and how many items each wardrobe can contain.

## MVP Scope

### 1. Authentication and Accounts

- Allow users to create an account, log in, and log out.
- Maintain authenticated sessions securely.
- Associate each user's wardrobes and clothing items with their account.
- Ensure users can only access and manage their own data.

### 2. Wardrobe Management

- Allow users to create and manage wardrobes or drawers.
- Allow users to choose which wardrobe they want to manage.
- Enforce wardrobe limits based on the user's subscription plan.
- Keep each wardrobe's clothing collection separate from other wardrobes.

### 3. Clothing and Item Management

- Allow users to add, view, update, and remove items within a selected wardrobe.
- Support item categories such as clothing, accessories, and other wearable items.
- Filter items by category within the selected wardrobe.
- Track the number of items in each wardrobe.
- Enforce each wardrobe's capacity when adding items.
- Prevent users from exceeding their plan's wardrobe and item limits.

### 4. Subscription and Usage Limits

- Define subscription plans with configurable limits.
- Enforce the maximum number of wardrobes available to each user.
- Enforce the maximum number of items allowed in each wardrobe.
- Display current usage and remaining capacity.
- Provide clear feedback when a user reaches a limit.

For the MVP, subscription limits should be enforced by the backend. Payment processing and automated subscription billing can be implemented separately if they are not required for the initial release.

## Future Scope: AI-Powered Outfit Assistance

AI features will be developed after the core MVP is functional.

### Standard AI Outfit Assistance

Help users choose outfits based on occasions, events, weather, activities, and personal preferences, using the items available in their wardrobes.

### Premium Conversational AI

Provide premium subscribers with an interactive AI assistant that can discuss their plans, ask relevant questions, and recommend outfits based on their circumstances and wardrobe collection.

AI must use the user's available wardrobe items when making recommendations. It should not recommend items the user does not own unless explicitly asked for shopping suggestions.

## Product Priorities

1. Authentication and account security.
2. Wardrobe creation, selection, and organization.
3. Clothing CRUD and category filtering.
4. Wardrobe capacity and subscription-limit enforcement.
5. Reliable data isolation between users and wardrobes.
6. A simple, responsive, and intuitive user interface.
7. AI-powered outfit assistance after the MVP is stable.

## Out of Scope for the Initial MVP

- Conversational AI and AI-generated outfit recommendations.
- Advanced outfit planning and automated styling.
- AI-based clothing recognition or image analysis.
- Payment processing and automated billing, unless required for launch.
- Social features, sharing, and community functionality.
- Other advanced features that do not support the core wardrobe-management workflow.
