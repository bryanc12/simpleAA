# simpleAA (Under Development)
A simple authentication and authorization module build with Express.js

File structure:\
/routes - Contains all the routes. Where routing take place.\
/controllers - Contains all the controllers. Where the algorithms take place.\
/services - Contains all the services. Where the functions exchange data between database take place.\
/middlewares - Contains all the middlewares. Where the middlewares take place.\
/utils - Contains all the utilities . Where the utilities take place.\

Route of protected routes:\
route -> middleware(auth.middleware) -> controller -> service
