const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firebaseUID: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    enum: ['client', 'provider'],
    required: true
  },
  email: String,
  name: String,
  profilePhoto: String,
  reliabilityScore: {
    type: Number,
    default: 100
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: [Number] // [longitude, latitude]
  },
  serviceRadius: Number,
  services: [{
    name: String,
    category: String,
    price: Number
  }]
}, {
  timestamps: true
});

// Add geospatial index
userSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('User', userSchema);