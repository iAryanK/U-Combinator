<div align="center">
  <br />
    <a href="https://u-combinator.vercel.app/" target="_blank">
      <img src="https://github.com/iAryanK/U-Combinator/blob/main/public/references/screenshot.png?raw=true" alt="Project Banner">
    </a>
  <br />

  <h3 align="center">Visit the website <a href="https://u-combinator.vercel.app/" target="_blank"><b>U-Combinator</b></a></h3>
</div>

## <a name="introduction">🤖 Introduction</a>

U-Combinator is a place where one can find various projects to contribute. One can form a team of developers to complete their dream projects.

To enlist a project, user has to login via github OAuth. The user can then then create a new project pitch with description and technology to be used, etc.

## <a name="tech-stack">⚙️ Tech Stack</a>

- Next.JS 14
- Typescript
- Sanity.io CMS
- Auth.js for authentication
- Tailwind CSS , shadcn UI

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/iAryanK/U-Combinator.git
cd U-Combinator
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env.local` in the root of your project and add the following content:

```env
AUTH_SECRET=
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
NEXT_PUBLIC_SANITY_API_VERSION=
SANITY_WRITE_TOKEN=
```

**Running the Project**

```bash
npm run dev
```

Open http://localhost:3000 in your browser to view the project.

## Development Process

1. Initial setup: Shadcn setup with theme toggle.

2. create: auth
   - created using auth.js
   - form actions with server actions https://react.dev/reference/rsc/server-actions#form-actions-with-server-actions

![screenshot](https://github.com/iAryanK/U-Combinator/blob/main/public/references/auth-flow.png?raw=true)

3. create: SearchForm

   - created SearchForm in Header using next/form
   - Form from next/form https://nextjs.org/docs/pages/api-reference/components/form

4. integrate: sanity

   - create new project on sanity.io
   - create sanity schema

   ![screenshot](https://github.com/iAryanK/U-Combinator/blob/main/public/references/sanity-schema.png?raw=true)

![screenshot](https://github.com/iAryanK/U-Combinator/blob/main/public/references/app-flow.png?raw=true)

5. generate: schema types

   - extract schema from the following command

   ```
   npx sanity@latest schema extract --path=./sanity/extract.json
   ```

   - create sanity-typegen.json in root
   - run the following command to auto generate the schema types

   ```
   npx shadcn@latest typegen generate
   ```

   - update scripts in package.json (so that we don't have to run the above command everytime we create new schema or query).
   - Now, the schema types can be used anywhere in the application.

6. implement: Sanity Live API

   - ISR https://nextjs.org/docs/app/building-your-application/caching

   ![Time based Revalidation in Next JS](https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Ftime-based-revalidation.png&w=1920&q=75&dpl=dpl_BpKziPZ8D8KdgtcNYEQc9tyDG4N7)

   - We can turn the useCdn in sanity/lib/client.ts to false that will disable the ISR. Now, if we refresh the page, we will see the refreshed data everytime.
   - To remove the need for manually refreshing and get live updates, we will use Live Content API from Sanity.
     - Create live.ts in root
     - Update sanity_api_version in .env
     - Now, use sanityFetch instead of client.fetch to fetch the data.

7. create: project details page

   - dynamic route for every project
   - implement PPR https://nextjs.org/docs/app/building-your-application/rendering/partial-prerendering

8. implement: views count update

   - sanity writeClient allows to write data on sanity, right from the application
   - views now update everytime a user visits a project details page

9. create: author auth flow

   - user/author is added to sanity database once they signup

10. create: create project page

- useActionState hook for form action
- backend using server actions to create new project

11. create: user profile

- used PPR, where user data is statically fetched and the user projects are fetched within suspense
- implemented parallel fetching
