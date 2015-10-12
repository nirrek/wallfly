var property; // the property model

/**
 * Stores the current property model for the client and provides relevant
 * services for the model.
 */
var Property = {
  getPropertyId() {
    if (!property) return -1;
    return property.id;
  },

  getProperty() {
    return property;
  },

  setProperty(propertyModel) {
    property = propertyModel;
  },

  deleteProperty() {
    property = undefined;
  }
};

module.exports = Property;
