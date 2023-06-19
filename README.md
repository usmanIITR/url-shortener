# URL-Shortener
## Description
Introducing MakeShortUrl - The Ultimate URL Shortener!

MakeShortUrl is a state-of-the-art URL shortener app that combines powerful features with utmost security. With its sleek and intuitive design, MakeShortUrl offers a seamless experience for all your URL shortening needs. Let's explore its glowing features:

- Effortless URL Storage: MakeShortUrl diligently saves all the URLs you have shortened, ensuring easy access to your past links whenever you need them. Say goodbye to the hassle of losing important shortened URLs!

- Click Tracking: MakeShortUrl provides you with real-time insights by tracking the number of clicks on each shortened link. Gain valuable data and analyze the impact of your shared URLs effortlessly.

- Comprehensive Search Capability: With MakeShortUrl's advanced search feature, you can search not only by the short URL but also by the long URL. Finding your desired link is a breeze, saving you precious time and effort.

- Unparalleled Security: MakeShortUrl prioritizes the safety of your information. By employing JWT authentication, your sessions are secure, and you can enjoy uninterrupted usage for up to one hour after logging in. Rest easy knowing that your data is protected.

- Hashed and Secure Passwords: At MakeShortUrl, we take security seriously. Your passwords are securely hashed, providing an additional layer of protection against unauthorized access. You can trust that your personal information remains safe within our fortified system.

- MakeShortUrl is your all-in-one solution for URL shortening, click tracking, and enhanced security. Experience the convenience, reliability, and peace of mind that MakeShortUrl offers. Simplify your digital presence and elevate your sharing game with MakeShortUrl - the ultimate URL shortener app.

## How to Run on your machine?
Before running this project, please ensure that you have the following prerequisites installed on your machine:
- Node.js and NPM: Make sure you have Node.js and NPM (Node Package Manager) installed. You can download them from the official Node.js website: https://nodejs.org.

- MongoDB: Install MongoDB to set up the database for this project. You can download it from the official MongoDB website: https://www.mongodb.com.

Once you have the prerequisites ready, follow these steps to run the project:

- Clone the GitHub repository by running the following command in your terminal or command prompt:
```
git clone https://github.com/usmanIITR/url-shortener.git
```
- Navigate to the project directory:
```
cd <project_directory>
```
- Create a .env file in the root of the project directory.

- Open the .env file and add the following environment variables:
```
ACCESS_TOKEN_SECRET=<your_access_token_secret>
PORT=<port_number>
DB_USERNAME=<your_mongodb_cluster_username>
DB_PASSWORD=<your_mongodb_cluster_password>
```
- * ACCESS_TOKEN_SECRET: This is the secret key used for JWT signing and authentication.
- * PORT: Specify the port number to run the application locally (e.g., 3000).
- * DB_USERNAME and DB_PASSWORD: These credentials are required to connect to your MongoDB cluster.
- Save the .env file.
- Install all the required dependencies and packages by running the following command:
```
npm install
```
- Once the dependencies are installed, start the server by running the following command:
```
npm run dev
```
- Open your web browser and go to localhost:PORT/login or localhost:PORT/signup to access the login or signup page.

- Explore the website and enjoy its features!
For a more detailed demonstration of the project's working and features, please watch the following video: [Video Link](https://youtu.be/CLuCeEMMy1U)

## Internal Working
### Dependencies Used
- Mongoose: Mongoose is an elegant MongoDB object modeling tool for Node.js, used for interacting with the MongoDB database.

- Dotenv: Dotenv is a module that loads environment variables from a .env file into process.env.

- Express: Express is a fast and minimalist web application framework for Node.js, used for creating the server and handling HTTP requests.

- Bcrypt: Bcrypt is a library used for hashing passwords and comparing hashed passwords for user authentication.

- Cookie-parser: Cookie-parser is a middleware used for parsing cookies in the incoming requests and handling cookies in the response.

- UUID: UUID (Universally Unique Identifier) is a library used for generating unique user IDs.

- Jsonwebtoken: Jsonwebtoken is a library used for generating and verifying JSON Web Tokens (JWT) for user authentication.

- EJS: EJS (Embedded JavaScript) is a simple templating language used to generate HTML with plain JavaScript.

