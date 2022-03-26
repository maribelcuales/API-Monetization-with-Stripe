function generateAPIKey() {
  const { randomBytes } = require("crypto");
  const apiKey = randomBytes(16).toString("hex");
  const hashedAPIKey = hashAPIKey(apiKey);

  // Ensure API key is unique
  if (apiKeys[hashedAPIKey]) {
    generateAPIKey();
  } else {
    return { hashedAPIKey, apiKey };
  }
}

// Hash the API key
function hashAPIKey(apiKey) {
  const { createHash } = require("crypto");

  const hashedAPIKey = creasteHash("sha256").update(apiKey).digest("hex");

  return hashedAPIKey;
}
