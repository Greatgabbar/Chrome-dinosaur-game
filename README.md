# Dino Runner - Chrome Dinosaur Game Clone

Dino Runner is a fun and engaging clone of the classic Chrome Dinosaur game. Built with modern web technologies, this game offers a nostalgic experience with additional features like dark mode, responsive design, and customizable themes.

## Features

- **Classic Gameplay**: Jump over obstacles and survive as long as possible.
- **Dark and Light Themes**: Switch seamlessly between themes for a personalized experience.
- **Responsive Design**: Optimized for all devices, including desktops, tablets, and mobile phones.
- **Customizable Game Speed**: Challenge yourself by increasing the game speed.
- **Particle Effects**: Enjoy visually appealing jump and collision animations.

## Getting Started

Follow these steps to run the project locally:

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Greatgabbar/Chrome-dinosaur-game
   cd Chrome-dinosaur-game
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to play the game.

## Project Structure

- **`app/page.tsx`**: Main entry point for the game.
- **`hooks/`**: Custom hooks for managing game state, theme, and controls.
- **`components/`**: Reusable UI components like `GameHeader`, `GameCanvas`, and `GameOverModal`.
- **`public/`**: Static assets like images and icons.
- **`styles/`**: Global and component-specific styles.

## Controls

- **Jump**: Press the `Space` or `Arrow Up` key.
- **Crouch**: Press the `Arrow Down` key.
- **Restart**: Press the `Enter` key after a game over.
- **Toggle Theme**: Press the `T` key to switch between light and dark themes.

## Accessibility

Dino Runner is designed with accessibility in mind:
- Fully keyboard-navigable.
- High-contrast mode for better visibility.
- `aria-labels` for interactive elements to support screen readers.

## Deployment

The easiest way to deploy Dino Runner is to use the [Vercel Platform](https://vercel.com/). Follow these steps:

1. Push your code to a GitHub repository.
2. Connect your repository to Vercel.
3. Deploy your app with a single click.

For more details, check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## Learn More

To learn more about the technologies used in this project, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Learn how to style your app with Tailwind CSS.
- [Framer Motion Documentation](https://www.framer.com/motion/) - Learn about animations and transitions.

## Contributing

We welcome contributions to Dino Runner! If you'd like to contribute:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Submit a pull request with a detailed description of your changes.

## License

This project is licensed under the [MIT License](LICENSE).

---

Made with ❤️ by the Dino Runner Team.