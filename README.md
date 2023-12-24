# Rainbownote - MERN Note App

Welcome to Rainbownote, your go-to MERN (MongoDB, Express, React, Node.js) note-taking app that's not just colorful but feature-rich! With Rainbownote, you can organize your thoughts, ideas, and reminders in a visually appealing and user-friendly environment.

<a href="#">See Live</a>

## Features 🚀

### Account Management
- **Create Account:** Sign up securely with your email and password.
- **GitHub Login:** Conveniently log in using your GitHub credentials.

### Note Management
- **Favorite Notes:** Mark your most important notes as favorites for quick access.
- **Trash Bin:** Move notes to the trash for temporary storage before permanent deletion.
- **Restore from Trash:** Easily retrieve notes from the trash if needed.

### Sharing and Publishing
- **Publish Notes:** Share your thoughts with the world by publishing notes publicly.
- **TinyMCE Editor:** Utilize the powerful TinyMCE editor for a rich text editing experience.

### Visual Customization
- **Note Cover & Icon:** Personalize your notes with custom covers and icons.

## Technologies Used 🛠️

- **Vite React:** Lightning-fast React development with Vite.
- **Appwrite:** Open-source backend server for easy user authentication and data management.
- **React-Hook-Form:** Simplify form management in React with hooks.
- **React-Query:** Effortlessly manage and synchronize state with server data.
- **Tailwind CSS:** A utility-first CSS framework for building stylish and responsive user interfaces.

## Getting Started 🌈

1. Clone the repository: `git clone https://github.com/yourusername/rainbownote.git`
2. Install dependencies: `npm install`
3. Configure Appwrite: Set up your Appwrite backend and update the configuration.
4. Start the app: `npm run dev`

```.env
VITE_APPWRITE_URL=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=
VITE_APPWRITE_DATABASE_ID=
VITE_APPWRITE_STORAGE_ID=
VITE_APPWRITE_USER_COLLECTION_ID=
VITE_APPWRITE_NOTE_COLLECTION_ID=
VITE_MCE_EDITOR_API_KEY=
VITE_GITHUB_AUTH_SUCCESS_CALLBACK=http://localhost:5173/sign-in?authstatus=success
VITE_GITHUB_AUTH_FAILURE_CALLBACK=http://localhost:5173/sign-in?authstatus=fail
```

## Contributions 🤝

Contributions are welcome! Feel free to fork the repository, open issues, and submit pull requests to enhance Rainbownote further.

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Happy note-taking with Rainbownote! 🌈📝