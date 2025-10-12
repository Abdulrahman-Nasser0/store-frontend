

# Collaboration Guide

```bash
# Clone the repository
git clone https://github.com/Abdulrahman-Nasser0/store-frontend.git

# Navigate to the project directory
cd store-frontend

# Verify the clone was successful
git remote -v
```

### Step 2: Set Up Development Environment

```bash
# Install dependencies (choose one package manager)

pnpm install

# Copy environment variables (if needed)
cp .env.example .env.local

# Start the development server

pnpm dev

# Open http://localhost:3000 in your browser
```

### Step 3: Create a Feature Branch

**Always create a new branch for your changes. Never work directly on `main`.**

```bash
# Fetch the latest changes from main
git fetch origin
git checkout main
git pull origin main

# Create and switch to a new branch
# Use a descriptive name: feature/add-user-auth, bugfix/fix-login-error, etc.
git checkout -b feature/your-feature-name

# Verify you're on the new branch
git branch
```

### Step 4: Make Your Changes

```bash
# Make your code changes using your preferred editor
code .

# Test your changes
npm run dev

# Run any available tests
npm run test
# or
npm run build  # to check for build errors
```

### Step 5: Commit Your Changes

```bash
# Check what files you've changed
git status

# Stage your changes
git add .

# Or stage specific files
git add path/to/file.js

# Commit with a descriptive message
git commit -m "feat: add user authentication feature

- Add login form component
- Implement authentication API calls
- Add session management
- Update user profile page"

# Follow conventional commit format:
# feat: new feature
# fix: bug fix
# docs: documentation
# style: formatting
# refactor: code restructuring
# test: adding tests
# chore: maintenance
```

### Step 6: Push Your Branch

```bash
# Push your branch to GitHub
git push origin feature/your-feature-name

# If this is your first push of the branch, you might need:
git push -u origin feature/your-feature-name
```

### Step 7: Create a Pull Request

1. Go to the repository on GitHub
2. Click the **"Compare & pull request"** button that appears after pushing
3. **Fill out the pull request template:**
   - **Title**: Brief description of your changes
   - **Description**: Detailed explanation of what you changed and why
   - **Link issues**: Reference any related issues
4. Click **"Create pull request"**

### Step 8: Code Review Process

- Wait for maintainers to review your PR
- Address any feedback or requested changes
- Once approved, a maintainer will merge your PR
- You can then delete your branch locally and on GitHub

### Additional Git Commands

```bash
# Switch between branches
git checkout branch-name

# See all branches (local and remote)
git branch -a

# Delete a local branch (after PR is merged)
git branch -d feature/your-feature-name

# Delete a remote branch
git push origin --delete feature/your-feature-name

# Update your branch with latest main changes
git checkout main
git pull origin main
git checkout feature/your-feature-name
git rebase main

# Undo changes (if needed)
git checkout -- file.js  # Discard changes to a file
git reset HEAD~1        # Undo last commit (keeping changes)
git reset --hard HEAD~1 # Undo last commit (deleting changes)
```

### Branch Naming Convention

Use descriptive, lowercase names with hyphens:
- `feature/add-user-dashboard`
- `bugfix/fix-mobile-layout`
- `docs/update-api-documentation`
- `refactor/cleanup-auth-code`

### Getting Help

If you encounter issues:
1. Check this README first
2. Look at existing issues on GitHub
3. Ask in the project discussions
4. Contact the maintainers

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
