# Local Weather 1.0
This is an example application written by me to display some working React, running on Next.js and deployed on Vercel. 

This application displays Next's ability to combine Server Side Rendering with Client Side Rendering. This approach nets us working SEO out of the box, as well as reduced time to first paint and time to first interaction for end users — but still allows us to create dynamic applications with user input.

This project supports linting, code styling, server-rendered components including the styled-components library, and automatic deployment and hosting courtesy of Vercel. 

Special thanks to [Material UI](https://mui.com/) and [Nager.Date](https://date.nager.at/API) for their component library and open source API, respectively.

Please access the application here: https://sample-nextjs-project-jade.vercel.app/

## Todo
- Jest unit tests for components and functions
- CI/CD configuration to automatically run above unit tests
- Improve mobile support

---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
