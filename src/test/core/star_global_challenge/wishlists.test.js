const supertest = require('supertest');
const app = require('../../../middleware');
const db = require('../../../core/star_global_challenge/models');

describe('#Wishlist Integration Test', () => {
  afterAll(() => {
    return db.sequelize.close();
  });

  describe('##Create wishlist', () => {
    beforeAll(() => {
      return db.sequelize.sync({ force: true });
    });

    it('should be create a new wishlist', () => {
      return supertest(app)
        .post('/wishlist-service/api/v1/wishlists')
        .send({ name: 'wishlist' })
        .expect(200)
        .then((response) => {
          expect(response.body.name).toBe('wishlist');
        });
    });

    it('should be response with error object', () => {
      return supertest(app)
        .post('/wishlist-service/api/v1/wishlists')
        .send({ name123: 'wishlist' })
        .expect(500)
        .then((response) => {
          expect(response.body).toMatchObject({ error: {} });
        });
    });
  });

  describe('##Add items to wishlist', () => {
    let id, name;

    beforeAll(async () => {
      await db.sequelize.sync({ force: true });

      return supertest(app)
        .post('/wishlist-service/api/v1/wishlists')
        .send({ name: 'wishlist' })
        .expect(200)
        .then((response) => {
          id = response.body.id;
          name = response.body.name;
        });
    });

    it('should be add items into wishlist', () => {
      return supertest(app)
        .post(`/wishlist-service/api/v1/wishlists/${id}/items`)
        .send({ items: [{ value: 'a' }] })
        .expect(200)
        .then((response) => {
          expect(response.body).toEqual({
            id,
            name,
            items: [
              {
                id: 1,
                value: 'a',
                WishlistDetail: {
                  status: false,
                },
              },
            ],
          });
        });
    });

    it('should be response with error object when item has not value property', () => {
      return supertest(app)
        .post(`/wishlist-service/api/v1/wishlists/${id}/items`)
        .send({ items: [{ value123: 'a' }] })
        .expect(500)
        .then((response) => {
          expect(response.body).toMatchObject({ error: {} });
        });
    });

    it('should be response with error object when do not have items param', () => {
      return supertest(app)
        .post(`/wishlist-service/api/v1/wishlists/${id}/items`)
        .send({})
        .expect(500)
        .then((response) => {
          expect(response.body).toMatchObject({ error: {} });
        });
    });
  });

  describe('##Update wishlist', () => {
    let id, name;

    beforeAll(async () => {
      await db.sequelize.sync({ force: true });

      return supertest(app)
        .post('/wishlist-service/api/v1/wishlists')
        .send({ name: 'wishlist' })
        .expect(200)
        .then((response) => {
          id = response.body.id;
          name = response.body.name;
        });
    });

    it('should be update wishlist name', () => {
      return supertest(app)
        .put(`/wishlist-service/api/v1/wishlists/${id}`)
        .send({ name: 'updated_wishlist' })
        .expect(200)
        .then((response) => {
          expect(name).toBe('wishlist');
          expect(response.body.name).toBe('updated_wishlist');
        });
    });

    it('should be response with error object', () => {
      return supertest(app)
        .put(`/wishlist-service/api/v1/wishlists/${id}`)
        .send({ name123: 'updated_wishlist' })
        .expect(500)
        .then((response) => {
          expect(response.body).toMatchObject({ error: {} });
        });
    });
  });

  describe('##Get a list of wishlist', () => {
    let id, name;

    beforeAll(async () => {
      await db.sequelize.sync({ force: true });

      return supertest(app)
        .post('/wishlist-service/api/v1/wishlists')
        .send({ name: 'wishlist' })
        .expect(200)
        .then((response) => {
          id = response.body.id;
          name = response.body.name;
        });
    });

    it('should return a list of wishlist', () => {
      return supertest(app)
        .get('/wishlist-service/api/v1/wishlists')
        .expect(200)
        .then((response) => {
          expect(response.body).toEqual([
            {
              id,
              name,
            },
          ]);
        });
    });
  });

  describe('##Get a wishlist details', () => {
    let id, name;

    beforeAll(async () => {
      await db.sequelize.sync({ force: true });

      return supertest(app)
        .post('/wishlist-service/api/v1/wishlists')
        .send({ name: 'wishlist' })
        .expect(200)
        .then((response) => {
          id = response.body.id;
          name = response.body.name;

          return supertest(app)
            .post(`/wishlist-service/api/v1/wishlists/${id}/items`)
            .send({ items: [{ value: 'a' }] })
            .expect(200)
            .then((response) => {
              expect(response.body).toEqual({
                id,
                name,
                items: [
                  {
                    id: 1,
                    value: 'a',
                    WishlistDetail: {
                      status: false,
                    },
                  },
                ],
              });
            });
        });
    });

    it('should response a wishlist with details', () => {
      return supertest(app)
        .get(`/wishlist-service/api//v1/wishlists/${id}/details`)
        .expect(200)
        .then((response) => {
          expect(response.body).toEqual({
            id,
            name,
            items: [
              {
                id: 1,
                value: 'a',
                WishlistDetail: {
                  status: false,
                },
              },
            ],
          });
        });
    });
  });
});
