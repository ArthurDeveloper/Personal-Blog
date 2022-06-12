# Nextjs + Sanity Blog Template

Template for starting a simple blog with nextjs and sanity cms

## How to run?

Step by step:
- Add a .env.development and a .env.production file to the `/admin` folder using the following model:
    ```md
    SANITY_STUDIO_API_PROJECT_ID=your_id
    SANITY_STUDIO_API_DATASET=your_dataset
    ```

- Add a .env.local file to the `/web` directory using the following model:
    ```md
    NEXT_PUBLIC_SANITY_PROJECT_ID=your_id
    NEXT_PUBLIC_SANITY_DATASET=your_dataset
    ```

- Run ``npm install`` or ``yarn add`` in root, `/admin` and `/web` directories to install dependencies

- Run ``yarn dev`` on the root directory to run both the web server and sanity cms

- If you want to build the application, run ``yarn build`` in the root directory

