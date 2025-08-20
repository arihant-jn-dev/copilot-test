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
