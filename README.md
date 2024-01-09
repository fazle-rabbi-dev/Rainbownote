# Rainbownote

<img width="100%" src="/public/rainbownote_cover.jpg" alt="Rainbownote - Thumbnail" />

A vibrant MERN note app with GitHub login, trash management, and public note sharing. Personalize notes with covers, icons, and enjoy the sleek TinyMCE editor. Powered by Vite React, Appwrite, React-Hook-Form, React-Query, and Tailwind CSS.

## 🔴 Unveiling the Journey of Building Rainbownote
> [!Note]
> I created this note app to practice Appwrite and enhance my React-Query skills. Building this app supercharged my React-Query and Appwrite proficiency. I implemented various features, drawing inspiration from other note-taking apps. I thoroughly enjoyed this project-building journey.

### Project Created at
- 🗓 *Dec 2023*

### Technologies Used ⚒️
- Vite + React
- TailwindCSS
- React-Query
- React-Hook-Form
- Appwrite (for Authentication & Storage)

### Features
- 🔐 Authentication with appwrite
- 🌐 OAuth Provider (Social login with GitHub)
- ✅ Share note with public by publishing
- 📝 CRUD operation with note
- ❤️ Mark note as favourite
- 🗑️ Move note to trash
- ↩️ Restore from Trash
- 🔥 Rich text editor (TinyMCE)
- 🔍 Search functionality
- ⚙️ Logout functionality
- 🖼️ Icon & cover adding functionality

### Live Demo 🎉
Explore the live version of Rainbownote [here](https://rainbownote.vercel.app).

## Getting Started 🚀

1. Clone the repository: `git clone https://github.com/yourusername/rainbownote.git`
2. Install dependencies: `npm install`
3. Configure Appwrite: Set up your Appwrite backend and update the configuration.
4. Start the app: `npm run dev`
5. Setup **.env**
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
VITE_APP_DOMAIN=https://rainbownote.vercel.app
```

### Contributions 🤝

Contributions are welcome! Feel free to fork the repository, open issues, and submit pull requests to enhance Rainbownote further.


*Happy note-taking with Rainbownote! 🎈*

### 📬 Connect with me
> Let's connect! Reach out for collaborations, projects, or just a friendly chat.

<a target="_blank" href="https://linkedin.com/in/fazlerabbidev" target="blank"><img align="center" src="https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/linkedin.svg" alt="Fazle Rabbi" height="30" width="auto" /></a>
<a target="_blank" href="https://twitter.com/fazle_rabbi_dev" target="blank"><img align="center" src="https://seeklogo.com/images/T/twitter-x-logo-101C7D2420-seeklogo.com.png?v=638258862800000000" alt="Fazle Rabbi" height="30" width="auto" /></a>
<a target="_blank" href="https://medium.com/@fazle-rabbi-dev" target="blank"><img align="center" src="https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/medium.svg" alt="Fazle Rabbi" height="30" width="auto" /></a>
<a target="_blank" href="https://dev.to/fazle-rabbi-dev" target="blank"><img align="center" src="https://seeklogo.com/images/D/dev-to-logo-BDC0EFA32F-seeklogo.com.png" alt="Fazle Rabbi" height="30" width="auto" /></a>
<a target="_blank" href="https://facebook.com/fazlerabbidev" target="blank"><img align="center" src="https://seeklogo.com/images/F/facebook-icon-black-logo-133935095E-seeklogo.com.png" alt="Fazle Rabbi" height="30" width="auto" /></a>
<a target="_blank" href="https://instagram.com/fazle_rabbi_dev" target="blank"><img align="center" src="https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/instagram.svg" alt="Fazle Rabbi" height="30" width="auto" /></a>
