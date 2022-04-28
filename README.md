[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
![Total Lines](https://img.shields.io/tokei/lines/github/nelsontky/gh-pages-url-shortener?color=green)
![GitHub stars](https://img.shields.io/github/stars/nelsontky/gh-pages-url-shortener?style=social)

# 🔗 GitHub Pages URL Shortener

This is a minimal URL shortener that can be entirely hosted on GitHub pages. It
does not need the maintenance of any servers or databases and can be hosted
entirely on GitHub for free!


1. Fork the repo before cloning your fork.
1. Set up GitHub pages for your forked repo.
   1. In your forked repo, **click the Settings tab** and scroll down to the
      GitHub Pages section.
   1. Then select the **main branch** source and click on the **Save** button.
   1. <img src="https://i.imgur.com/kjinFX9.png" alt="How to create GitHub page" height="176px">
1. If you are using your own domain:
   1. [Set your domain up for GitHub pages.](https://docs.github.com/en/free-pro-team@latest/github/working-with-github-pages/managing-a-custom-domain-for-your-github-pages-site#configuring-an-apex-domain)
   1. Change the URL in `CNAME` file to your domain.
1. If you are using GitHub page's default domain i.e. Something like
   `https://<username>.github.io/<repo-name>/`
   1. Delete the `CNAME` file.
   1. Change `var PATH_SEGMENTS_TO_SKIP = 0;` at the top of `404.html` to
      `var PATH_SEGMENTS_TO_SKIP = 1;`.
      1. This is as GitHub domains have an additional path segment (the repo
         name) after the host name.
1. Create a new repo as a database. (Or you could use your forked repo)
   1. Update `var GITHUB_ISSUES_LINK = "<your-github-issues-link>";` at the top
      of `404.html` accordingly afterwards.
      1. Format for `GITHUB_ISSUES_LINK`:
         `https://api.github.com/repos/{owner}/{repo}/issues/`
      1. Remember the trailing `/`!
1. Push your changes to your forked repo, and your low cost and cool as heck URL
   shortener will be ready for use!
