const { Provider } = require('../models');

class ProviderRepository {
  static async findAvailable() {
    return Provider.findOne({
      where: { isAvailable: 1 }
    });
  }

  static async markAvailable(providerId) {
  return Provider.update(
    { isAvailable: true },
    { where: { id: providerId } }
  );
}

  static async markUnavailable(providerId) {
  return Provider.update(
    { isAvailable: false },
    { where: { id: providerId } }
  );
}

static async getAll() {
  return Provider.findAll();
}


}

module.exports = ProviderRepository;
