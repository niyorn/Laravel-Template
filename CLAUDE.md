# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Important: Command Execution

**All npm, composer, and artisan commands must be prefixed with `sail` when using Laravel Sail.**

Examples:
- `sail npm run dev` (not `npm run dev`)
- `sail composer install` (not `composer install`)
- `sail artisan migrate` (not `php artisan migrate`)

## Development Commands

### Starting the Development Environment
```bash
# Start Docker containers (Laravel Sail)
./vendor/bin/sail up -d

# Run database migrations
sail artisan migrate

# Install dependencies and start frontend dev server
sail npm install
sail npm run dev
```

### Common Development Commands
```bash
# Run tests
sail test
# or for specific test
sail test --filter TestName

# Format PHP code
sail php ./vendor/bin/pint

# Build frontend for production
sail npm run build

# Clear all Laravel caches
sail artisan optimize:clear

# Interactive PHP REPL
sail artisan tinker
```

## Architecture Overview

This is a Laravel 11 application using **Inertia.js** with **Vue 3** for a modern SPA experience without building a separate API.

### Backend Structure
- **Controllers**: Standard MVC pattern with Auth controllers from Laravel Breeze
- **Routes**: Web routes only (no API routes) - all handled through Inertia
- **Database**: SQLite by default, MySQL available via Sail
- **Authentication**: Laravel Breeze with full auth scaffolding

### Frontend Structure
- **Pages**: Vue components in `resources/js/Pages/` representing routes
- **Components**: Reusable components with a well-organized generic component system
  - `BaseButton`, `BaseTable`, `Toast` in `resources/js/Components/Generics/`
- **Composables**: State management for Modal and Sidebar using Vue composition API
- **Layouts**: Three main layouts - Authenticated, Guest, and Dashboard
- **Utils**: Custom event bus (`emitter.js`) and fuzzy search implementation

### Key Technologies
- **Inertia.js v2**: Handles routing and data flow between Laravel and Vue with async requests and deferred props
- **Tailwind CSS 4.0**: Recently upgraded utility-first CSS framework
- **DaisyUI v5**: Component library for Tailwind CSS
- **Vite**: Fast build tool with HMR for development
- **Spatie Laravel Data**: DTOs for clean data transfer
- **Ziggy**: Use Laravel named routes in JavaScript

### Testing
Tests use SQLite in-memory database. Full authentication test coverage exists from Breeze scaffolding.

### Important Patterns
1. **No API Controllers**: All data passed through Inertia props
2. **Event Bus**: Custom event system for component communication (`Utils/emitter.js`)
3. **Generic Components**: Base components extend common functionality
4. **Composables**: Shared state management for UI elements

## Folder Structure

```
laravel-template/
├── app/                      # Application core code
│   ├── Http/
│   │   ├── Controllers/      # HTTP controllers
│   │   │   └── Auth/         # Authentication controllers (Breeze)
│   │   ├── Middleware/       # HTTP middleware
│   │   └── Requests/         # Form request validation
│   ├── Models/               # Eloquent models
│   └── Providers/            # Service providers
├── bootstrap/                # Framework bootstrap files
├── config/                   # Configuration files
├── database/
│   ├── factories/            # Model factories
│   ├── migrations/           # Database migrations
│   ├── seeders/              # Database seeders
│   └── database.sqlite       # SQLite database file
├── public/                   # Publicly accessible files
├── resources/
│   ├── js/                   # Vue.js application
│   │   ├── Components/       # Reusable Vue components
│   │   │   └── generics/     # Base components (BaseButton, BaseTable, etc.)
│   │   ├── Composable/       # Vue composables for state management
│   │   ├── Layouts/          # Page layouts (Authenticated, Guest, Dashboard)
│   │   ├── Pages/            # Page components mapped to routes
│   │   │   ├── Auth/         # Authentication pages
│   │   │   ├── Profile/      # User profile pages
│   │   │   └── Home/         # Homepage
│   │   └── Utils/            # Utility functions (emitter, fuzzy search)
│   ├── css/                  # Stylesheets
│   └── views/                # Blade templates (minimal with Inertia)
├── routes/
│   ├── web.php               # Web application routes
│   └── auth.php              # Authentication routes
├── storage/                  # Generated files and logs
├── tests/                    # PHPUnit tests
│   ├── Feature/              # Feature tests
│   └── Unit/                 # Unit tests
├── vendor/                   # Composer dependencies
├── artisan                   # Laravel CLI
├── composer.json             # PHP dependencies
├── package.json              # Node.js dependencies
├── tailwind.config.js        # Tailwind CSS configuration
├── vite.config.js            # Vite bundler configuration
└── docker-compose.yml        # Docker Compose for Laravel Sail
```

### Key Files
- **app.js**: Main Vue application entry point
- **HandleInertiaRequests.php**: Middleware that handles Inertia requests
- **AppServiceProvider.php**: Main service provider for application bootstrapping
- **.env**: Environment configuration (copy from .env.example)