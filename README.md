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
3. Go to repository Settings > Pages
4. Set Source to "Deploy from a branch" and select "gh-pages" branch
5. Click Save

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

3. Update GitHub Pages settings with the custom domain (todo.sumantpro.in)

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

### 4. Verify Deployment and Fix Certificate Issues

1. Wait for DNS propagation (may take up to 48 hours)
2. Check if HTTPS is enabled in GitHub Pages settings
3. Visit your site at the custom domain (todo.sumantpro.in)
4. If you get an "ERR_CERT_COMMON_NAME_INVALID" error:
   - First, make sure your DNS settings are correct
   - Wait 24 hours for GitHub to provision the SSL certificate (this takes time!)
   - Temporarily disable the "Enforce HTTPS" option in GitHub Pages settings
   - Visit the site using HTTP first (http://todo.sumantpro.in)
   - After GitHub provisions the certificate, re-enable "Enforce HTTPS"
   - Clear your browser cache and try again
5. Verify that everything works as expected

## Troubleshooting

### Certificate Issues (ERR_CERT_COMMON_NAME_INVALID)

If you see certificate errors when accessing your custom domain:

1. **Verify DNS Configuration**:
   - For subdomain (todo.sumantpro.in): Ensure you have the correct CNAME record pointing to `arihant-jn-dev.github.io.` (with trailing dot)
   - Double-check there are no conflicting DNS records

2. **Give GitHub Time to Issue Certificate**:
   - GitHub needs up to 24 hours to issue a certificate after DNS propagation
   - During this time, use HTTP instead of HTTPS to access your site

3. **Check GitHub Pages Settings**:
   - Ensure your custom domain is correctly entered in Settings > Pages
   - Try toggling "Enforce HTTPS" off and on after 24 hours

4. **Clear Browser Cache**:
   - Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
   - Try in private/incognito mode or a different browser

5. **Verify CNAME File**:
   - Make sure your CNAME file contains exactly `todo.sumantpro.in` with no extra spaces or characters

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
