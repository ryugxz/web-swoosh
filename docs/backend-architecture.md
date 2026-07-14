# Team Swoosh Backend Architecture

## Overview
This document outlines the backend architecture, Firestore database schema, and Storage rules for Team Swoosh. We are using Firebase as our backend service, structured with a robust Repository Pattern.

## 1. Repository Pattern Architecture

We separate Firebase logic from UI components via a multi-tiered architecture:

* **React Components**: Consume Service Layer. No direct Firebase imports.
* **Service Layer (`src/services/`)**: Domain-specific logic. Each service (e.g., `UserService`) extends the `BaseRepository`.
* **Repository Layer (`src/services/baseRepository.js`)**: Generic wrapper around Firestore SDK (create, getById, update, delete).
* **Firebase SDK Layer (`src/firebase/config.js`)**: Initialization and configuration.

## 2. Firestore Schema Design

### `users`
* `id`: string
* `email`: string
* `displayName`: string
* `role`: 'admin' | 'member' | 'guest'
* `status`: 'active' | 'suspended'
* `createdAt`, `updatedAt`: Timestamp

### `players`
* `id`: string
* `name`: string
* `number`: number
* `position`: 'GK' | 'DEF' | 'MID' | 'FWD'
* `status`: 'official' | 'spare'
* `photoURL`: string
* `stats`: map (goals, assists)
* `createdAt`, `updatedAt`: Timestamp

### `products`
* `id`: string
* `name`: string
* `description`: string
* `price`: number
* `category`: 'jersey' | 'equipment' | 'accessory' | 'ticket'
* `images`: array of string (URLs)
* `stock`: number | map
* `createdAt`, `updatedAt`: Timestamp

### `orders`
* `id`: string
* `userId`: string (reference to users.id)
* `items`: array of map
* `totalAmount`: number
* `status`: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'
* `paymentSlipUrl`: string
* `createdAt`, `updatedAt`: Timestamp

### `registrations`
* `id`: string
* `userId`: string
* `season`: string
* `status`: 'pending' | 'approved' | 'rejected'
* `paymentSlipUrl`: string
* `createdAt`, `updatedAt`: Timestamp

### `matches`
* `id`: string
* `opponent`: string
* `date`: Timestamp
* `location`: string
* `result`: map (ourScore, opponentScore)
* `status`: 'scheduled' | 'completed' | 'cancelled'
* `createdAt`: Timestamp

### `league`
* `id`: string
* `name`: string
* `season`: string
* `standings`: array of map
* `status`: 'upcoming' | 'ongoing' | 'completed'
* `createdAt`: Timestamp

### `notifications`
* `id`: string
* `userId`: string
* `title`: string
* `message`: string
* `read`: boolean
* `createdAt`: Timestamp

## 3. Storage Structure

* `avatars/` - User profile pictures.
* `players/` - Player headshots/action shots.
* `products/` - Store items.
* `jerseys/` - Jersey mockups and designs.
* `payment-slips/` - Private uploads for order/registration proof.
* `matches/` - Match highlights/photos.
* `league/` - League-related files.
* `misc/` - Other assets.

## 4. Security Rules Highlights
* **Firestore**: Only Admins can write to global collections (players, products, matches, league). Users can write to their own profile, orders, and registrations.
* **Storage**: `payment-slips` are private. `avatars` can be written by users themselves. Public directories are read-only for guests/members and writable by Admins.
