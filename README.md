<img src='docs/red-panda.png' width='100'>

# Resolution

`self challenging and make a different!`

## Getting started

Make sure you have [node.js](https://nodejs.org) LTS installed. This project is for the [ICP Hackathon](https://github.com/ICPHackathon/ICP-Hackathon-2023/issues/7). Basic usage as follow,

```bash
npm ci
```

### Local development

```bash
npm run dev
```

### Client side only

The Internet Computer, including Juno, does not currently support Server Side Rendering. Therefore, it is recommended to generate a pre-rendered or client-side-only frontend application.

We suggest using the [static exports](https://nextjs.org/docs/pages/building-your-application/deploying/static-exports) option from Next.js.

In `next.config.js` file:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
};

module.exports = nextConfig;
```

### Deploy to Juno
```bash
npm run build && juno deploy
```
After `npm run build`, the bundle output directory called `out` can be used as the source of the content to upload to a Juno's satellite.

## Features
1. Connect with Internet Identity, auto generated EVM wallet
1. Create Challenge
1. Donate to Charity organization or Donate
1. Getting meme tokens as token of appreciations

## Tech Stack
```
frontend: Nextjs, Tailwindcss
hosting: Juno.build
database: Supabase
```

## Resources

### Credits
1. [Flaticon](Flaticon.com) - Red Panda Logo
1. [RawPixel](rawpixel.com) - Red Panda Background
1. [Juno.build](juno.build) - ICP Hosting
1. [Supabase](https://supabase.com/) - Database
