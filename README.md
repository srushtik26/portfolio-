# Srushti Kadam — Portfolio

A responsive, single-page developer portfolio built with React 18, Vite, Three.js, and CSS. The interface uses a black-and-neon-pink visual system, a reduced-motion-aware Three.js hero scene with a CSS/SVG fallback, and a compact editorial layout.

## Development

Requires Node.js 18 or newer.

```sh
npm install
npm run dev
```

Create a production build with `npm run build`; use `npm run preview` to inspect it locally.

## Content and profile links

Edit `src/data/portfolio.js` to update profile links, projects, experience, awards, skills, or résumé configuration. A résumé file is not currently included; add the real file under `public/` and set `profile.resume` to its public path before enabling a download link.

The activity section fetches GitHub contributions from GitHub Contributions API and LeetCode totals/submission calendar from Alfa LeetCode API. These are public third-party endpoints, cached for 30 minutes in the current browser session, and shown with their source noted. If a request fails, the card links to the platform profile and reports that live data is unavailable. Take U Forward has no wired public data feed; its progress is the manually maintained public-profile snapshot in `profile.tufProgress`, including a verification date.

## Assets and deployment

The About section rotates through the supplied photos in `public/assets/image/about/` and the existing portrait at `public/assets/image/meee.jpeg`, starting with the first supplied photo. Project cards use illustrative, in-page product previews rather than screenshots; sample figures are labeled as demo data. The Plutus and BSE marks in the experience timeline are local assets sourced from the [official Plutus site](https://plutuswealth.in/) and [BSE site](https://www.bseindia.com/). Technology logos are bundled under `public/assets/tech-logos/` from [Devicon](https://github.com/devicons/devicon), [Simple Icons](https://simpleicons.org/), and [Wikimedia Commons](https://commons.wikimedia.org/); achievement emblems are custom visual badges, not official event logos. Vite's existing build and deployment setup is retained.
