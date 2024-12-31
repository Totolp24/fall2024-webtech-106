# Digital Publishing Application – ECE Webtech Project 📓

## 🎡 Project Overview
This project demonstrates the knowledge acquired during the semester by developing a digital publishing platform. The application allows users to create, manage, and interact with content through a seamless, user-friendly interface.

---

## 🔹 Prerequisites
- **Node.js** (v16 or later)
- **NPM** (or Yarn)
- **Supabase Account**
- **Vercel Account**

---

## ⚙️ Installation
### 1. Clone the Repository
```bash
git clone https://github.com/your-repository-link.git
cd your-repository-folder
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file

### 4. Start the Development Server
```bash
npm run dev
```

---

## 🏠 Usage
### Deployment
- **Frontend & Backend**: [Vercel Deployment](https://lokegames.vercel.app/)
- **Database**: Supabase instance for storage ([Supabase Project URL](https://supabase.com/dashboard/project/sszbbbhxchixfgfvilcg))

---

## ✨ Features
### 🔒 User Authentication
- Secure OAuth2 login system using GitHub as the provider.

### 🕵️ Navigation
- Intuitive and responsive design linking key pages like Home, About, and Contact.

### 📝 Post Management
- **Create, Edit, and Delete Posts**: Only accessible to the author.
- **Paginated Post List**: Sorted by creation date.
- **Detailed Post View**: Includes post content and user comments.

### 💬 Comment System
- Engage in discussions via a commenting system tied to posts.

### 🔎 Search
- Full-text search powered by Supabase for easy content discovery.

### 🛡️ Resource Access Control
- **Row Level Security** (RLS) implemented to restrict unauthorized access.
- Only authenticated users can create and modify posts.

### 🔧 Account Settings
- Profile customization and modification of personal details.

### 🗒 WYSIWYG Editor
- Rich-text editing enabled for post creation.

### 🌜 Light/Dark Mode
- Persistent theme switching to enhance user experience.

### 🌐 Gravatar Integration
- Display user avatars fetched directly from Gravatar.

---

## 📈 Deliverables
- **Vercel URL**: [Your Application URL](https://lokegames.vercel.app/)
- **Supabase Project URL**: [Your Supabase URL](https://supabase.com/dashboard/project/sszbbbhxchixfgfvilcg)

---

## 👥 Authors
- Xavier HEITZ, Cyb Inter
- Thomas LEPEU, Cyb Inter

---

## 🔢 Evaluation
### Mandatory Tasks
**Naming Convention**
- **Grade**: [1.5]
- **Comments**: [We started by not following those convention but finnally used it for the rest of the project.]
- **Task Feedback**: [Not difficult when we knew which name give]

**Project Structure**
- **Grade**: [2]
- **Comments**: [We created lot of pages with easy names.]
- **Task Feedback**: [We had to be organised but working in team force you to make comprehensive page and work]

**Git Usage**
- **Grade**: [2]
- **Comments**: [We used Git the first day of the project]
- **Task Feedback**: [Essential tool for working with teammates and deploying]

**Code Quality**
- **Grade**: [3.5]
- **Comments**: [All of our codes are well indented and understandable]
- **Task Feedback**: [Organising our codes was easier for us when we had to recode on page we alreday work on the past days]

**Design, UX, and Content**
- **Grade**: [3]
- **Comments**: [We tried to make our website the prettiest possible. Atleast it's functionnal...]
- **Task Feedback**: [Not the easiest part]

**Home Page**
- **Grade**: [1.5]
- **Comments**: [We didn't put a CTA but succesfully made a nice home page inspired by the simple style of APPLE.COM]
- **Task Feedback**: [Not that easy when you're not a Designer]

**Navigation**
- **Grade**: [2]
- **Comments**: [The navigation bar is totaly functionnal and do perfectly it job]
- **Task Feedback**: [Not that easy to make ]

**Login and Profile Page**
- **Grade**: [4]
- **Comments**: [By using the supabase documentation with next.js, the task has been a success]
- **Task Feedback**: [Easy when you use the right documentation]

**Post Creation and Display**
- **Grade**: [4]
- **Comments**: [We created a simple post system where you can post every message you want]
- **Task Feedback**: [This task was kind of hard when we tried to send and receive Supabase request]

**Comment Creation and Display**
- **Grade**: [4]
- **Comments**: [The comment creation work very well]
- **Task Feedback**: [It was hard to make them work with the post we wanted]

**Post Modification and Removal**
- **Grade**: [4]
- **Comments**: [In the page mypost, you can modify every ppost you want]
- **Task Feedback**: [Modify a post can be done easily with request to supabase]

**Search**
- **Grade**: [5]
- **Comments**: [The search bar and the search system works very well but use only the content of the post]
- **Task Feedback**: [Hard to find the right request]

**Use an External API**
- **Grade**: [2]
- **Comments**: [We created a page for every pokemon (1025 pokemon)]
- **Task Feedback**: [Not that hard with the right documentation]

**Resource Access Control**
- **Grade**: [6]
- **Comments**: [We correctly used the RLS system to make all the authors of their post modify them and add a post only if you are authenticated]
- **Task Feedback**: [Hard to find the right way to make everything works]

**Account Settings**
- **Grade**: [3]
- **Comments**: [We succesfully put a modifying Nickname field in the page profile]
- **Task Feedback**: [Optional]

**WYSIWYG Integration**
- **Grade**: [2]
- **Comments**: [This integration make the content always the same]
- **Task Feedback**: [Quite Hard ]

**Gravatar Integration**
- **Grade**: [2]
- **Comments**: [We used the API of gravater to integrate the picture of the user]
- **Task Feedback**: [The documentation make it works easily]

**Light/Dark Mode**
- **Grade**: [2]
- **Comments**: [Dark and light mode works well in the navigation bar]
- **Task Feedback**: [Rebuilding the page was not too hard but took a while]

---

## Miscellaneous
### Course Feedback
- The course provided a comprehensive introduction to web technologies, emphasizing both theory and hands-on practice. While the assignments were engaging and relevant, additional guidance on advanced features, such as API integrations, could enhance the learning experience.

### Project Reuse
- We authorize the professors to use our project as an example for next year’s students.
