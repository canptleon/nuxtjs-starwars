# Nuxt Starwars

## Project Overview

This project is a Star Wars-themed web application built with Nuxt.js, focusing on server-side rendering (SSR), dynamic routing, and API integration with the Star Wars API (SWAPI). It features different sections including **People**, **Planets**, **Species**, **Starships**, **Vehicles**, and **Films**. Each section provides a list of items with pagination, and users can view detailed information about each item on dedicated detail pages.

## Live Demo

Check out the live demo of the project here:

**LIVE DEMO**: [https://nuxtjs-starwars.vercel.app/](https://nuxtjs-starwars.vercel.app/)

## Project Features

- **Server-Side Rendering (SSR)**: Data is fetched on the server side using Nuxt’s `useAsyncData` for improved SEO and faster performance.
- **Entity Listings**: Displays lists of entities from the Star Wars universe, including:
  - **People**
  - **Planets**
  - **Species**
  - **Starships**
  - **Vehicles**
  - **Films**
- **Pagination**: 10 entities are displayed per page, allowing users to navigate through the entire collection.
- **Detailed Pages**: Each entity has a dedicated page displaying detailed information fetched from the SWAPI.
- **Dynamic Routing**: Uses Nuxt.js's dynamic routing system to handle navigation between listing and detail pages.
- **Loading States**: Shows loading indicators while fetching data from the API to ensure a smooth user experience.
- **Responsive Design**: The app is fully responsive and works seamlessly on mobile and desktop devices.

## Technology Stack

- **Framework**: Nuxt.js (leveraging SSR and static site generation)
- **Languages**: JavaScript, TypeScript
- **Styling**: Tailwind CSS for responsive and utility-first design
- **Data Fetching**: Star Wars API (SWAPI) using `fetch` in combination with Nuxt's `useAsyncData`
- **Routing**: Nuxt.js dynamic routing system for entity listing and detail pages
- **State Management**: Vue.js's reactivity system (`ref`, `computed`)

## Key Components

### 1. Entity Listing Pages

- **Data Fetching**: Fetches data from the SWAPI to display lists of people, planets, species, starships, vehicles, and films.
- **Pagination**: Allows users to browse through large data sets by displaying 10 items per page.
- **URL-based State**: Pagination is reflected in the URL, making it easy to navigate and share links.
  
### 2. Entity Detail Pages

- **Detailed Information**: Displays attributes such as name, height, mass, birth year (for people), or model, manufacturer, cost (for starships and vehicles).
- **Dynamic Content**: Uses Nuxt's dynamic routing to load detailed information based on the entity type and ID.

### Example Entities:

- **People**: Displays a list of Star Wars characters with information like name, height, mass, etc.
- **Starships**: Lists Star Wars starships with details like model, manufacturer, crew size, and length.
- **Planets**: Showcases planets with data such as diameter, climate, and population.
- **Species, Vehicles, and Films**: Similar pages exist for other categories, with detailed information on each entity.


