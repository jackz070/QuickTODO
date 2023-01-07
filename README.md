# QuickTODO

A simple to-do app built to practice TypeScript in React.

## Features AKA what I've learnt

- Wrote in TypeScript / React
- Drag and Drop with React Beautiful DND
- Example tests with Vitest / React Testing Library and happy-dom

## Main takeaways

- Switch statements are hard for Typescript. My research says that some issues related to inferring types of actions exist, even if everything seems to be typed correctly. Big pain.
- Beatufiul React Drag and Drop is bugged out by CSS transition property on Draggable elements, solution would be to make container draggable and add child element from transitions.
- Logical AND operator (&&) is not no be used for JSX conditional rendering. It's easy to cause bugs, like when what it tests is an empty array.
- Do not mutate state in React. It's not only not recommended, but also breaks things because reference is not changed AKA React doesn;t update anything based on it.
