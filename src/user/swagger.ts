console.log("CWD:", process.cwd());
import swaggerJsDoc from "swagger-jsdoc";
import path from "path";
import fs from "fs";

const ext = process.env.NODE_ENV === "production" ? "js" : "ts";

const toGlobPath = (p: string) => p.split(path.sep).join("/");

const authPath = toGlobPath(path.join(__dirname, "..", "auth", `auth.routes.${ext}`));
const bookPath = toGlobPath(path.join(__dirname, "..", "books", `book.controller.${ext}`));
const routesPath = toGlobPath(path.join(__dirname, "..", `routes.${ext}`));
const swaggerPath = toGlobPath(path.join(__dirname, `swagger.${ext}`));

console.log("auth existe?", fs.existsSync(authPath), authPath);
console.log("book existe?", fs.existsSync(bookPath), bookPath);
console.log("routes existe?", fs.existsSync(routesPath), routesPath);
console.log("swagger existe?", fs.existsSync(swaggerPath), swaggerPath);

const apis = [
  "src/auth/*.routes.ts",
  "src/books/*.controller.ts",
  "src/routes.ts",

];

console.log("APIS USADAS:", apis);

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - ISBN
 *       properties:
 *         title:
 *           type: string
 *           description: Title of the book
 *         author:
 *           type: string
 *           descripton: Name of the author of the book
 *         ISBN:
 *           type: string
 *           descripton: ISBN of the book
 *       example:
 *         title: A great book
 *         author: John
 *         ISBN: 9780744066868
 *     BookUpdate:
 *       type: object
 *       optional:
 *         - title
 *         - author
 *         - ISBN
 *       properties:
 *         title:
 *           type: string
 *           description: Title of the book
 *         author:
 *           type: string
 *           descripton: Name of the author of the book
 *         ISBN:
 *           type: string
 *           descripton: ISBN of the book
 *       example:
 *         title: An updated book title
 *         author: A new author
 *         ISBN: 9780744066868
 *
 * @swagger
 *  tags:
 *    name: Books
 */
const swaggerSpec = swaggerJsDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Book API",
      version: "1.0.0",
      description: "CRUD Book API",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis,
});

console.log("PATHS ENCONTRADOS:", Object.keys((swaggerSpec as any).paths || {}));

export default swaggerSpec;
