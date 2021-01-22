const dev = process.env.NODE_ENV !== 'production';

export default {
    API_URL: dev ? 'http://localhost:3000' : 'https://africanyouthminds.com'
}