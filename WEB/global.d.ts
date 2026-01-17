// Allow importing CSS files in TypeScript files (global CSS and CSS modules)
declare module '*.css'
declare module '*.scss'
declare module '*.sass'

interface CSSModuleClasses {
  readonly [key: string]: string
}

declare module '*.module.css' {
  const classes: CSSModuleClasses
  export default classes
}

declare module '*.module.scss' {
  const classes: CSSModuleClasses
  export default classes
}
