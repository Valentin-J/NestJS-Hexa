export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
        uri: 'mongodb://root:example@localhost:27017/',
    },
});
