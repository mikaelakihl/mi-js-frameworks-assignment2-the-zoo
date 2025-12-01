# The Zoo

This project was developed as a school project at **Medieinstitutet**. A client-side **Zoo Application** built with **React** and **TypeScript**. It allows users to browse a collection of animals, view detailed information, and manage their feeding schedules. State regarding feeding times is persisted to `localStorage`, ensuring that the animals' hunger status survives page reloads. The main focus with this assignment is **state management and routing**.

## 📋 Project overview

The app fetches animal data from an external API and manages their feeding status locally. It consists of:

- **Home/Animals Page** – Overview of all animals with status indicators.
- **Animal Details Page** – Detailed view with feeding controls.

Users can:

- Browse all animals with visual health indicators.
- View detailed descriptions and stats for each animal.
- **Feed animals**: Log feeding times, which resets their hunger status.
- Monitor hunger levels: Visual cues indicate if an animal is satisfied, hungry, or starving.

## ✨ Features

- **API Integration**: Fetches animal data from `https://animals.azurewebsites.net/api/animals`.
- **Local Persistence**: Saves feeding timestamps to `localStorage` (`animals-feeding`).
- **Feeding Logic**:
  - **Satisfied (Mätt)**: Fed within the last 3 hours.
  - **Warning (Snart hungrig)**: 3-4 hours since last feeding.
  - **Hungry (Hungrig)**: More than 4 hours since last feeding (Feeding allowed).
- **Visual Feedback**: Animals glow Green (Satisfied), Yellow (Warning), or Red (Hungry/Overdue) based on their status.
- **Real-time Updates**: Status checks run every minute to update UI without reload.
- **Routing**: Uses React Router for navigation between the grid and detail views.
- **Responsive UI**: Built with TailwindCSS for a mobile-friendly design.

## 🧰 Tech Stack

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/prettier-%23F7B93E.svg?style=for-the-badge&logo=prettier&logoColor=black)


## 🚀 Installation

### Prerequisites

- Node.js 18+
- npm, pnpm, or yarn

### Install dependencies

```bash
npm install
```

### Run the App

```bash
npm run dev
```
