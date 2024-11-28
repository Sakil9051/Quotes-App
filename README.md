
# Quotes App

## About the Project
**Quotes App** is a Next.js-based application designed for creating, browsing, and managing inspirational quotes. It features a simple and elegant design with robust functionality to enhance user experience.

### Features:
- **Create Quotes**: Users can add new quotes.
- **View Quotes**: Browse all available quotes.
- **Responsive Design**: Optimized for different devices.
- **Context API**: Handles global state management (e.g., Toast notifications).

This project uses **Next.js 15 (App Router)** and **Tailwind CSS** for styling.

---

## Getting Started

Follow these steps to set up and run the Quotes App on your local machine.

---

### Prerequisites
Ensure you have the following software installed:
- **Node.js** (v18.0.0 or higher)
- **npm** or **yarn** (for dependency management)

---

### Step-by-Step Installation Process

1. **Clone the repository**:
   Download the project files by running:
   ```bash
   git clone https://github.com/Sakil9051/Quotes-App.git
   cd Quotes-App
   ```

2. **Install dependencies**:
   Run the following command in the root directory to install all required libraries:
   ```bash
   npm install
   ```

3. **Start the development server**:
   Start the application in development mode:
   ```bash
   npm run dev
   ```

4. **Access the application**:
   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## Folder Structure
The project is organized as follows:

```plaintext
CRAFTO-ASSIGNMENT
├── app
│   ├── components           # Reusable UI components
│   │   ├── ConfirmationModal.jsx
│   │   ├── FloatingButton.jsx
│   │   ├── Navbar.jsx
│   │   └── QuoteCard.jsx
│   ├── context              # Context API (state management)
│   │   └── ToastContext.jsx
│   ├── create-quote         # Page for creating new quotes
│   │   └── page.jsx
│   ├── quotes               # Page to list all quotes
│   │   └── page.jsx
│   ├── fonts                # Custom fonts (if any)
│   └── page.jsx             # Main page of the app
├── public                   # Static assets
│   └── favicon.ico          # App icon
├── styles
│   └── globals.css          # Global styles
├── .gitignore               # Git ignored files
├── next.config.js           # Next.js configuration
├── package.json             # Dependencies and scripts
├── tailwind.config.js       # Tailwind CSS configuration
└── README.md                # Project documentation
```

---

## Technologies Used
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **State Management**: Context API

---

## Available Scripts
The following scripts are available for use:

- **Run Development Server**:
  ```bash
  npm run dev
  ```
- **Build for Production**:
  ```bash
  npm run build
  ```
- **Start the Production Server**:
  ```bash
  npm start
  ```

## Contact
For questions or feedback, please reach out:
- **Email**: sahillaskar137@gmail.com
- **GitHub**: [YourGitHubProfile](https://github.com/Sakil9051)

---
