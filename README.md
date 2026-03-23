# PetSoft

An app for managing a pet sitting business.

It is based off of ByteGrad's *Professional React and NextJs* course, but in Next.JS 16 and the latest versions of included packages (as of March, 2026).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Run `npx prisma studio &` to monitor the database at `localhost:51212`.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Database updates

```bash
# To update the database and re-seed:
npx prisma db push
npx prisma generate
npx prisma db generate
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
