## Password-Next

Password-Next is a minimalist password manager designed to securely store your passwords with ease.

### Technologies Used

- **Frontend**: Built using NextJS.
- **Backend**: Utilizes Koa for API development and Sqlite for data storage.

### Getting Started

#### Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/HChaoHui/Password-Next.git
   ```
2. **Navigate to the web directory:**
   ```bash
   cd Password-Next/web
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Run the development server:**
   ```bash
   npm run dev
   ```
5. **Open your browser and visit:**
   ```
   http://localhost:3000
   ```
6. **Navigate to the admin directory:**
   ```bash
   cd ../admin
   ```
7. **Install dependencies:**
   ```bash
   npm install
   ```
8. **Start the backend server:**
   ```bash
   npm run start
   ```
9. **API will be available at:**
   ```
   http://localhost:19899
   ```
10. **Default Token:**
    ```
    PasswordNext
    ```

#### Docker Deployment

1. **Docker Address:**
   [nocn/password_next](https://hub.docker.com/r/nocn/password_next)
2. **Run the Docker container:**
   ```bash
   docker run -p 3000:3000 -p 19899:19899 -e NEXT_PUBLIC_API_URL=http://127.0.0.1:19899 nocn/password_next
   ```  
    replace "http://127.0.0.1:19899" with your API address

### Demo

Check out the live demo [here](https://password.next.688828.xyz/).  
The demo site may periodically delete data, so please do not store important information there.

### Example Screenshots

![Login](https://raw.githubusercontent.com/HChaoHui/Password-Next/main/example/login.png)
![Register](https://raw.githubusercontent.com/HChaoHui/Password-Next/main/example/register.png)
![List](https://raw.githubusercontent.com/HChaoHui/Password-Next/main/example/list.png)
![Add](https://raw.githubusercontent.com/HChaoHui/Password-Next/main/example/add.png)
![Handle](https://raw.githubusercontent.com/HChaoHui/Password-Next/main/example/handle.png)
![Edit](https://raw.githubusercontent.com/HChaoHui/Password-Next/main/example/edit.png)
![2FA](https://raw.githubusercontent.com/HChaoHui/Password-Next/main/example/2fa.png)

### Star History

[![Star History Chart](https://api.star-history.com/svg?repos=HChaoHui/Password-Next&type=Date)](https://star-history.com/#HChaoHui/Password-Next&Date)

### Contributing

Feel free to contribute to the project by opening issues or submitting pull requests. Your feedback and contributions are highly appreciated!

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.