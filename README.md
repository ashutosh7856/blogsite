# BlogSite

A simple yet powerful blogging platform built using **Express.js** and **EJS**. This project allows users to create, edit, delete, and read blog posts. The goal is to enhance the platform with new features like **idea sharing, communication tools**, and more!

---

## 🚀 Features

- **Create, edit, and delete blog posts**  
- **View and read blog posts with a clean UI**  
- **RESTful API structure**  
- **Deployed on DigitalOcean with Nginx and PM2**  
- **Open for community contributions!**  

---

## 🛠️ Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/blogsite.git
cd blogsite
```
### 2️⃣ Install Dependencies

```bash
npm install
```
###v3️⃣ Run the Project Locally
```bash
node index.js
```
### Or using PM2
```bash
pm2 start index.js --name blogsite
```
### 4️⃣ Visit in Browser
Open http://localhost:3000 in your browser.
---
### 🔄 Updating Your Live Website from GitHub
If you have already deployed the project and made changes on GitHub, update your server by running
```bash
git pull origin main
pm2 restart blogsite
```
If using DigitalOcean with Nginx, make sure your server is restarted
```bash
systemctl restart nginx
```
---

### 🌟 Contribute & Improve
We are constantly improving this project! If you have new feature ideas or want to contribute, feel free to fork the repository and submit a pull request.

- **🆕 Planned Features**
Share ideas with other users

Communicate & collaborate

More customization options

Got more ideas? Let's discuss! You can reach me at ashu@ashudev.live.

---

### 📄 License
This project is open-source. Feel free to use and modify it under your own terms.

