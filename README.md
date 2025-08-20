# Trello-Style Todo App

A kanban-style Todo application built with HTML, CSS, and JavaScript. Features include drag-and-drop task management, task creation, editing, and deletion, all with smooth animations and a responsive design inspired by Trello.

![Trello-Style Todo App](https://github.com/arihant-jn-dev/copilot-test/raw/master/preview.png)

## Features

- **Kanban Board Layout**: Three columns for "To Do", "In Progress", and "Done"
- **Drag and Drop**: Move tasks between columns with intuitive drag-and-drop functionality
- **Task Management**: Add, edit, and delete tasks easily
- **Persistent Storage**: Data saved in localStorage to persist across sessions
- **Responsive Design**: Works on desktop and mobile devices
- **Visual Enhancements**: Smooth animations and color-coded labels

## Usage

1. **Add Tasks**: Click the "+" button at the top of any column
2. **Move Tasks**: Drag any task card and drop it in another column
3. **Edit Tasks**: Click the edit (pencil) icon on a task
4. **Delete Tasks**: Click the delete (trash) icon on a task

## Technology Stack

- HTML5
- CSS3 (with animations and flexbox layout)
- Vanilla JavaScript (ES6+)
- LocalStorage for data persistence

## Deployment Guide

This app is deployed using GitHub Pages with a custom domain. Follow these steps to deploy or update the deployment:

### 1. GitHub Pages Setup

1. Push your code to the master branch of your GitHub repository
2. Create and push a gh-pages branch:
```bash
git checkout -b gh-pages
git push origin gh-pages
```
3. Go to your repository on GitHub.com
4. Click on "Settings" (top right)
5. In the left sidebar, click on "Pages"
6. Under "Source", select "Deploy from a branch" 
7. Under "Branch", select "gh-pages" and "/(root)" folder
8. Click "Save"
9. Wait for the deployment to complete (may take a few minutes)
10. You'll see a message "Your site is published at https://username.github.io/repo-name/"

### 2. Custom Domain Setup

#### For Root Domain (sumantpro.in)

1. Create a CNAME file in your repository with content:
```
sumantpro.in
```

2. Add these DNS records in your domain provider (GoDaddy):
   - A Records (point @ to GitHub's servers):
     ```
     @ 185.199.108.153
     @ 185.199.109.153
     @ 185.199.110.153
     @ 185.199.111.153
     ```
   - CNAME Record:
     ```
     www -> arihant-jn-dev.github.io.
     ```

#### For Subdomain (todo.sumantpro.in)

1. Update the CNAME file in your repository with content:
```
todo.sumantpro.in
```

2. Add this DNS record in your domain provider (GoDaddy):
   - CNAME Record:
     ```
     todo -> arihant-jn-dev.github.io.
     ```

3. Configure GitHub Pages to use your subdomain:
   - Go to your GitHub repository > Settings > Pages
   - Under "Custom domain", enter `todo.sumantpro.in` 
   - Click "Save"
   - Initially leave the "Enforce HTTPS" checkbox unchecked
   - GitHub will verify your DNS settings (this can take a few minutes)
   - Once verified, your site will be available at http://todo.sumantpro.in

### 3. Update Deployment

When making changes to your app:

1. Commit and push changes to the master branch:
```bash
git add .
git commit -m "Your commit message"
git push origin master
```

2. Update the gh-pages branch:
```bash
git checkout gh-pages
git cherry-pick master
git push origin gh-pages
git checkout master
```

### 4. Enable HTTPS and Verify Deployment

1. Wait for DNS propagation (may take up to 48 hours)
2. First, access your site using HTTP: http://todo.sumantpro.in
3. After confirming the site works over HTTP, enable HTTPS:
   - Go to GitHub repository > Settings > Pages
   - Find your custom domain section
   - Check the "Enforce HTTPS" checkbox
   - If the checkbox is grayed out, it means GitHub is still provisioning your certificate
   - Wait 24 hours and try again
4. Once "Enforce HTTPS" is enabled, access your site using HTTPS: https://todo.sumantpro.in
5. If you get an "ERR_CERT_COMMON_NAME_INVALID" error:
   - First, make sure your DNS settings are correct
   - Wait another 24 hours for GitHub to provision the SSL certificate
   - Temporarily disable the "Enforce HTTPS" option in GitHub Pages settings
   - Visit the site using HTTP first (http://todo.sumantpro.in)
   - After GitHub provisions the certificate, re-enable "Enforce HTTPS"
   - Clear your browser cache and try again
6. Verify that everything works as expected

## Troubleshooting

### Certificate Issues (ERR_CERT_COMMON_NAME_INVALID)

If you see certificate errors when accessing your custom domain:

1. **Verify DNS Configuration**:
   - For subdomain (todo.sumantpro.in): Ensure you have the correct CNAME record pointing to `arihant-jn-dev.github.io.` (with trailing dot)
   - Double-check there are no conflicting DNS records
   - Verify DNS propagation using `dig todo.sumantpro.in CNAME` or online DNS lookup tools

2. **GitHub Pages Certificate Process**:
   - GitHub needs up to 24 hours to issue a certificate after DNS propagation
   - During this time, use HTTP instead of HTTPS to access your site
   - Check if your site appears in the list at Settings > Pages

3. **Step-by-step GitHub Pages HTTPS Fix**:
   - Go to your repository on GitHub.com
   - Click "Settings" > "Pages" in the left sidebar
   - Under "Custom domain", verify that your domain is correctly entered
   - Uncheck "Enforce HTTPS" if it's currently checked
   - Save the settings
   - Wait a few minutes, then reload the page
   - If "Enforce HTTPS" is available (not grayed out), check it
   - If it remains grayed out, wait 24 hours and try again

4. **Clear Browser Cache**:
   - Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
   - Try in private/incognito mode or a different browser
   - Clear your SSL state in browser settings

5. **Verify CNAME File**:
   - Make sure your CNAME file contains exactly `todo.sumantpro.in` with no extra spaces or characters
   - Ensure the CNAME file is present in both master and gh-pages branches

### DNS Propagation Issues

If your site isn't accessible at all:
- DNS changes can take up to 48 hours to fully propagate
- Use DNS lookup tools (like `dig` or [whatsmydns.net](https://www.whatsmydns.net/)) to check propagation status
- Temporarily access via the default URL: `https://arihant-jn-dev.github.io/copilot-test/`

## Alternative Deployment Options

While GitHub Pages is a great free option for static sites, there are several other deployment platforms that might better suit your needs:

### 1. Netlify

**Benefits**: 
- Free tier with generous limits
- Automatic deploys from Git
- Custom domains with free SSL certificates (fast provisioning)
- Serverless functions
- Form handling
- Deploy previews for pull requests

**Detailed Steps**:
1. Create an account at [netlify.com](https://www.netlify.com/)
2. Click "Add new site" > "Import an existing project"
3. Connect to GitHub and select your repository
4. Configure build settings:
   - Build command: (leave blank for this static site)
   - Publish directory: `.` (root directory)
5. Click "Deploy site"
6. Once deployed, go to "Site settings" > "Domain management" > "Add custom domain"
7. Enter your domain (todo.sumantpro.in)
8. Update DNS settings as instructed by Netlify:
   - Add a CNAME record: `todo` pointing to `[your-site-name].netlify.app`
9. Wait for DNS propagation and SSL certificate issuance (usually minutes, not days)
10. Manage deployments from the "Deploys" tab

**Advantages over GitHub Pages**:
- Much faster SSL certificate provisioning
- Better build options and site management
- More reliable deployment pipeline

### 2. Vercel

**Benefits**:
- Free tier designed for frontend projects
- Global CDN for fast delivery
- Automatic preview deployments
- Superior analytics dashboard
- Serverless functions
- Edge functions for dynamic content

**Detailed Steps**:
1. Create an account at [vercel.com](https://vercel.com/)
2. Click "Add New..." > "Project"
3. Connect to GitHub and select your repository
4. Configure project:
   - Framework Preset: Other
   - Root Directory: ./
   - Build Command: (leave blank)
   - Output Directory: ./
5. Click "Deploy"
6. Once deployed, click "Settings" > "Domains"
7. Add your custom domain (todo.sumantpro.in)
8. Update DNS with:
   - A CNAME record: `todo` pointing to `cname.vercel-dns.com`
9. SSL is provisioned automatically (typically within minutes)
10. Monitor performance in the Analytics dashboard

**Advantages over GitHub Pages**:
- Better performance metrics
- Advanced deployment options
- Faster global CDN

### 3. Firebase Hosting

**Benefits**:
- Free tier with Google infrastructure
- Fast global CDN
- Easy integration with other Firebase services (Auth, Database)
- Automatic SSL
- Multiple site hosting
- Versioned deployments with rollback

**Detailed Steps**:
1. Create a Firebase account at [firebase.google.com](https://firebase.google.com/)
2. Create a new project
3. Go to Hosting in the Firebase console and click "Get started"
4. Install Firebase CLI: `npm install -g firebase-tools`
5. Open your terminal and navigate to your project directory
6. Log in to Firebase: `firebase login`
7. Initialize your project: `firebase init hosting`
   - Select your Firebase project
   - Configure as a single-page app? No
   - What directory should be the public directory? `.` (or use `public` and move your files there)
   - Configure automatic builds and deploys with GitHub? No (for now)
8. Deploy your site: `firebase deploy --only hosting`
9. In Firebase Console, go to Hosting > Add custom domain
10. Enter your domain and follow the verification steps
11. Add the provided TXT records to your DNS
12. After verification, add the required A or CNAME records
13. Wait for DNS propagation and SSL certification

**Advantages over GitHub Pages**:
- Integration with other Firebase services
- Better deployment management
- Multiple site hosting under one project

### 4. AWS Amplify

**Benefits**:
- Free tier with AWS infrastructure
- CI/CD pipeline built-in
- Atomic deployments
- Password protection option
- Preview deployments
- Integration with other AWS services

**Detailed Steps**:
1. Create an AWS account at [aws.amazon.com](https://aws.amazon.com/)
2. Go to AWS Amplify console
3. Choose "Host a web app"
4. Connect to GitHub and select your repository
5. Configure build settings:
   - App name: todo-app
   - Environment: main
   - Build settings: (leave defaults for static site)
6. Review and click "Save and deploy"
7. Once deployed, click "Domain Management" > "Add domain"
8. Enter your domain and subdomains
9. Add the provided CNAME records to your DNS:
   - CNAME record: `todo` pointing to provided verification name
   - CNAME record: `todo` pointing to the amplifyapp.com domain
10. Verification and SSL issuance happens automatically
11. Monitor builds in the "Hosting environments" section

**Advantages over GitHub Pages**:
- Better build pipeline
- Branch-based deployments
- More control over the deployment process

### 5. Cloudflare Pages

**Benefits**:
- Free tier with generous build minutes
- Global CDN with 200+ edge locations
- Automatic Git integration
- Fast builds and deployments
- Analytics included
- Advanced caching options

**Detailed Steps**:
1. Create a Cloudflare account at [cloudflare.com](https://cloudflare.com/)
2. Go to the Pages section and click "Create a project"
3. Connect your GitHub account and select your repository
4. Configure build settings:
   - Project name: todo-app
   - Production branch: main
   - Build command: (leave blank for static site)
   - Build output directory: ./ (or the directory containing your files)
5. Click "Save and Deploy"
6. Once deployed, go to "Custom domains"
7. Add your custom domain (todo.sumantpro.in)
8. If your domain is on Cloudflare already, it's automatically configured
9. If not, add the provided CNAME record to your DNS
10. SSL is automatically provisioned

**Advantages over GitHub Pages**:
- Much faster global network
- Better caching controls
- Additional security features

### 6. Digital Ocean App Platform

**Benefits**:
- Simple deployment process
- Managed SSL certificates
- Built-in monitoring
- Horizontal scaling options
- Global CDN
- Starts at $5/month for basic static sites

**Detailed Steps**:
1. Create an account at [digitalocean.com](https://www.digitalocean.com/)
2. Go to Apps > Create App
3. Connect to GitHub and select your repository
4. Configure your app:
   - Type: Static Site
   - Source Directory: ./
   - Output Directory: ./
   - HTTP Port: 80
5. Select a plan (Starter at $5/mo or higher)
6. Choose a region close to your users
7. Click "Launch Static Site"
8. Once deployed, go to Settings > Domains
9. Add your custom domain
10. Update your DNS records as instructed:
    - CNAME record: `todo` pointing to your app's domain
11. SSL certificate is automatically provisioned

### 7. Traditional Web Hosting (GoDaddy)

Since you already have a GoDaddy account:

**Detailed Steps**:
1. Log into your GoDaddy account
2. Purchase a hosting plan if you don't have one
3. Go to your hosting control panel
4. Find the File Manager or FTP access
5. Upload all your files (index.html, styles.css, script.js) to the root directory or a subdirectory
6. If using a subdomain:
   - Create a subdomain in your GoDaddy DNS settings
   - Point it to your hosting package
   - Create a subdirectory for your files if needed
7. Configure SSL certificate:
   - Most GoDaddy hosting plans come with SSL
   - In your hosting control panel, find "SSL Certificates"
   - Install or activate the certificate for your domain
8. Test your website at your domain

**When to Choose Traditional Hosting**:
- When you need to host multiple websites
- When you need more control over server configuration
- When you require server-side technologies not available on static hosts

## Local Development

To run this app locally:

1. Clone the repository
2. Navigate to the project directory
3. Start a local server:

Using Python:
```bash
python -m http.server 8000
```

Using Node.js:
```bash
npx http-server
```

4. Open your browser and go to `http://localhost:8000`

## License

[MIT License](LICENSE)

## Author

Arihant J.N.
