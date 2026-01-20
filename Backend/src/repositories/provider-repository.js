const { Provider } = require('../models');

class ProviderRepository {
  static async findAvailable() {
    return Provider.findOne({
      where: { isAvailable: true }
    });
  }
}

module.exports = ProviderRepository;
