# react-typescript-class-function-practice


# Cmd's to create new react-typescript project

#### 1. Create Project using Vite:
```bash
# From project root
npm create vite@latest frontend -- --template react-ts

cd frontend

# If you want to downgrade React to a more stable version:
npm install react@18.2.0 react-dom@18.2.0
npm install @types/react@18.2.0 @types/react-dom@18.2.0 --save-dev

npm install
npm run dev
```

#### 2. Modify the `vite.config.ts` for API proxy during development:
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    }
  }
})
```

