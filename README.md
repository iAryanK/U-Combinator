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
