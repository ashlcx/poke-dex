# Front End Web Design

Access [here](https://pokedex.ashlcx.net)

[API Used](https://pokeapi.co/)

## Assignment 2 - Static Site Generation

I got the idea to create a pokedex after looking at the best open API's for web development, mostly because all the data is static in nature (Unless a new game or series comes out) and I already have a fair amount of knowledge in it due to being a fan in my childhood. I had to limit alot of the information that could be potentially shown due to the vast amount of data actually available for the API including details like types, attributes and moves, I already have 157 pages, I didnt fell like I needed thousands.

The design process was fairly straight-forward. I started off designing the main layout of the pages. This is acheved by creating several components located in the components folder. After creating the inital layout, I worked on data ingress through the API into NextJS. I found this the most technically difficult out of the entire assignment, NextJS dynamic pages works off grabbing an index through the `getStaticPaths` method, then per page accessing all data through the `getStaticProps` method. Due to the nature of the API holding alot of data I needed to filter out what was nessecarsy to reduce page size and increase performance. A part of this was actually creating my own data structures and manipulting data to fit.

Once I had all the data applicable I worked on displaying multiple aspects in tables to organize the layout of the page, using a table means I didnt have to deal with paddings and margins for layout. I also tried out using react libraries to display a bar/column graph for the stats, after some inital failures I just decided to use some div elements to create my own incredibly simple graphing.

An aspect I really wanted in the pages where to show the evolution chain of the pokemon. Some of the other main pokedex pages have a fairly complex system of showing them including levels for evolutions or items needed, I tried to implement it in the table method but I could never get it looking the way I liked. If I was fully developing the site into its full potential I would probably include some pages which show all that data.

When it came to the dynamic colours for types, I used a simple switch case to get colours from a list for styling where as they were both suited to the linear-gradients, however I feel like there was probably a better way to do it.

After I got the pokemon details pages fairly I worked on the index page which contains a search input which dynamically filters out from a list, this in the site technically is what im most happy around getting to work. I do note however I could probably work on how the grid displays after filtering out some elements.

All of the design so far was done mobile-first, like the first project. I once again enjoyed designing mobile first as I believe the main use case for a site like this would be mobile, as compared to desktop, as most commonly pokemon games are played on the go on nitendo portable consoles. When it come to tablet/desktop not much had to change due to the overall design of the layout. I only really needed to add some max-widths and flex to organize layouts.

At the end of the process I decided on how to do the fonts, I decided on using a font based of the GameBoy Advance pokemon games providing a similar look to the actual pokedex from the games.

### Things I did Well

- Once again dark mode. I used the data-attribute once again and used local storage to save preferences, as I've designed the site to be a quick reference in and out kind of tool.
- NextJS worke amazing for staticly generating a site, whilst not nessecairly using any markdown, it allowed me to really design the speficic location for the correct data from the API.
- The dynamic search bar as mentioned above works a treat and for any future react/nextjs apps ill be reusing that code.
- The grid works really well in dynamically creating the list of pokemon whilst being responsive.

### Things I can Improve

- I wanted to include type colours on the little pokemon cards, however with the design of the API, pulling a generation down didnt include types in the list and having to pull 151 pages again caused the build process to reach API limits
- I could of probably remodelled the layout for the pokedex data pages on desktop, spreading them out a bit.
- More use of colour could add to the overall apperance of the page.
- I wanted to use jest testing to confirm elements where rendering correctly in the right place to ensure things didnt break during development but I couldnt get that working either.
