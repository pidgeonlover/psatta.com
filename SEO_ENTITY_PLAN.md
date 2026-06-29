# Matei Psatta Search Presence Plan

Goal: make `https://psatta.com/` the canonical source for "Matei Psatta" and give Google enough consistent entity signals to rank the site for name searches and, over time, potentially generate a Knowledge Panel.

## Already Implemented On Site

- Canonical homepage: `https://psatta.com/`
- Indexable robots policy.
- Sitemap at `https://psatta.com/sitemap.xml`.
- HTTPS enforced through GitHub Pages.
- Stronger title and meta description for "Matei Psatta".
- Open Graph and Twitter preview image.
- Favicon and Apple touch icon.
- Rich `Person`, `ProfilePage`, `WebSite`, and `ImageObject` JSON-LD.
- Visible bio text that repeats the same entity description Google sees in structured data.
- LinkedIn marked as an identity link with `rel="me"`.

## Google Search Console

1. Go to <https://search.google.com/search-console>.
2. Add a new property.
3. Choose **Domain** if you control DNS for `psatta.com`.
4. Add the TXT record Google gives you in your DNS provider.
5. After verification, submit this sitemap:
   `https://psatta.com/sitemap.xml`
6. Use **URL Inspection** for:
   `https://psatta.com/`
7. Click **Request indexing**.

If DNS verification is annoying, use **URL prefix** instead:
`https://psatta.com/`

Then choose the HTML tag verification method and add the tag to `index.html`.

## External Identity Signals

Make these profiles use the same name, description, and website link:

- LinkedIn: link to `https://psatta.com/`.
- Newsletter: link from `lateralthink.in` to `https://psatta.com/`.
- Any X/Twitter, Reddit, Medium, Substack, podcast, speaker, or company profile pages.
- Any press/interview pages should refer to "Matei Psatta" and link to `https://psatta.com/`.

Suggested one-line bio:

> Matei Psatta is a growth and marketing operator who builds profitable growth engines and connects unusually good growth and marketing people with founders building companies worth joining.

## Knowledge Panel Reality

Google Knowledge Panels are generated automatically. You cannot directly create one from your site alone. The practical path is:

1. Make `psatta.com` the canonical source.
2. Make social/professional profiles consistent.
3. Earn third-party mentions from credible sites.
4. Keep Search Console clean.
5. If a Knowledge Panel appears, claim it through Google and suggest edits.

## Ongoing Checks

Search these once a week:

- `Matei Psatta`
- `Matei Psatta growth`
- `Matei Psatta Reddit`
- `site:psatta.com Matei Psatta`

In Search Console, monitor:

- Indexing status for `https://psatta.com/`.
- Queries containing `Matei Psatta`.
- Crawl or sitemap errors.
