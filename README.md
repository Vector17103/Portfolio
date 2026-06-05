# Achyut's Portfolio Website

A minimalistic, sophisticated personal portfolio website with WordPress integration for easy content management. Built with Next.js and deployed on Firebase Hosting.

## 🎨 Design Features

- **Luxury Color Palette**: #6E6658, #B2B0A1, #F5ECE6, #A9A7A0, #E6DDD7
- **Modern Typography**: Montserrat font family
- **Responsive Design**: Mobile-first approach
- **Smooth Animations**: Elegant transitions and hover effects
- **WordPress Editable**: Full content management through WordPress backend

## 📋 Pages & Features

### Homepage
- Hero section with personal introduction
- About highlights with key information
- Latest blog posts (from WordPress)
- Photo gallery section
- Social media links (LinkedIn, GitHub, Instagram)
- Contact information (Phone, Email)

### Projects Page
- Showcase of personal projects
- Project descriptions and technologies used
- Links to GitHub repositories and live demos
- Filterable and categorized

### Resume Page
- Education details
- Technical skills
- Key projects
- Achievements and certifications
- Downloadable PDF resume

## 🛠️ Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: CSS Modules
- **Icons**: React Icons
- **CMS**: WordPress (Headless)
- **Hosting**: Firebase Hosting
- **API**: WordPress REST API

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ installed
- Firebase CLI installed (`npm install -g firebase-tools`)
- A WordPress site (for content management)

### Step 1: Clone and Install

```bash
# Navigate to the project directory
cd shoaib-portfolio

# Install dependencies
npm install
```

### Step 2: Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_WP_API_URL=https://your-wordpress-site.com/wp-json/wp/v2
```

### Step 3: Development

```bash
# Run development server
npm run dev

# Open http://localhost:3000
```

### Step 4: Build for Production

```bash
# Build and export static site
npm run export

# This creates an 'out' directory with static files
```

## 🔥 Firebase Deployment

### Initial Setup

1. **Install Firebase CLI** (if not already installed):
```bash
npm install -g firebase-tools
```

2. **Login to Firebase**:
```bash
firebase login
```

3. **Initialize Firebase** (if not already done):
```bash
firebase init hosting
```

Select:
- Use existing project or create new one
- Public directory: `out`
- Configure as single-page app: Yes
- Don't overwrite existing files

### Deploy to Firebase

```bash
# Build and deploy in one command
npm run deploy

# Or manually:
npm run export
firebase deploy --only hosting
```

Your site will be live at: `https://your-project-id.web.app`

## 📝 WordPress Setup Guide

### Required WordPress Configuration

#### 1. Install Required Plugins

Install these WordPress plugins for the headless setup:

- **Advanced Custom Fields (ACF)** - for custom project fields
- **WP REST API** - usually built into WordPress 4.7+
- **Custom Post Type UI** - for creating Projects post type

#### 2. Create Custom Post Type: Projects

In WordPress Admin → CPT UI → Add New Post Type:

- **Post Type Slug**: `projects`
- **Plural Label**: Projects
- **Singular Label**: Project
- **Show in REST API**: Yes

#### 3. Add Custom Fields (using ACF)

For Projects post type, create these fields:

- **Field Name**: `project_url`, Type: URL
- **Field Name**: `github_url`, Type: URL
- **Field Name**: `technologies`, Type: Text
- **Field Name**: `thumbnail`, Type: Image

#### 4. Create Custom Endpoint for Personal Info

Add this to your theme's `functions.php`:

```php
// Register custom REST API endpoint for personal information
add_action('rest_api_init', function () {
    register_rest_route('wp/v2', '/personal-info', array(
        'methods' => 'GET',
        'callback' => 'get_personal_info',
    ));
});

function get_personal_info() {
    return array(
        'phone' => get_option('personal_phone', '+1 (123) 456-7890'),
        'email' => get_option('personal_email', 'your.email@example.com'),
        'linkedin' => get_option('personal_linkedin', 'https://linkedin.com/in/yourprofile'),
        'github' => get_option('personal_github', 'https://github.com/yourusername'),
        'instagram' => get_option('personal_instagram', 'https://instagram.com/yourprofile'),
        'resume_url' => get_option('personal_resume_url', '/resume.pdf'),
        'bio' => get_option('personal_bio', 'Your bio here'),
        'profile_image' => get_option('personal_profile_image', '/profile.jpg'),
    );
}
```

