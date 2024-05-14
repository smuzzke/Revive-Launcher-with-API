const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    created: { type: Date, required: true },
    banned: { type: Boolean, default: false },
    discordId: { type: String, required: true, unique: true },
    accountId: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    username_lower: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mfa: { type: Boolean, default: false },
    matchmakingId: { type: String, default: null },
    canCreateCodes: { type: Boolean, default: false },
    isServer: { type: Boolean, default: false },
    GivenFullLocker: { type: Boolean, default: false },
    Reports: { type: Number, default: 0 }
}, {
    collection: "users"
});
const model = mongoose.model('User', UserSchema); // Removed 'Schema' from the model name

module.exports = model; // Export the model using CommonJS syntax