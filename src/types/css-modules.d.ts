// src/types/css-modules.d.ts

// Regular CSS files (like index.css with Tailwind) - NO object export
declare module "*.css" {
  const css: void; // Changed from object to void
  export default css;
}

// CSS Modules only - WITH object export
declare module "*.module.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}
