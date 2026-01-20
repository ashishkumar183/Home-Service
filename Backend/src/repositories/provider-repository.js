const { Provider } = require('../models');

class ProviderRepository {
  static async findAvailable() {
    return Provider.findOne({
      where: { isAvailable: 1 }
    });
  }

  static async markUnavailable(providerId) {
  return Provider.update(
    { isAvailable: false },
    { where: { id: providerId } }
  );
}

}

module.exports = ProviderRepository;