#### 5. Enable CORS (if needed)

Add to `functions.php`:

```php
function add_cors_headers() {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
}
add_action('init', 'add_cors_headers');
```

### Using WordPress Admin

#### Adding Blog Posts
1. Go to Posts → Add New
2. Write your blog post with title and content
3. Add featured image (optional)
4. Publish

#### Adding Projects
1. Go to Projects → Add New
2. Enter project title and description
3. Fill in custom fields:
   - Project URL (if live demo exists)
   - GitHub URL
   - Technologies (comma-separated)
   - Thumbnail image
4. Publish

#### Updating Personal Information
Add this plugin or manually set options in database:

```php
// Add settings page for personal info
function personal_info_settings_page() {
    add_options_page(
        'Personal Information',
        'Personal Info',
        'manage_options',
        'personal-info',
        'personal_info_settings_html'
    );
}
add_action('admin_menu', 'personal_info_settings_page');

function personal_info_settings_html() {
    // Settings form HTML here
}
```

## 🎯 Customization Guide

### Changing Colors

Edit `styles/globals.css`:

```css
:root {
  --color-primary: #6E6658;
  --color-secondary: #B2B0A1;
  --color-background: #F5ECE6;
  --color-accent: #A9A7A0;
  --color-light: #E6DDD7;
}
```

### Updating Personal Information

While WordPress is being set up, edit `lib/wordpress.ts`:

```typescript
export const getMockPersonalInfo = (): PersonalInfo => ({
  phone: 'YOUR_PHONE',
  email: 'YOUR_EMAIL',
  linkedin: 'YOUR_LINKEDIN',
  github: 'YOUR_GITHUB',
  instagram: 'YOUR_INSTAGRAM',
  resume_url: '/resume.pdf',
  bio: 'YOUR_BIO',
  profile_image: '/profile.jpg',
});
```

### Adding Real Images

1. Place images in `public/` directory
2. Reference them as `/image-name.jpg` in your code
3. For profile photo: save as `public/profile.jpg`
4. For resume: save as `public/resume.pdf`

### Connecting to Real WordPress

Once WordPress is set up, update `.env.local`:

```env
NEXT_PUBLIC_WP_API_URL=https://your-actual-wordpress-site.com/wp-json/wp/v2
```

Then in `pages/index.tsx`, `pages/projects.tsx`, etc., replace:
- `getMockBlogPosts()` with `getBlogPosts()`
- `getMockProjects()` with `getProjects()`
- `getMockPersonalInfo()` with `getPersonalInfo()`

## 📱 Adding Custom Fonts

The site uses Montserrat from Google Fonts, but you can use custom fonts:

1. Place font files in `public/fonts/`
2. Add font-face in `styles/globals.css`:

```css
@font-face {
  font-family: 'YourFont';
  src: url('/fonts/yourfont.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
}
```

## 🔍 SEO Optimization

The site includes basic SEO with Next.js Head component. Enhance by:

1. Adding `next-sitemap` package for automatic sitemap generation
2. Creating `robots.txt` in public folder
3. Adding Open Graph meta tags
4. Using structured data (JSON-LD)

## 📊 Analytics Integration

Add Google Analytics by installing `react-ga4`:

```bash
npm install react-ga4
```

Initialize in `pages/_app.tsx`.

## 🚀 Performance Tips

- Images are optimized through Next.js Image component
- Static generation for fast loading
- Lazy loading for blog posts
- CSS modules for scoped styling
- Minimal JavaScript bundle

## 🐛 Troubleshooting

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next out node_modules
npm install
npm run export
```

### Firebase Deployment Issues
```bash
# Re-initialize Firebase
firebase init hosting

# Deploy with debug
firebase deploy --only hosting --debug
```

### WordPress Connection Issues
- Check CORS settings
- Verify API URL in `.env.local`
- Test endpoints manually: `https://your-wp-site.com/wp-json/wp/v2/posts`

## 📄 License

Personal portfolio project - feel free to use as inspiration!

## 🤝 Support

For questions or issues:
- Email: your.email@example.com
- GitHub: [@yourusername](https://github.com/yourusername)

---

Built with ❤️ by Achyut
