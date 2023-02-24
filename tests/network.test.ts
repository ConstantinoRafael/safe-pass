
beforeEach(async () => await cleanDB());

const server = supertest(app);