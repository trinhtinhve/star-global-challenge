const wishlistService = require('../../../../core/star_global_challenge/services/wishlists');
const {
  Wishlist,
  WishlistItem,
  sequelize,
  transaction: t,
} = require('../../../../core/star_global_challenge/models');

const { ErrorCode, NotFoundError } = require('../../../../common/error');

jest.mock('../../../../core/star_global_challenge/models');

describe('#Wishlist Service', () => {
  let wishlist,
    insertedWishlistItems,
    wishlistDetail,
    wishlistId,
    wishlistItems;

  beforeAll(() => {
    wishlistId = 1;

    wishlistItems = [
      {
        value: 'a',
      },
    ];

    wishlist = {
      id: wishlistId,
      name: 'wishlist',
    };

    insertedWishlistItems = [
      {
        id: 1,
        value: 'a',
      },
    ];

    wishlistDetail = {
      id: 1,
      name: 'wishlist',
      items: [
        {
          id: 1,
          value: 'a',
        },
      ],
    };
  });

  describe('##Create a wishlist', () => {
    it('should create a wishlist correctly', () => {
      Wishlist.create.mockResolvedValueOnce({
        id: 1,
        name: 'wishlist',
      });

      const params = {
        name: 'wishlist',
      };

      return wishlistService.create(params).then((wishlist) => {
        expect(wishlist).toEqual({
          id: 1,
          name: 'wishlist',
        });

        expect(Wishlist.create).toHaveBeenCalledWith(params, {
          fields: ['name'],
        });
      });
    });

    it('should resolve an error', () => {
      Wishlist.create.mockRejectedValueOnce({});

      return wishlistService.create({}).catch((err) => {
        expect(err).toEqual({});

        expect(Wishlist.create).toHaveBeenCalledWith(
          {},
          {
            fields: ['name'],
          }
        );
      });
    });
  });

  describe('##Add items to a wishlist', () => {
    it('should add items into a wishlist successfully', () => {
      const addItems = jest.fn();

      Wishlist.findByPk.mockResolvedValueOnce({
        ...wishlist,
        addItems,
      });

      WishlistItem.bulkCreate.mockResolvedValueOnce(insertedWishlistItems);

      Wishlist.findByPk.mockResolvedValueOnce(wishlistDetail);

      return wishlistService
        .addItems(wishlistId, wishlistItems)
        .then((result) => {
          expect(result).toEqual(wishlistDetail);
          expect(Wishlist.findByPk).toHaveBeenCalledWith(wishlistId);
          expect(sequelize.transaction).toHaveBeenCalled();
          expect(WishlistItem.bulkCreate).toHaveBeenCalledWith(wishlistItems, {
            fields: ['value'],
            returning: true,
            transaction: t,
          });
          expect(addItems).toHaveBeenCalledWith(insertedWishlistItems, {
            transaction: t,
          });
          expect(t.commit).toHaveBeenCalled();
        });
    });

    it('should throw NotFoundError', () => {
      Wishlist.findByPk.mockResolvedValueOnce(null);

      return wishlistService
        .addItems(wishlistId, wishlistItems)
        .catch((err) => {
          expect(err).toEqual(new NotFoundError(ErrorCode.WISHLIST.NOT_FOUND));
        });
    });

    it('should rollback when bulkCreate error', () => {
      const error = {};

      Wishlist.findByPk.mockResolvedValueOnce(wishlist);
      WishlistItem.bulkCreate.mockRejectedValueOnce(error);

      return wishlistService
        .addItems(wishlistId, wishlistItems)
        .catch((err) => {
          expect(t.rollback).toHaveBeenCalled();
          expect(err).toEqual(error);
        });
    });

    it('should rollback when wishlist.addItems error', () => {
      const error = {};

      const addItems = jest.fn().mockRejectedValueOnce(error);

      Wishlist.findByPk.mockResolvedValueOnce({
        ...wishlist,
        addItems,
      });

      WishlistItem.bulkCreate.mockResolvedValueOnce(insertedWishlistItems);

      return wishlistService
        .addItems(wishlistId, wishlistItems)
        .catch((err) => {
          expect(t.rollback).toHaveBeenCalled();
          expect(err).toEqual(error);
          expect(addItems).toHaveBeenCalledWith(insertedWishlistItems, {
            transaction: t,
          });
        });
    });
  });

  describe('##Update a wishlist', () => {
    it('should update name of the wishlist successfully', () => {
      const params = {
        name: 'updated_wishlist',
      };

      const updatedWishlist = {
        id: wishlistId,
        name: params.name,
      };

      const save = jest.fn().mockResolvedValueOnce(updatedWishlist);
      Wishlist.findByPk.mockResolvedValueOnce({ ...wishlist, save });

      return wishlistService.update(wishlistId, params).then((result) => {
        expect(result).toEqual(updatedWishlist);
      });
    });

    it('should reject with NotFoundError', () => {
      const params = {
        name: 'xxx',
      };

      Wishlist.findByPk.mockResolvedValueOnce(null);

      return wishlistService.update(wishlistId, params).catch((err) => {
        expect(err).toEqual(new NotFoundError(ErrorCode.WISHLIST.NOT_FOUND));
      });
    });
  });

  describe('##Get wishlist details', () => {
    it('should resolve a wishlist details', () => {
      Wishlist.findByPk.mockResolvedValueOnce(wishlistDetail);

      return wishlistService.getDetails(wishlistId).then((result) => {
        expect(result).toEqual(wishlistDetail);
      });
    });
  });
});
