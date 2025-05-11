# Cotype - Typing Practice Application

[https://deaddrunkspirit.github.io/cotype/](https://deaddrunkspirit.github.io/cotype/)

A modern typing practice application built with SolidJS and TailwindCSS. Practice typing with news articles, code snippets, and targeted exercises.

## Features

- 🎯 Multiple typing modes:
  - News mode: Practice with real news articles
  - Code mode: Improve coding speed with code snippets
  - Extra mode: Focus on problematic keys
- 📊 Real-time statistics:
  - Words Per Minute (WPM)
  - Accuracy percentage
  - Time tracking
- 🎨 Modern UI with Tokyo Night theme
- 📝 Support for custom text input
- 🔗 GitHub file import (first 100 lines)
- ⌨️ Special character handling
- 🎯 Error tracking and problematic key analysis

## Prerequisites

- Node.js 18 or higher
- npm 9 or higher

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/cotype.git
cd cotype
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Deployment

The application is automatically deployed to GitHub Pages when changes are pushed to the main branch. The deployment process is handled by GitHub Actions.

## License

This project is licensed under the MIT License with Additional Restrictions. See the [LICENSE](LICENSE) file for details.

Key restrictions:
- Non-commercial use only
- No AI training allowed
- 1 BTC penalty for violations

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Code Quality

This project uses:
- ESLint for code linting
- Prettier for code formatting
- Husky for git hooks
- lint-staged for pre-commit checks
- Vitest for testing

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Acknowledgments

- [SolidJS](https://www.solidjs.com/) - The frontend framework
- [TailwindCSS](https://tailwindcss.com/) - The CSS framework
- [Highlight.js](https://highlightjs.org/) - Code syntax highlighting
- [Tokyo Night Theme](https://github.com/enkia/tokyo-night-vscode-theme) - Color scheme inspiration

```bash
$ npm install # or pnpm install or yarn install
```

### Learn more on the [Solid Website](https://solidjs.com) and come chat with us on our [Discord](https://discord.com/invite/solidjs)

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.<br>
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### `npm run build`

Builds the app for production to the `dist` folder.<br>
It correctly bundles Solid in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## Deployment

Learn more about deploying your application with the [documentations](https://vite.dev/guide/static-deploy.html)
