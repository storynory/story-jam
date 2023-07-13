## Install
npm init -y
npm install @11ty/eleventy --save-dev
npx @11ty/eleventy
npx @11ty/eleventy --serve

## Set Up

I try to stay mainly to the defaul 11ty structure. Some folders are declared in the config, ".eleventy.js:,   The site's index file is in the root of the project.  Posts are in a folder called "posts", layouts in "_layouts", data into "_data", webc components in "_components". NB  css is in "_components/css". 


<h2>CSS</h2>
11ty bundles the most specific CSS at the top. "Most specific" means which template it is in.  Do a deeper, nested template is "more specific".  This can be a problem. 

If we link to a stylesheet in the head "css/styles.css"
11ty will look for styles to bundle in "_components/css/styles.css".
We can link to "vars.css", reset.css", "colors.css", "type.css" etc
in the  head of the site.  11ty will bundle them inline in the right order for us. 

If we wanted to keep a link to a stylesheet, eg for Google fonts, we can use webc:keep in the link. 

## Webc Buckets

## Lightning CSS