### APIs
- GET '/': This API first authenticates the user, and if successful, redirects them to the homepage.

- GET '/login': This API renders the login page for users to enter their credentials.

- GET '/signup': This API renders the signup page for users to create a new account.

- GET '/logout': This API clears the user's session by removing the JWT token stored in the cookie, then redirects them to the login page.

- POST '/login': This API checks if the user exists, compares the provided password with the hashed password using bcrypt, and if they match, signs a JWT token for session authentication. The user is then redirected to the homepage.

- POST '/signup': This API creates a new user, hashes the provided password using bcrypt, signs a JWT token for session authentication, and redirects the user to the homepage.

- POST '/search': This API authenticates the user, performs a search using MongoDB Atlas indexes based on the provided search text, updates the user and database accordingly, and refreshes the homepage.

- POST '/shortUrl': This API authenticates the user, generates a short URL for a given URL, updates the database with the shortened URL, and refreshes the homepage.

- GET '/:shortUrl': This API redirects the user to the full URL associated with the provided short URL.
Please note that these are brief explanations of the dependencies used and the REST APIs implemented in the project. The actual implementation may have additional functionality and error handling.

A video demonstrating all these can be found [here](https://youtu.be/CLuCeEMMy1U)

## My Takeaways
During the development of this project, several valuable lessons and takeaways were gained. Here are some key insights:

- Full-Stack Development: This project provided an opportunity to work on a full-stack application, encompassing both the front-end and back-end components. Understanding the interaction between different layers and technologies was a valuable learning experience.

- Integration of Technologies: Integrating various technologies, such as Node.js, Express.js, MongoDB, JWT authentication, and third-party libraries like bcrypt and EJS, demonstrated the importance of leveraging different tools to create a robust and functional application.

- Secure Authentication: Implementing JWT authentication and password hashing with bcrypt emphasized the significance of prioritizing security measures to protect user information. Properly handling sensitive data is crucial for ensuring a secure and trustworthy application.

- Database Operations: Working with MongoDB and Mongoose showcased the power and flexibility of NoSQL databases. Performing CRUD operations, creating indexes for efficient searching, and maintaining data consistency deepened the understanding of database management.

- RESTful API Design: Designing and implementing RESTful APIs for various functionalities, such as user authentication, URL shortening, and search functionality, enhanced the understanding of API development and interaction between the client and server.

- User Experience and UI Design: Creating intuitive user interfaces, focusing on responsive design, and ensuring a seamless user experience helped solidify the importance of user-centric design principles and accessibility considerations.

- Continuous Learning: The development process highlighted the importance of continuous learning and keeping up with the latest industry trends. Staying updated with new technologies and best practices is essential for enhancing skills and delivering high-quality projects.

Overall, this project served as a valuable learning experience, offering insights into full-stack development, security practices, database operations, API design, user experience, and the significance of continuous improvement.

## References
Here are some of the resources that helped me:
- [MongoDB Indexes - YouTube Tutorial](https://youtu.be/o2ss2LJNZVE): This tutorial provided valuable insights into using MongoDB indexes for efficient searching.

- [WebDevSimplified Video](https://youtu.be/SLpUKAGnm-g): This youtube tutorial really helped in structuring whole app and starting up the project.

- ACM Resources on Discord: The resources shared by ACM on Discord were instrumental in enhancing the understanding of various concepts and best practices.

- ChatGPT: ChatGPT played a significant role in providing assistance and guidance throughout the project development process.

- Official Documentation:

- * [Node.js Documentation](https://nodejs.org/en/docs): The official documentation for Node.js provides in-depth information on using Node.js for server-side JavaScript development.
- * [MongoDB Documentation](https://www.mongodb.com/docs/atlas/atlas-search/create-index/): The MongoDB documentation offers comprehensive guidance on using MongoDB, including querying, indexing, and database management.
- * [JWT Documentation](https://jwt.io/introduction/): The JWT website provides an introduction to JSON Web Tokens, along with detailed specifications and usage examples.

Additional Resources:

- Express.js Documentation: The Express.js documentation provides detailed information on building web applications using the Express.js framework.

Please note that the resources mentioned above, including videos, online tutorials, and official documentation, were instrumental in the development process and served as valuable references.
